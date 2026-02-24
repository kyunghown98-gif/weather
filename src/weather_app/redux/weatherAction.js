import axios from 'axios'
import {
  getWeather, getHourlyForecast, getWeeklyForecast,
  setLoading, setCityWeather, setSearchResults,
  setGameUser, setGameCom, setGameResult, updateGameScore,
} from './slice'

const API_KEY = '66a0ab4dcf5f895d0b4df3f77c88297a'



// OpenWeatherMap 5일 예보 데이터를 날짜별로 묶어서 반환
const parseWeeklyForecast = (forecastData) => {
  const dailyMap = {}

  forecastData.list.forEach(item => {
    const date = item.dt_txt.split(' ')[0]

    if (!dailyMap[date]) {
      dailyMap[date] = {
        temps:     [],
        weather:   item.weather[0],
        humidity:  item.main.humidity,
        windSpeed: item.wind.speed,
        rainfall:  0,
      }
    }

    dailyMap[date].temps.push(item.main.temp)
    dailyMap[date].rainfall += item.rain?.['3h'] || 0
  })

  return Object.keys(dailyMap).slice(0, 5).map(date => ({
    date,
    maxTemp:   Math.round(Math.max(...dailyMap[date].temps)),
    minTemp:   Math.round(Math.min(...dailyMap[date].temps)),
    weather:   dailyMap[date].weather,
    humidity:  dailyMap[date].humidity,
    windSpeed: dailyMap[date].windSpeed,
    rainfall:  Math.round(dailyMap[date].rainfall * 10) / 10,
  }))
}

// ─── 날씨 액션 ────────────────────────────────────────────────

// 위도/경도로 현재 날씨 + 시간별/주간 예보 불러오기
function weather(lat, lon) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))

      const [currentRes, forecastRes] = await Promise.all([
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`),
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`),
      ])

      dispatch(getWeather(currentRes.data))
      dispatch(getHourlyForecast(forecastRes.data))
      dispatch(getWeeklyForecast(parseWeeklyForecast(forecastRes.data)))

    } catch (error) {
      console.error('날씨 불러오기 실패', error.response?.status, error.message)
    } finally {
      dispatch(setLoading(false))
    }
  }
}

// 도시명으로 현재 날씨 + 시간별/주간 예보 불러오기 (검색 기능)
function searchAndSwitch(cityName) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))

      const [currentRes, forecastRes] = await Promise.all([
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`),
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`),
      ])

      dispatch(getWeather(currentRes.data))
      dispatch(getHourlyForecast(forecastRes.data))
      dispatch(getWeeklyForecast(parseWeeklyForecast(forecastRes.data)))

    } catch (error) {
      console.error('도시 검색 실패', error.message)
      alert('도시를 찾을 수 없습니다.')
    } finally {
      dispatch(setLoading(false))
    }
  }
}

// 저장된 도시 카드에 표시할 날씨 불러오기
function fetchCityWeather(city) {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${API_KEY}&units=metric`
      )
      dispatch(setCityWeather({ id: city.id, data: res.data }))
    } catch (error) {
      console.error(`${city.name} 날씨 불러오기 실패`, error.message)
    }
  }
}

// 도시명으로 검색 결과 목록 불러오기 (CityList 검색용)
function searchCity(cityName) {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      )
      dispatch(setSearchResults([{
        name:    res.data.name,
        country: res.data.sys.country,
        lat:     res.data.coord.lat,
        lon:     res.data.coord.lon,
      }]))
    } catch {
      dispatch(setSearchResults([]))
      alert('도시를 찾을 수 없습니다.')
    }
  }
}

// 주간 예보만 별도로 불러오기
function fetchWeeklyForecast(lat, lon) {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      )
      dispatch(getWeeklyForecast(parseWeeklyForecast(res.data)))
    } catch (error) {
      console.error('주간 예보 불러오기 실패', error.message)
    }
  }
}

// ─── 가위바위보 게임 액션 ──────────────────────────────────────

const GAME_ITEMS = {
  rock:     { name: '바위', emoji: '✊' },
  scissors: { name: '가위', emoji: '✌️' },
  paper:    { name: '보',   emoji: '🖐️' },
}

const WIN_CONDITIONS = [
  ['바위', '가위'],
  ['가위', '보'],
  ['보',   '바위'],
]

function playGame(choice) {
  return (dispatch) => {
    const user = GAME_ITEMS[choice]
    const comKey = Object.keys(GAME_ITEMS)[Math.floor(Math.random() * 3)]
    const com  = GAME_ITEMS[comKey]

    const result =
      user.name === com.name                                          ? 'DRAW' :
      WIN_CONDITIONS.some(([u, c]) => u === user.name && c === com.name) ? 'WIN'  : 'LOSE'

    dispatch(setGameUser(user))
    dispatch(setGameCom(com))
    dispatch(setGameResult(result))
    dispatch(updateGameScore(result))
  }
}

export const weatherAction = {
  weather,
  searchAndSwitch,
  fetchCityWeather,
  searchCity,
  fetchWeeklyForecast,
  playGame,
}
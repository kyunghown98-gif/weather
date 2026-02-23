import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { weatherAction } from './redux/weatherAction'

import Header from './components/Header'
import HeaderMarquee from './components/HeaderMarquee'
import CurrentWeather from './components/CurrentWeather'
import HourlyForecast from './components/HourlyForecast'
import WeeklyForecast from './components/WeeklyForecast'
import WeatherGraph from './components/WeatherGraph'
import CityList from './components/CityList'
import TodoList from './components/TodoList'
import Game from './components/Game'
import Game2 from './components/Game2'
import Game3 from './components/Game3'
import Game4 from './components/Game4'

import './App.css'

// 앱 최초 실행 시 불러올 기본 위치 (대구)
const DEFAULT_LOCATION = { lat: 35.8714, lon: 128.6014 }

const App = () => {
  const dispatch = useDispatch()
  const theme    = useSelector(state => state.weather.theme)

  useEffect(() => {
    dispatch(weatherAction.weather(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lon))
  }, [dispatch])

  return (
    <div className={`app ${theme}`}>
      <Header />
      <HeaderMarquee />

      <main className="layout">
        <section className="col-left">
          <CurrentWeather />
          <CityList />
        </section>

        <section className="col-center">
          <HourlyForecast />
          <WeatherGraph />
          <WeeklyForecast />
        </section>

        <section className="col-right">
          <TodoList />
          <Game />
          <Game2 />
          <Game3 />
          <Game4 />
        </section>
      </main>
    </div>
  )
}

export default App
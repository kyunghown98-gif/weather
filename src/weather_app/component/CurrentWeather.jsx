import React from 'react'
import { useSelector } from 'react-redux'
import '../css/currentweather.css'

const CurrentWeather = () => {
  const { currentWeather, loading, unit, weeklyForecast } = useSelector(state => state.weather)

  const convertTemp = (temp) => {
    if (unit === 'F') return Math.round(temp * 9 / 5 + 32)
    return Math.round(temp)
  }

  const getWeatherEmoji = (main, id) => {
    if (main === 'Clouds') return id === 801 ? '🌤️' : '☁️'
    const map = {
      Clear:        '☀️',
      Rain:         '🌧️',
      Drizzle:      '🌦️',
      Thunderstorm: '⛈️',
      Snow:         '❄️',
      Atmosphere:   '🌫️',
    }
    return map[main] ?? '⛅'
  }

  const getTodayDateString = () =>
    new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month:   'short',
      day:     'numeric',
      year:    'numeric',
    })

  if (loading || !currentWeather) {
    return <div className="currentweather">날씨 정보를 불러오는 중...</div>
  }

  const { name, main, weather, wind } = currentWeather
  const todayForecast = weeklyForecast?.[0]

  const highLow = todayForecast
    ? `${convertTemp(todayForecast.maxTemp)}° / ${convertTemp(todayForecast.minTemp)}°`
    : `${convertTemp(main.temp_max)}° / ${convertTemp(main.temp_min)}°`

  return (
    <div className="currentweather">
      <div className="location">
        <p>CURRENT LOCATION</p>
        <h2>{name}</h2>
        <span>{getTodayDateString()}</span>
      </div>

      <div className="icon">
        <span>{getWeatherEmoji(weather[0].main, weather[0].id)}</span>
      </div>

      <div className="temp">
        <p>{convertTemp(main.temp)}</p>
        <span>°{unit}</span>
      </div>

      <div className="description">
        <p>{weather[0].description}</p>
      </div>

      <div className="detail">
        <div className="box">
          <div className="text">
            <p>체감</p>
            <span>{convertTemp(main.feels_like)}°{unit}</span>
          </div>
        </div>
        <div className="box">
          <div className="text">
            <p>풍속</p>
            <span>{wind.speed}m/s</span>
          </div>
        </div>
        <div className="box">
          <div className="text">
            <p>최고/최저</p>
            <span>{highLow}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentWeather
import React from 'react'
import { useSelector } from 'react-redux'
import '../css/weeklyforecast.css'

const WeeklyForecast = () => {
  const { weeklyForecast, unit } = useSelector(state => state.weather)

  const convertTemp = (temp) => {
    if (unit === 'F') return Math.round(temp * 9 / 5 + 32)
    return Math.round(temp)
  }

  const getDayName = (dateString, index) => {
    if (index === 0) return 'TODAY'
    const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']
    return days[new Date(dateString).getDay()]
  }

  if (!weeklyForecast?.length) {
    return <div className="weeklyforecast">Loading...</div>
  }

  const allTemps  = weeklyForecast.flatMap(day => [day.minTemp, day.maxTemp])
  const globalMin = Math.min(...allTemps)
  const globalMax = Math.max(...allTemps)

  return (
    <div className="weeklyforecast">
      <h2 className="weekly-title">NEXT 5 DAYS</h2>
      <div className="weekly-list">
        {weeklyForecast.map((day, index) => {
          const range = globalMax - globalMin || 1
          const start = ((day.minTemp - globalMin) / range) * 100
          const width = ((day.maxTemp - day.minTemp) / range) * 100

          return (
            <div key={index} className="weekly-item">
              <div className="weekly-day">{getDayName(day.date, index)}</div>
              <img
                src={`https://openweathermap.org/img/wn/${day.weather.icon}@2x.png`}
                alt={day.weather.description}
                className="weekly-icon"
              />
              <span className="temp-min">{convertTemp(day.minTemp)}°{unit}</span>
              <div className="temp-bar">
                <div
                  className="temp-bar-fill"
                  style={{ left: `${start}%`, width: `${width}%` }}
                />
              </div>
              <span className="temp-max">{convertTemp(day.maxTemp)}°{unit}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default WeeklyForecast
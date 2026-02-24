import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setGraphType } from '../redux/slice'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import '../css/weathergraph.css'

const WeatherGraph = () => {
  const dispatch = useDispatch()
  const { weeklyForecast, graphType, unit } = useSelector(state => state.weather)

  const convertTemp = (temp) => {
    if (unit === 'F') return Math.round(temp * 9 / 5 + 32)
    return Math.round(temp)
  }

  const getDayName = (dateString) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    return days[new Date(dateString).getDay()]
  }

  const getUnit = () => {
    if (graphType === 'temperature') return `°${unit}`
    if (graphType === 'humidity')    return '%'
    return 'mm'
  }

  if (!weeklyForecast?.length) {
    return <div className="weathergraph"><p>주간 예보 데이터를 불러오는 중...</p></div>
  }

  // Recharts에 넘길 데이터 형태로 변환
  const chartData = weeklyForecast.map(day => ({
    day:         getDayName(day.date),
    temperature: convertTemp(day.maxTemp),
    humidity:    day.humidity,
    rainfall:    day.rainfall ?? 0,
  }))

  return (
    <div className="weathergraph">
      <div className="graph-header">
        <h2 className="graph-title">OVERVIEW</h2>
        <div className="graph-tabs">
          {['temperature', 'humidity', 'rainfall'].map(type => (
            <button
              key={type}
              className={graphType === type ? 'active' : ''}
              onClick={() => dispatch(setGraphType(type))}
            >
              {type.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="graph-container">
        
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="var(--marquee)" stopOpacity={0.5} />
                <stop offset="95%" stopColor="var(--marquee)" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />

            <XAxis
              dataKey="day"
              tick={{ fill: 'var(--text-sub, #aaa)', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: 'var(--text-sub, #aaa)', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={v => `${v}${getUnit()}`}
              width={55}
            />

          
            <Tooltip
              contentStyle={{
                background: 'var(--card-bg, #1e1e1e)',
                border:     '1px solid var(--border, #333)',
                borderRadius: '8px',
                color:      'var(--text, #fff)',
                fontSize:   '13px',
              }}
              formatter={v => [`${v}${getUnit()}`, graphType.toUpperCase()]}
              labelStyle={{ color: 'var(--marquee)', fontWeight: 'bold' }}
            />

            <Area
              type="monotone"
              dataKey={graphType}
              stroke="var(--marquee)"
              strokeWidth={3}
              fill="url(#areaGradient)"
              dot={{ fill: 'var(--marquee)', r: 5, strokeWidth: 0 }}
              activeDot={{ r: 7 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default WeatherGraph
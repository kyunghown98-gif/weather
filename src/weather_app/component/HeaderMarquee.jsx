import React, { useState, useEffect } from 'react'
import Marquee from 'react-fast-marquee'
import '../css/HeaderMarquee.css'

const HeaderMarquee = () => {
  const [timeInfo, setTimeInfo] = useState({ date: '', time: '' })

  useEffect(() => {
    const updateTime = () => {
      const now    = new Date()
      const days   = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']
      const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

      const hh = String(now.getHours()).padStart(2, '0')
      const mm = String(now.getMinutes()).padStart(2, '0')
      const ss = String(now.getSeconds()).padStart(2, '0')

      setTimeInfo({
        date: `${days[now.getDay()]} ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`,
        time: `${hh}:${mm}:${ss}`,
      })
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const messages = [
    `${timeInfo.date} — ${timeInfo.time}`,
    'DRESS FOR THE WEATHER NOT THE SEASON ☁️',
    'WEATHER. ® — CHECK BEFORE YOU STEP OUT ⚡',
    '오늘 뭐 입지? 날씨부터 확인 🔥',
    'STAY DRY STAY FLY 🌧️',
    'NO BAD WEATHER ONLY BAD OUTFITS',
  ]

  return (
    <div className="header-marquee">
      <Marquee speed={40} gradient={false}>
        {messages.map((msg, index) => (
          <span key={index}>{msg} —</span>
        ))}
      </Marquee>
    </div>
  )
}

export default HeaderMarquee
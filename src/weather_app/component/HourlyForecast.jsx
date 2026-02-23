import React from 'react'
import { useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, FreeMode } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/free-mode'
import '../css/hourlyforecast.css'

const HourlyForecast = () => {
  const { hourlyForecast, unit } = useSelector(state => state.weather)

  const convertTemp = (temp) => {
    if (unit === 'F') return Math.round(temp * 9 / 5 + 32)
    return Math.round(temp)
  }

  const formatHour = (dt_txt) => {
    const hours = new Date(dt_txt).getHours()
    return `${String(hours).padStart(2, '0')}시`
  }

  if (!hourlyForecast) {
    return <div className="hourlyforecast">시간별 예보 로딩 중...</div>
  }

  const hourlyData = hourlyForecast.list.slice(0, 8)

  return (
    <div className="hourlyforecast">
      <h2>HOURLY FORECAST</h2>
      <Swiper
        modules={[Navigation, FreeMode]}
        spaceBetween={10}
        freeMode={true}
        navigation={true}
        breakpoints={{
          100:  { slidesPerView: 3 },
          450:  { slidesPerView: 4 },
          650:  { slidesPerView: 5 },
          850:  { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
        className="hourly_swiper"
      >
        {hourlyData.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="hourly_item">
              <span className="hourly_time">{formatHour(item.dt_txt)}</span>
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt={item.weather[0].description}
                className="hourly_icon"
              />
              <span className="hourly_temp">{convertTemp(item.main.temp)}°{unit}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default HourlyForecast
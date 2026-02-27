import React, { useEffect, useState } from 'react'
import './App.css'
import './css/media.css'
import Header from './component/Header'
import HeaderMarquee from './component/HeaderMarquee'
import CurrentWeather from './component/CurrentWeather'
import HourlyForecast from './component/HourlyForecast'
import WeeklyForecast from './component/WeeklyForecast'
import WeatherGraph from './component/WeatherGraph'
import CityList from './component/CityList'
import { useDispatch, useSelector } from 'react-redux'
import { weatherAction } from './redux/weatherAction'
import Game from './component/Game'
import Game2 from './component/Game2'
import Game3 from './component/Game3'
import Game4 from './component/Game4'

const App = () => {
  const dispatch = useDispatch()
  const theme = useSelector(state => state.weather.theme)

  const [activePage, setActivePage] = useState('weather')
  const [gameTopTab, setGameTopTab]       = useState('game1')
  const [gameBottomTab, setGameBottomTab] = useState('game3')

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude
      const lon = position.coords.longitude
      dispatch(weatherAction.weather(lat, lon))
    })
  }

  useEffect(() => { getCurrentLocation() }, [])
  useEffect(() => { document.body.className = theme }, [theme])

  const renderGame = (num) => {
    if (num === 1) return <Game />
    if (num === 2) return <Game2 />
    if (num === 3) return <Game3 />
    if (num === 4) return <Game4 />
  }

  const renderTabletMobileGames = () => (
    <>
      <div className="tablet-game-half tablet-game-half--top">
        <div className="tablet-game-content">
          <div className="tablet-game-slot">
            {renderGame(gameTopTab === 'game1' ? 1 : 2)}
          </div>
        </div>
        <div className="game-corner-nav">
          <button className={gameTopTab === 'game1' ? 'active' : ''} onClick={() => setGameTopTab('game1')}>가위바위보</button>
          <button className={gameTopTab === 'game2' ? 'active' : ''} onClick={() => setGameTopTab('game2')}>숫자 맞추기 게임</button>
        </div>
      </div>

      <div className="tablet-game-half tablet-game-half--bottom">
        <div className="tablet-game-content">
          <div className="tablet-game-slot">
            {renderGame(gameBottomTab === 'game3' ? 3 : 4)}
          </div>
        </div>
        <div className="game-corner-nav">
          <button className={gameBottomTab === 'game3' ? 'active' : ''} onClick={() => setGameBottomTab('game3')}>반응속도 테스트</button>
          <button className={gameBottomTab === 'game4' ? 'active' : ''} onClick={() => setGameBottomTab('game4')}>기억력 게임</button>
        </div>
      </div>
    </>
  )

  return (
    <div>
      <Header />
      <HeaderMarquee />

      <div className="main">
        <div className="main_i">

          <div className="page-nav">
            <button
              className={activePage === 'weather' ? 'active' : ''}
              onClick={() => setActivePage('weather')}
            >WEATHER</button>

            <button
              className={activePage === 'game' ? 'active' : ''}
              onClick={() => setActivePage('game')}
            >GAME</button>
          </div>

          {/* ══ WEATHER 탭 ══ */}
          <div className={`list ${activePage !== 'weather' ? 'hidden-panel' : ''}`}>
            <CurrentWeather />
            <CityList />
          </div>

          <div className={`weather_infor ${activePage !== 'weather' ? 'hidden-panel' : ''}`}>
            <HourlyForecast />
            <WeeklyForecast />
            <WeatherGraph />
          </div>

          {/* ══ GAME 탭 (데스크탑·태블릿) ══ */}
          <div className={`game-grid-panel ${activePage !== 'game' ? 'hidden-panel' : ''}`}>
            <div className="game-slot desktop-slot"><Game /></div>
            <div className="game-slot desktop-slot"><Game2 /></div>
            <div className="game-slot desktop-slot"><Game3 /></div>
            <div className="game-slot desktop-slot"><Game4 /></div>

            {renderTabletMobileGames()}
          </div>

          {/* ══ 모바일 GAME 탭 ══ */}
          <div className={`mobile-game-panel ${activePage !== 'game' ? 'hidden-panel' : ''}`}>
            {renderTabletMobileGames()}
          </div>

        </div>
      </div>
    </div>
  )
}

export default App
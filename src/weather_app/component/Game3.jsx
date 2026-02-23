import { useState, useRef } from 'react'
import '../css/game3.css'

const Game3 = () => {
  const [status,       setStatus]       = useState('idle')
  const [reactionTime, setReactionTime] = useState(null)
  const [bestTime,     setBestTime]     = useState(null)
  const startTimeRef = useRef(null)
  const timerRef     = useRef(null)

  const startGame = () => {
    setStatus('waiting')
    setReactionTime(null)

    const delay = Math.random() * 3000 + 1000
    timerRef.current = setTimeout(() => {
      setStatus('ready')
      startTimeRef.current = Date.now()
    }, delay)
  }

  const handleBoxClick = () => {
    if (status === 'idle' || status === 'result') {
      startGame()
      return
    }

    if (status === 'waiting') {
      clearTimeout(timerRef.current)
      setStatus('idle')
      alert('너무 빨라요! 초록색이 될 때 클릭하세요 😅')
      return
    }

    if (status === 'ready') {
      const elapsed = Date.now() - startTimeRef.current
      setReactionTime(elapsed)
      setBestTime(prev => (prev === null || elapsed < prev ? elapsed : prev))
      setStatus('result')
    }
  }

  const getGrade = (time) => {
    if (time < 200) return { text: '⚡ 번개 반응!', colorClass: 'purple' }
    if (time < 300) return { text: '🔥 매우 빠름!', colorClass: 'green'  }
    if (time < 400) return { text: '👍 보통이에요', colorClass: 'blue'   }
    return               { text: '🐢 조금 느려요', colorClass: 'yellow' }
  }

  const statusMessage = {
    idle:    '클릭해서 시작!',
    waiting: '초록색이 되면 클릭!',
    ready:   '지금 클릭!',
    result:  '다시 클릭해서 도전!',
  }

  return (
    <div className="game3-container">
      <h2 className="game3-title">⚡ 반응속도 테스트</h2>
      <p className="game3-desc">초록색이 되는 순간 최대한 빠르게 클릭하세요!</p>

      <div className={`game3-box ${status}`} onClick={handleBoxClick}>
        <p className="game3-message">{statusMessage[status]}</p>

        {status === 'result' && reactionTime && (
          <>
            <p className="game3-time">{reactionTime}ms</p>
            <p className={`game3-grade ${getGrade(reactionTime).colorClass}`}>
              {getGrade(reactionTime).text}
            </p>
          </>
        )}
      </div>

      {bestTime && (
        <div className="game3-best">🏆 최고 기록: {bestTime}ms</div>
      )}
    </div>
  )
}

export default Game3
import { useState } from 'react'
import '../css/game2.css'

const getRandomNumber = () => Math.floor(Math.random() * 100) + 1

const Game2 = () => {
  const [answer,     setAnswer]     = useState(getRandomNumber)
  const [input,      setInput]      = useState('')
  const [hint,       setHint]       = useState('')
  const [tries,      setTries]      = useState(0)
  const [gameStatus, setGameStatus] = useState('playing')

  const handleGuess = () => {
    const guess = Number(input)

    if (!guess || guess < 1 || guess > 100) {
      setHint('1~100 사이 숫자를 입력해주세요!')
      return
    }

    const newTries = tries + 1
    setTries(newTries)
    setInput('')

    if (guess === answer) {
      setHint(`🎉 정답! ${newTries}번 만에 맞췄어요!`)
      setGameStatus('win')
      return
    }

    setHint(guess < answer ? '📈 더 높은 숫자예요!' : '📉 더 낮은 숫자예요!')
  }

  const handleReset = () => {
    setAnswer(getRandomNumber())
    setInput('')
    setHint('')
    setTries(0)
    setGameStatus('playing')
  }

  const triesColorClass =
    tries <= 3 ? 'tries-green' :
    tries <= 7 ? 'tries-yellow' : 'tries-red'

  return (
    <div className="game2-container">
      <h2 className="game2-title">🔢 숫자 맞추기</h2>
      <p className="game2-desc">1 ~ 100 사이의 숫자를 맞춰보세요!</p>

      <div className={`game2-tries ${triesColorClass}`}>
        시도 횟수: {tries}번
      </div>

      <div className={`game2-hint ${gameStatus === 'win' ? 'win' : 'default'}`}>
        {hint}
      </div>

      {gameStatus === 'playing' && (
        <div className="game2-input-wrap">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleGuess()}
            placeholder="숫자를 입력해주세요"
            min={1}
            max={100}
            className="game2-input"
          />
          <button onClick={handleGuess} className="game2-btn">확인</button>
        </div>
      )}

      {gameStatus === 'win' && (
        <button onClick={handleReset} className="game2-btn reset">🔄 다시하기</button>
      )}
    </div>
  )
}

export default Game2
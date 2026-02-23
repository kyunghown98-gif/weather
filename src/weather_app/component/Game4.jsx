import { useState } from 'react'
import '../css/game4.css'

const COLORS = ['#C82B03', '#00469B', '#006542', '#F0C71F']

const Game4 = () => {
  const [sequence,    setSequence]    = useState([])
  const [userInput,   setUserInput]   = useState([])
  const [activeColor, setActiveColor] = useState(null)
  const [status,      setStatus]      = useState('idle')
  const [level,       setLevel]       = useState(1)
  const [bestLevel,   setBestLevel]   = useState(1)

  const flashSequence = (seq) => {
    setUserInput([])
    setStatus('showing')

    seq.forEach((colorIndex, i) => {
      setTimeout(() => {
        setActiveColor(colorIndex)
        setTimeout(() => setActiveColor(null), 500)
      }, i * 900)
    })

    setTimeout(() => setStatus('input'), seq.length * 900 + 300)
  }

  const handleStart = () => {
    const first = Math.floor(Math.random() * 4)
    const seq   = [first]
    setSequence(seq)
    setLevel(1)
    flashSequence(seq)
  }

  const handleColorClick = (colorIndex) => {
    if (status !== 'input') return

    const newInput = [...userInput, colorIndex]
    setUserInput(newInput)
    setActiveColor(colorIndex)
    setTimeout(() => setActiveColor(null), 200)

    const step = newInput.length - 1

    if (newInput[step] !== sequence[step]) {
      setStatus('lose')
      setBestLevel(prev => Math.max(prev, level))
      return
    }

    if (newInput.length === sequence.length) {
      const nextLevel    = level + 1
      const nextSequence = [...sequence, Math.floor(Math.random() * 4)]
      setStatus('win')
      setLevel(nextLevel)
      setSequence(nextSequence)
      setTimeout(() => flashSequence(nextSequence), 1000)
    }
  }

  const statusMessage = {
    idle:    '시작 버튼을 눌러주세요!',
    showing: '순서를 잘 기억하세요! 👀',
    input:   '기억한 순서대로 클릭하세요!',
    win:     '✅ 정답! 다음 레벨...',
    lose:    '❌ 틀렸어요! 다시 도전해보세요',
  }

  const statusClass =
    status === 'win'  ? 'win'  :
    status === 'lose' ? 'lose' : 'default'

  return (
    <div className="game4-container">
      <h2 className="game4-title">🧠 기억력 게임</h2>
      <p className="game4-desc">색상이 깜빡이는 순서를 기억하고 따라 클릭하세요!</p>

      <div className="game4-score-wrap">
        <div className="game4-score-box level">🎯 레벨: {level}</div>
        <div className="game4-score-box best">🏆 최고: {bestLevel}</div>
      </div>

      <p className={`game4-status ${statusClass}`}>
        {statusMessage[status]}
      </p>

      <div className="game4-grid">
        {COLORS.map((color, i) => (
          <div
            key={i}
            className={`game4-color-btn ${activeColor === i ? 'active' : 'inactive'}`}
            onClick={() => handleColorClick(i)}
            style={{
              background: color,
              boxShadow:  activeColor === i ? `0 0 24px ${color}` : 'none',
              cursor:     status === 'input' ? 'pointer' : 'default',
            }}
          />
        ))}
      </div>

      {(status === 'idle' || status === 'lose') && (
        <button onClick={handleStart} className="game4-start-btn">
          {status === 'idle' ? '🎮 시작' : '🔄 다시하기'}
        </button>
      )}
    </div>
  )
}

export default Game4
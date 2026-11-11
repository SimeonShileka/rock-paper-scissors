import { useState, useEffect } from 'react'
import Header from './components/Header/Header'
import './index.css'

const CHOICES = ['rock', 'paper', 'scissors', 'lizard', 'spock']
const NORMAL_CHOICES = ['rock', 'paper', 'scissors']

const RULES = {
  rock: ['scissors', 'lizard'],
  paper: ['rock', 'spock'],
  scissors: ['paper', 'lizard'],
  lizard: ['paper', 'spock'],
  spock: ['rock', 'scissors']
}

function App() {
  const [mode, setMode] = useState(null)
  const [phase, setPhase] = useState('landing')
  const [score, setScore] = useState(() => {
    const saved = localStorage.getItem('rps-score')
    return saved ? parseInt(saved, 10) : 0
  })

  const [playerChoice, setPlayerChoice] = useState(null)
  const [computerChoice, setComputerChoice] = useState(null)
  const [result, setResult] = useState(null)
  const [showRules, setShowRules] = useState(false)

  useEffect(() => {
    localStorage.setItem('rps-score', score.toString())
  }, [score])

  const startGame = (selectedMode) => {
    setMode(selectedMode)
    setPhase('playing')
  }

  const handleChoice = (choice) => {
    setPlayerChoice(choice)
    setPhase('results')
    setComputerChoice(null)

    // Simulate thinking delay
    setTimeout(() => {
      const availableChoices = mode === 'normal' ? NORMAL_CHOICES : CHOICES
      const compChoice = availableChoices[Math.floor(Math.random() * availableChoices.length)]
      setComputerChoice(compChoice)

      const outcome = getResult(choice, compChoice)
      setResult(outcome)

      if (outcome === 'YOU WIN') setScore(s => s + 1)
      if (outcome === 'YOU LOSE') setScore(s => Math.max(0, s - 1))
    }, 1500)
  }

  const getResult = (player, comp) => {
    if (player === comp) return 'DRAW'
    if (RULES[player].includes(comp)) return 'YOU WIN'
    return 'YOU LOSE'
  }

  const playAgain = () => {
    setPlayerChoice(null)
    setComputerChoice(null)
    setResult(null)
    setPhase('playing')
  }

  const goHome = () => {
    setMode(null)
    setPhase('landing')
    setPlayerChoice(null)
    setComputerChoice(null)
    setResult(null)
  }

  return (
    <div className="app-container">
      {phase !== 'landing' && (
        <button className="nav-home global-nav" onClick={goHome}>← BACK</button>
      )}
      {phase !== 'landing' && (
        <Header mode={mode} score={score} />
      )}

      <main className="main-content">
        {phase === 'landing' && (
          <div className="landing">
            <button className="mode-btn" onClick={() => startGame('normal')}>ROCK PAPER SCISSORS</button>
            <button className="mode-btn" onClick={() => startGame('bonus')}>ROCK PAPER SCISSORS LIZARD SPOCK</button>
          </div>
        )}

        {phase === 'playing' && (
          <div className="game-board-container">
            <div className={`bg-shape ${mode}`}>
              {(mode === 'normal' ? NORMAL_CHOICES : CHOICES).map(choice => (
                <div key={choice} className={`choice-wrapper ${choice}`} onClick={() => handleChoice(choice)}>
                  <div className="choice-inner">
                    <img src={`/images/icon-${choice}.svg`} alt={choice} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {phase === 'results' && (
          <div className="results">
            <div className="choice-container">
              <h2>YOU PICKED</h2>
              <div className={`choice-wrapper result-choice ${playerChoice} ${result === 'YOU WIN' ? 'winner' : ''}`}>
                <div className="choice-inner">
                  <img src={`/images/icon-${playerChoice}.svg`} alt={playerChoice} />
                </div>
              </div>
            </div>

            <div className="result-announcement" style={{ visibility: computerChoice ? 'visible' : 'hidden' }}>
              <h1>{result || '...'}</h1>
              <button className="play-again-btn" onClick={playAgain}>PLAY AGAIN</button>
            </div>

            <div className="choice-container">
              <h2>THE HOUSE PICKED</h2>
              {computerChoice ? (
                <div className={`choice-wrapper result-choice ${computerChoice} ${result === 'YOU LOSE' ? 'winner' : ''}`}>
                  <div className="choice-inner">
                    <img src={`/images/icon-${computerChoice}.svg`} alt={computerChoice} />
                  </div>
                </div>
              ) : (
                <div className="placeholder">
                  <div className="loading-pulse"></div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {phase !== 'landing' && (
        <button className="rules-btn" onClick={() => setShowRules(true)}>RULES</button>
      )}

      {showRules && (
        <div className="modal-overlay" onClick={() => setShowRules(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>RULES</h2>
              <button className="close-btn" onClick={() => setShowRules(false)}>
                <img src="/images/icon-close.svg" alt="close" />
              </button>
            </div>
            <img
              src={mode === 'normal' ? '/images/image-rules.svg' : '/images/image-rules-bonus.svg'}
              alt="rules"
              className="rules-img"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default App

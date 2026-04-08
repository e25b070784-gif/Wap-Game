import { useState } from 'react'
import './App.css'

function App() {
  const [playerScore, setPlayerScore] = useState(0)
  const [computerScore, setComputerScore] = useState(0)
  const [round, setRound] = useState(1)
  const [history, setHistory] = useState([])
  const [streak, setStreak] = useState(0)
  const [resultMessage, setResultMessage] = useState('Choose your move to start!')
  
  const choices = ['👊 Rock', '✋ Paper', '✌️ Scissors'];
  
  const determineWinner = (playerChoice, computerChoice) => {
    if (playerChoice === computerChoice) return 'draw';
    if (
      (playerChoice === '👊 Rock' && computerChoice === '✌️ Scissors') ||
      (playerChoice === '✋ Paper' && computerChoice === '👊 Rock') ||
      (playerChoice === '✌️ Scissors' && computerChoice === '✋ Paper')
    ) {
      return 'player';
    }
    return 'computer';
  }

  const playGame = (playerChoice) => {
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    const winner = determineWinner(playerChoice, computerChoice);
    
    let resultText = '';
    
    if (winner === 'player') {
      setPlayerScore(prev => prev + 1);
      setStreak(prev => prev + 1);
      resultText = `You won! ${playerChoice} beats ${computerChoice}`;
    } else if (winner === 'computer') {
      setComputerScore(prev => prev + 1);
      setStreak(0);
      resultText = `You lost! ${computerChoice} beats ${playerChoice}`;
    } else {
      resultText = `It's a draw! Both chose ${playerChoice}`;
    }
    
    setResultMessage(resultText);
    setHistory(prev => [{ round, playerChoice, computerChoice, resultText }, ...prev]);
    setRound(prev => prev + 1);
  };
  
  const resetGame = () => {
    setPlayerScore(0);
    setComputerScore(0);
    setRound(1);
    setHistory([]);
    setStreak(0);
    setResultMessage('Choose your move to start!');
  };

  return (
    <div className="game-container">
      <h1>Rock Paper Scissors</h1>
      
      <div className="scoreboard">
        <div className="score-box">
          <h2>Player</h2>
          <p className="score">{playerScore}</p>
        </div>
        <div className="score-box">
          <h2>Computer</h2>
          <p className="score">{computerScore}</p>
        </div>
      </div>

      <div className="stats">
        <p>Round: {round}</p>
        <p>Winning Streak: {streak} 🔥</p>
      </div>

      <div className="result-area">
        <h2>{resultMessage}</h2>
      </div>

      <div className="choices">
        {choices.map(choice => (
          <button 
            key={choice} 
            className="choice-btn"
            onClick={() => playGame(choice)}
          >
            {choice}
          </button>
        ))}
      </div>

      <button className="reset-btn" onClick={resetGame}>↺ Reset Game</button>

      {history.length > 0 && (
        <div className="history">
          <h3>Match History</h3>
          <ul>
            {history.map((h, index) => (
              <li key={index}>
                <strong>Round {h.round}:</strong> {h.resultText}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default App
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { startGame, drawCard } from './actions';
import './App.css';

function App({ deck, gameStarted, drawCard, startGame, gameWon, gameCompleted }) {
  const [username, setUsername] = useState('');
  const [gameInitiated, setGameInitiated] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  useEffect(() => {
    if (gameCompleted)
    {fetchLeaderboard();
    window.location.reload()}

    
  }, [gameCompleted]);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('http://localhost:8080/leaderboard',{
        
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setLeaderboard(data);
      } else {
        console.error('Failed to fetch leaderboard');
      }
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
    }
  };

  const handleStartGame = async () => {
    try {
      const response = await fetch('http://localhost:8080/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
      if (response.ok) {
        startGame();
        setGameInitiated(true);
        
      } else {
        console.error('Failed to start game');
      }
    } catch (error) {
      console.error('Failed to start game:', error);
    }
  };

  const reversedDeck = [...deck].reverse(); // Reverse the deck

  return (
    <div className="app-container">
      {!gameInitiated && (
        <div>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button className="start-button" onClick={handleStartGame}>
            Start Game
          </button>
        </div>
      )}
      {gameStarted && (
        <div>
          <h1>Deck:</h1>
          <div className="deck">
            {reversedDeck.map((card, index) => ( // Use the reversed deck here
              <div className="card" key={index}>{card}</div>
            ))}
          </div>
          <button className="draw-button" onClick={drawCard}>
            Draw Card
          </button>
        </div>
      )}
      <h1>Leaderboard:</h1>
      <div className='leaderboard'>
        {leaderboard && leaderboard.map((entry, index) => (
          <div className='leaderboardElem' key={index}>
            <div className='username'>{entry.User}</div>
            <div className='games'>Games: {entry.Points}</div>
            <div className='wins'>Wins: {entry.Wins}</div> 
          </div>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  deck: state.deck,
  gameStarted: state.gameStarted,
  gameWon: state.gameWon,
  gameCompleted: state.gameCompleted,
});

const mapDispatchToProps = {
  startGame,
  drawCard,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

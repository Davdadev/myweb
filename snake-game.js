import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [started, setStarted] = useState(false);
  const [color, setColor] = useState('#000000'); // Default color
  const [snake, setSnake] = useState([]); // State for snake segments
  const [food, setFood] = useState({ x: 0, y: 0 }); // State for food position
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleStartGame = () => {
    // Implement game start logic
    setStarted(true);
  };

  const handleRestartGame = () => {
    // Implement game restart logic
    setStarted(false);
    setSnake([]);
    setFood({ x: 0, y: 0 });
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {!started ? (
        <div>
          <button onClick={handleStartGame} className="button">
            Start Game
          </button>
          <div>
            <label>Choose Snake Color: </label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
        </div>
      ) : (
        <div className="game-container">
          <div className="absolute top-0 left-0 p-2">Score: {score}</div>
          {snake.map((segment, index) => (
            <div
              key={index}
              className="snake-segment"
              style={{
                left: `${segment.x * 20}px`,
                top: `${segment.y * 20}px`,
                backgroundColor: color,
              }}
            />
          ))}
          <div
            className="food"
            style={{
              left: `${food.x * 20}px`,
              top: `${food.y * 20}px`,
            }}
          />
          {gameOver && (
            <div className="overlay">
              <div className="text-2xl text-red-500 mb-4">Game Over</div>
              <button onClick={handleRestartGame} className="button">
                Restart Game
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

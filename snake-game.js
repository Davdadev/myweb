// Inside the App component
const handleStartGame = () => {
  // Previous code remains the same
};

const handleRestartGame = () => {
  // Previous code remains the same
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
          <SnakeSegment
            key={index}
            x={segment.x}
            y={segment.y}
            color={color} // Pass the selected color to the SnakeSegment component
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

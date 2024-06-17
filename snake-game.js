const { useState, useEffect, useCallback } = React;

const SnakeSegment = ({ x, y, color }) => (
  <div
    className="snake-segment"
    style={{
      left: `${x * 20}px`,
      top: `${y * 20}px`,
      backgroundColor: color,
      borderRadius: '50%',
    }}
  />
);

const App = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [color, setColor] = useState('green');

  const handleKeyDown = useCallback((e) => {
    if (!started || gameOver) return;

    switch (e.key) {
      case 'ArrowUp':
        if (direction !== 'DOWN') setDirection('UP');
        break;
      case 'ArrowDown':
        if (direction !== 'UP') setDirection('DOWN');
        break;
      case 'ArrowLeft':
        if (direction !== 'RIGHT') setDirection('LEFT');
        break;
      case 'ArrowRight':
        if (direction !== 'LEFT') setDirection('RIGHT');
        break;
      case ' ':
        setPaused(!paused);
        break;
      default:
        break;
    }
  }, [direction, started, gameOver, paused]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    if (gameOver || !started || paused) return;

    const moveSnake = () => {
      const newSnake = [...snake];
      let head = { ...newSnake[0] };

      switch (direction) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
        default:
          break;
      }

      newSnake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        let newFood;
        do {
          newFood = {
            x: Math.floor(Math.random() * 20),
            y: Math.floor(Math.random() * 20),
          };
        } while (newSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
        
        setFood(newFood);
        setScore(score + 1);
      } else {
        newSnake.pop();
      }

      if (
        head.x < 0 ||
        head.x >= 20 ||
        head.y < 0 ||
        head.y >= 20 ||
        newSnake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
      ) {
        setGameOver(true);
      } else {
        setSnake(newSnake);
      }
    };

    const interval = setInterval(moveSnake, 200);
    return () => clearInterval(interval);
  }, [snake, direction, food, gameOver, started, paused, score]);

  const handleStartGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    setStarted(true);
    setPaused(false);
  };

  const handleRestartGame = () => {
    setStarted(false);
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
            <SnakeSegment
              key={index}
              x={segment.x}
              y={segment.y}
              color={color}
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

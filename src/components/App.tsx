import React, {useState} from 'react';
import Game from './Game';

const App = () => {
  const [gameId, setGameId] = useState(1);

  return (
    <Game
      key={gameId}
      randomNumberCount={6}
      resetGameOnPress={() => setGameId(pre => pre + 1)}
    />
  );
};

export default App;

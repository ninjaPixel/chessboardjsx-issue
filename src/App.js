import React, {useState, useRef, useEffect} from 'react';
import logo from './logo.svg';
import Chessboard from 'chessboardjsx'
import Chess from '@ninjapixel/chess';
import _ from 'lodash';

import './App.css';

function App() {
  const game = useRef(new Chess());
  const [fen, setFen] = useState(game.current.fen());
  const [play, setPlay] = useState(false);
  const [colorToPlay, setColorToPlay] = useState(game.current.turn());

  useEffect(() => {
    if (play) {
      const possibleMoves = game.current.moves({verbose: true});
      const randomIndex = _.random(0, possibleMoves.length - 1);
      game.current.move(possibleMoves[randomIndex]);
      setFen(game.current.fen())
      // setColorToPlay(game.current.turn())
       setTimeout(() => {
        setColorToPlay(game.current.turn());
      }, 1000);
    }

  }, [colorToPlay, play]);

  return (
    <div className="App">
      <header className="App-header">
        <Chessboard
          id="arena"
          position={fen}
          transitionDuration={500}
          lightSquareStyle={{backgroundColor: '#edf2f7'}}
          darkSquareStyle={{backgroundColor: '#a0aec0'}}
          width={400}
        />
        <button onClick={() => setPlay(!play)}>Play/Pause</button>
      </header>
    </div>
  );
}

export default App;

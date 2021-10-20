import React, { useState } from 'react';
import './App.css';
import Dombserver from './lib/components/Dombserver';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Modify DOM tree with devtools to see the effect
        </p>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
        <Dombserver>
          <div className="Warning">
            Be aware, someone is trying to scam you by modifying DOM tree.
          </div>
        </Dombserver>
      </header>
    </div>
  );
}

export default App;

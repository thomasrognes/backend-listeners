import React from 'react';
import './App.css';
import { ServerSentEvents } from './components/ServerSentEvents';
import { FetchWithPolling } from './components/Polling';

export const BaseURL = 'http://localhost:8000';

function App() {
  return (
    <div className="app">
      <div>
        <h1>Backend listeners</h1>
        <p>Åpne devtools for å se hva som skjer i network taben.</p>
      </div>
      <ServerSentEvents />
      <FetchWithPolling />
    </div>
  );
}

export default App;

import React from 'react';

function App() {
  return (
    <div className="App">
      <div className="w-full flex justify-center pt-5 pb-2">
        <h1 className="text-5xl text-purple-600 font-sans">
          Online Tic-Tac-Toe
        </h1>
      </div>
      <div className="w-screnn h-screen bg-gray-300">
        <div>
          {/* match button */}
          <div></div>
          {/* chatting */}
          <div></div>
        </div>
        {/* leaderboard */}
        <div></div>
      </div>
    </div>
  );
}

export default App;

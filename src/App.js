import React from 'react';

function App() {
  return (
    <div className="App flex flex-col justify-between h-screen">
      <div className="w-full flex justify-center pt-4 pb-2">
        <h1 className="text-5xl text-purple-600 font-sans">
          Online Tic-Tac-Toe
        </h1>
      </div>
      {/* body */}
      <div className="w-screen h-full bg-gray-300 flex">
        {/* left-side container */}
        <div className="w-7/12 h-full flex flex-col">
          {/* match button */}
          <div className="flex-basis-2 flex flex-col justify-center items-center">
            <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded text-4xl">
              PLAY NOW!
            </button>
            <div className="pt-3 text-2xl text-gray-700">0:00</div>
          </div>

          {/* chatting */}
          <div className="flex-basis-1">
            <ul className="px-4 py-2">
              <li>
                <div>username</div>
                <div>hello</div>
              </li>
            </ul>
          </div>
        </div>
        {/* right-side container */}
        <div>
          {/* leaderboard */}
          <div>
            <ul className="">
              <li>
                <div>1</div>
                <div>username</div>
                <div>score</div>
              </li>
            </ul>
          </div>
          {/* history */}
          <div>
            <ul>
              <li>
                <div>2020-07-01</div>
                <div>username</div>
                <div>vs</div>
                <div>username2</div>
                <div>LOSE</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

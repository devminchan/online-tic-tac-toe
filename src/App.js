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
          <div className="flex-basis-1 px-4 py-2 flex flex-col">
            <ul className="flex-grow h-auto flex flex-col-reverse">
              <li className="w-full mx-2 flex flex-wrap">
                <div className="mr-4 text-base font-semibold">username</div>
                <div>hello</div>
              </li>
              <li className="w-full mx-2 flex flex-wrap">
                <div className="mr-4 text-base font-semibold">username</div>
                <div>hi</div>
              </li>
            </ul>
            <div className="mt-2 h-12">
              <form action="" className="w-full h-full flex items-center">
                <input
                  className="flex-grow h-8 px-2 rounded"
                  type="text"
                  placeholder="Input Text!"
                />
                <button
                  className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-1 px-4 ml-4 rounded text-base"
                  type="submit"
                >
                  전송
                </button>
              </form>
            </div>
          </div>
        </div>
        {/* right-side container */}
        <div className="w-5/12 pt-8 pb-4 pl-8 pr-8">
          {/* leaderboard */}
          <div className="bg-gray-400 w-full h-full rounded">
            <div className="flex justify-center pt-2 pb-4">
              <h3 className="text-3xl text-purple-600">LEADERBOARDS</h3>
            </div>
            <ul className="">
              <li className="flex bg-gray-500 rounded ml-6 mr-6 pl-4 pr-4 pt-1 pb-1 text-xl">
                <div>1</div>
                <div className="ml-5">username</div>
                <div className="ml-auto">score</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

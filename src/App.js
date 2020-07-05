import React from 'react';
import GameBoard from './components/GameBoard';
import * as Colyseus from 'colyseus.js';
import { List } from 'immutable';

class App extends React.Component {
  state = {
    gmaeState: false,
    chatState: List([]),
  };

  constructor() {
    super();

    // use current hostname/port as colyseus server endpoint
    const endpoint = process.env.SERVER_URL || 'ws://localhost:2567';
    this.client = new Colyseus.Client(endpoint);
  }

  setGameState = (gameState) => {
    this.setState({
      ...this.state,
      gameState,
    });
  };

  setChatState = (chatState) => {
    this.setState({
      ...this.state,
      chatState,
    });
  };

  handleGameStart = async (e) => {
    this.room = await this.client.joinOrCreate('game_room');

    this.room.onMessage('joined', (player) => {
      const message = `player ${player.username} joined.`;

      const newChatState = this.state.chatState.unshift(message);
      this.setChatState(newChatState);
    });

    this.room.onMessage('messages', (message) => {
      const newChatState = this.state.chatState.unshift(message);
      this.setChatState(newChatState);
    });

    this.room.onMessage('gameResult', (gameResult) => {
      alert('Gameover!');

      console.log(gameResult);
    });

    this.setGameState(true);
  };

  handleGameStop = (e) => {
    if (this.room) {
      this.room.send('exit');
    }

    this.setGameState(false);
  };

  render() {
    const rankingList = [1, 2, 3];

    return (
      <div className="App justify-between h-screen">
        {/* body */}
        <div className="w-screen h-full bg-gray-300 flex">
          {/* left-side container */}
          <div className="w-7/12 block flex flex-col">
            {/* match button & game board */}
            <div className="w-full flex-grow relative">
              {this.state.gameState ? (
                /* game board */
                <div className="w-full h-full flex flex-col justify-center items-center">
                  <p className="h-auto mt-4 text-xl text-purple-500">
                    Username vs Username
                  </p>
                  <div className="w-2/3 mt-2 mb-2 h-full flex justify-center">
                    <GameBoard
                      onGameEnd={this.handleGameStop}
                      room={this.room}
                    />
                  </div>
                </div>
              ) : (
                /* match button */
                <div className="w-full h-full flex flex-col justify-center items-center">
                  <p className="absolute top-0 mt-4 text-xl text-purple-500">
                    welcome to online tic-tac-toe!
                  </p>
                  <button
                    className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded text-4xl"
                    onClick={this.handleGameStart}
                  >
                    PLAY NOW!
                  </button>
                  <div className="pt-3 text-2xl text-gray-700">0:00</div>
                </div>
              )}
            </div>

            {/* chatting */}
            <div className="w-full px-4 py-2 block">
              <ul className="h-48 flex-grow-0 flex flex-col-reverse overflow-auto">
                {this.state.chatState.map((chat, key) => (
                  <li key={key} className="w-full mx-2 flex flex-wrap">
                    <div className="mr-4 text-base font-semibold">username</div>
                    <div>{chat}</div>
                  </li>
                ))}
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
            <div className="bg-gray-400 w-full h-full rounded flex flex-col">
              <div className="flex justify-center pt-2 pb-4">
                <h3 className="text-3xl text-purple-600">LEADERBOARDS</h3>
              </div>
              <ul className="flex-grow overflow-y-auto">
                {rankingList.map((idx) => (
                  <li key={idx} className="block w-full">
                    <div className="flex bg-gray-500 rounded ml-6 mr-6 pl-4 pr-4 pt-1 pb-1 text-xl mb-2">
                      <div className="w-3">{idx}</div>
                      <div className="ml-5">username</div>
                      <div className="ml-auto">score</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

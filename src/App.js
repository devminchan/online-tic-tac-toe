/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import GameBoard from './components/GameBoard';
import * as Colyseus from 'colyseus.js';
import { List } from 'immutable';
import { Link } from 'react-router-dom';
import { SERVER_URL } from './constants';
import withUser from './containers/withUser';

class App extends React.Component {
  state = {
    players: [],
    gmaeState: false,
    chatState: List([]),
    chatMessage: '',
  };

  constructor({ history }) {
    super();

    // use current hostname/port as colyseus server endpoint
    const endpoint = `${
      process.env.NODE_ENV === 'production' ? 'wss' : 'ws'
    }://${SERVER_URL}`;
    this.client = new Colyseus.Client(endpoint);

    this.history = history;
    this.chatUlRef = React.createRef();
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
    const token = localStorage.getItem('token');

    this.room = await this.client.joinOrCreate('game_room', {
      accessToken: token,
    });

    this.room.onMessage('messages', (message) => {
      const newChatState = this.state.chatState.push(message);
      this.setChatState(newChatState);

      // 채팅 focus 이동
      if (this.chatUlRef.current) {
        this.chatUlRef.current.scrollTop = this.chatUlRef.current.scrollHeight;
      }
    });

    this.room.onMessage('players', (players) => {
      this.setState({
        ...this.state,
        players,
      });
    });

    this.setGameState(true);
  };

  handleGameStop = (result) => {
    if (result.winner) {
      alert(`Winner is ${result.winner}`);
    } else {
      alert(`Draw!`);
    }

    if (this.room) {
      this.room.send('exit');
    }

    if (result.winner) {
      this.setState({
        ...this.state,
        gameState: false,
        players: [],
        chatMessage: '',
      });
    } else {
      this.setState({
        ...this.state,
        gameState: false,
        players: [],
        chatMessage: '',
      });
    }
  };

  handleGameLeft = (e) => {
    e.preventDefault();

    if (this.room) {
      this.room.send('exit');
    }

    this.setState({
      ...this.state,
      gameState: false,
      players: [],
      chatMessage: '',
    });
  };

  handleChangeMessage = (e) => {
    const message = e.target.value;

    this.setState({
      ...this.state,
      chatMessage: message,
    });
  };

  handleSendMessage = (e) => {
    e.preventDefault();

    if (!this.room) {
      return;
    }

    this.room.send('message', {
      message: this.state.chatMessage,
    });

    this.setState({
      ...this.state,
      chatMessage: '',
    });
  };

  render() {
    let matchStr = 'Waiting for new game...';

    if (this.state.players.length >= 2) {
      matchStr = `${this.state.players[0].username} VS ${this.state.players[1].username}`;
    }

    return (
      <div className="App w-screen h-screen">
        {/* body */}
        <div className="w-full h-full bg-gray-300 flex">
          {/* left-side container */}
          <div className="w-full lg:w-7/12 flex flex-col relative">
            {/* match button & game board */}
            <div className="w-full flex-1">
              {this.state.gameState ? (
                /* game board */
                <div className="w-full h-full flex flex-col justify-start items-center">
                  <div className="flex justify-around items-center h-auto mt-4 text-xl text-purple-500">
                    {matchStr}
                    <a
                      className="ml-4 text-base text-purple-500 hover:text-purple-800"
                      href="#"
                      onClick={this.handleGameLeft}
                    >
                      Left game
                    </a>
                  </div>
                  <div className="w-full sm:w-4/5 md:w-7/12 lg:w-2/3 pt-4 pb-4 pl-4 pr-4 lg:mb-32 flex justify-center">
                    <div className="pb-100p"></div>
                    <GameBoard
                      onGameEnd={this.handleGameStop}
                      room={this.room}
                    />
                  </div>
                </div>
              ) : this.props.userState ? (
                /* match button */
                <div className="w-full h-full flex flex-col justify-center items-center">
                  <p className="absolute top-0 mt-4 text-xl text-purple-500">
                    {`Logged in as ${this.props.userState.username}`}
                  </p>
                  <button
                    className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded text-4xl mb-4"
                    onClick={this.handleGameStart}
                  >
                    PLAY NOW!
                  </button>
                  <Link
                    to="/setting"
                    className="mb-16 sm:mb-24 md:mb-32 lg:mb-40"
                  >
                    <a className="text-xl lg:text-2xl text-purple-600">
                      Setting
                    </a>
                  </Link>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col justify-center items-center">
                  <Link to="/login">
                    <a className="text-xl lg:text-2xl text-purple-600">Login</a>
                  </Link>
                  <div className="text-gray-800">or</div>
                  <Link
                    to="/signup"
                    className="mb-16 sm:mb-24 md:mb-32 lg:mb-40"
                  >
                    <a className="text-xl lg:text-2xl text-purple-600">
                      Signup
                    </a>
                  </Link>
                </div>
              )}
            </div>

            {/* chatting */}
            <div className="w-full flex-initial px-4 py-2 block absolute bottom-0">
              <ul className="h-32 lg:h-48 overflow-auto" ref={this.chatUlRef}>
                {this.state.chatState.map((chat, key) => (
                  <li key={key} className="w-full mx-2 flex flex-wrap">
                    <div className="text-opacity-75 text-indigo-900">
                      {chat}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-2 h-12 pointer-events-auto">
                <form action="" className="w-full h-full flex items-center">
                  <input
                    className="flex-grow h-8 px-2 rounded"
                    type="text"
                    placeholder="Input Text!"
                    onChange={this.handleChangeMessage}
                    value={this.state.chatMessage}
                  />
                  <button
                    className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-1 px-4 ml-4 rounded text-base"
                    type="submit"
                    onClick={this.handleSendMessage}
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
          {/* right-side container */}
          <div className="w-0 hidden lg:block lg:w-5/12 pt-8 pb-4 pl-8 pr-8">
            {/* leaderboard */}
            <div className="bg-gray-400 w-full h-full rounded flex flex-col">
              <div className="flex justify-center pt-2 pb-4">
                <h3 className="text-3xl text-purple-600">LEADERBOARDS</h3>
              </div>
              <div className="text-2xl text-center mt-4">COMMING SOON!</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withUser(App);

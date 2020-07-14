/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import GameBoard from './components/GameBoard';
import * as Colyseus from 'colyseus.js';
import { Link } from 'react-router-dom';
import { SERVER_URL } from './constants';
import withUser from './containers/withUser';
import { Chatting } from './components/Chatting';

class App extends React.Component {
  state = {
    players: [],
    gmaeState: false,
    chatState: [],
  };

  constructor({ history }) {
    super();

    // use current hostname/port as colyseus server endpoint
    const endpoint = `${
      process.env.NODE_ENV === 'production' ? 'wss' : 'ws'
    }://${SERVER_URL}`;
    this.client = new Colyseus.Client(endpoint);

    this.history = history;
  }

  setGameState = (gameState) => {
    this.setState({
      ...this.state,
      gameState,
    });
  };

  handleGameStart = async (e) => {
    const token = localStorage.getItem('token');

    this.room = await this.client.joinOrCreate('game_room', {
      accessToken: token,
    });

    this.room.onMessage('messages', (message) => {
      const newChatState = [...this.state.chatState, message];

      this.setState({
        ...this.state,
        chatState: newChatState,
      });
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
      });
    } else {
      this.setState({
        ...this.state,
        gameState: false,
        players: [],
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

  handleSendMessage = (message) => {
    if (!this.room) {
      return;
    }

    this.room.send('message', {
      message,
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
                  <div className="flex justify-around items-center h-auto mt-2 lg:mt-4 text-xl text-purple-500">
                    {matchStr}
                    <a
                      className="ml-4 text-base text-purple-500 hover:text-purple-800"
                      href="#"
                      onClick={this.handleGameLeft}
                    >
                      Left game
                    </a>
                  </div>
                  <div className="w-full h-auto sm:w-4/5 md:w-7/12 lg:w-3/4 lg:mt-8 flex justify-center">
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
                  <p className="absolute top-0 mt-2 lg:mt-4 text-xl text-purple-500">
                    {`Logged in as ${this.props.userState.username}`}
                  </p>
                  <button
                    className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded text-4xl mb-4"
                    onClick={this.handleGameStart}
                  >
                    PLAY NOW!
                  </button>
                  <Link to="/setting" className="mb-4 lg:mb-8">
                    <p className="text-xl lg:text-2xl text-purple-600">
                      Setting
                    </p>
                  </Link>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col justify-center items-center">
                  <Link to="/login">
                    <p className="text-xl lg:text-2xl text-purple-600">Login</p>
                  </Link>
                  <div className="text-gray-800">or</div>
                  <Link
                    to="/signup"
                    className="mb-16 sm:mb-24 md:mb-32 lg:mb-40"
                  >
                    <p className="text-xl lg:text-2xl text-purple-600">
                      Signup
                    </p>
                  </Link>
                </div>
              )}
            </div>

            {/* chatting */}
            <div className="w-full mt-4 h-1_3 block lg:hidden fixed bottom-0">
              <Chatting
                chatState={this.state.chatState}
                onSendMessage={this.handleSendMessage}
              />
            </div>
          </div>

          {/* right-side container */}
          <div className="w-auto h-full hidden items-stretch flex-col lg:flex lg:w-5/12 pt-8 pb-4 pl-2 pr-8">
            {/* leaderboard */}
            <div className="h-auto bg-gray-400 flex-1 w-full rounded flex flex-col">
              <div className="flex justify-center pt-2 pb-4">
                <h3 className="text-3xl text-purple-600">LEADERBOARDS</h3>
              </div>
              <div className="text-2xl text-center mt-4">COMMING SOON!</div>
            </div>

            {/* chatting */}
            <div className="w-full mt-4 h-1_3 hidden lg:block">
              <Chatting
                chatState={this.state.chatState}
                onSendMessage={this.handleSendMessage}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withUser(App);

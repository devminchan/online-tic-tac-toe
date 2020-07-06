import React from 'react';

class GameBoard extends React.Component {
  state = {
    markState: [],
    turnCount: 0,
  };

  constructor({ onGameEnd, room }) {
    super();
    this.room = room;
    this.onGameEnd = onGameEnd;
  }

  componentDidMount(props) {
    this.room.onMessage('gameEvent', (mark) => {
      this.setState({
        markState: [...this.state.markState, mark],
        turnCount: this.state.turnCount + 1,
      });
    });

    this.room.onMessage('gameResult', (result) => {
      this.onGameEnd(result);
    });
  }

  reduceNumbers = () => {
    const arr = [];

    for (let i = 0; i < 100; i++) {
      arr.push(i);
    }

    return arr;
  };

  handleBoardClick = (idx) => {
    this.room.send('mark', {
      point: idx,
    });
  };

  render() {
    return (
      <div className="h-full w-full bg-gray-400 grid grid-cols-10 grid-rows-10 rounded">
        {this.reduceNumbers().map((idx) => (
          <div
            key={idx}
            className="border flex justify-center items-center relative"
            onClick={() => this.handleBoardClick(idx)}
          >
            {this.state.markState.find((mark) => mark.point === idx) ? (
              <div className="absolute text-xl">
                {this.state.markState.find((mark) => mark.point === idx)
                  .turnNumber %
                  2 ===
                0
                  ? 'X'
                  : 'O'}
              </div>
            ) : (
              ''
            )}
          </div>
        ))}
      </div>
    );
  }
}

export default GameBoard;

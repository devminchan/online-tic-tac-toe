import React, { useState, useEffect } from 'react';

const userId = '1';
const opponentId = '2';

function GameBoard({ onGameEnd }) {
  const [mapState, setMapState] = useState(Array(100).fill(null));
  const [turnCount, setTurnCount] = useState(0);

  const handleBoardClick = (event) => {
    const cellId = event.target.attributes.getNamedItem('cell-id').value;
    let nowUserId = userId;

    if (turnCount % 2 === 0) {
      nowUserId = opponentId;
    }

    // 임시
    // 게임 종료 상황 연출
    if (turnCount === 6) {
      handleGameEvent(null);
    }

    if (mapState[cellId]) {
      return;
    }

    const newMapState = mapState.slice();

    newMapState.splice(cellId, 1, {
      userId: nowUserId,
      turn: turnCount,
    });

    setMapState(newMapState);
    setTurnCount(turnCount + 1);
  };

  const handleGameEvent = (customEvent) => {
    onGameEnd();
  };

  useEffect(() => {
    // on create
    console.log('game start!');

    return () => {
      // on destory
      console.log('end game');
    };
  }, []);

  return (
    <div className="h-full w-full bg-gray-400 grid grid-cols-10 grid-rows-10 rounded">
      {[...Array(100).keys()].map((idx) => (
        <div
          key={idx}
          cell-id={idx}
          className="border flex justify-center items-center relative"
          onClick={handleBoardClick}
        >
          {mapState[idx] ? (
            <div className="absolute text-xl">
              {mapState[idx].turn % 2 === 0 ? 'X' : 'O'}
            </div>
          ) : (
            ''
          )}
        </div>
      ))}
    </div>
  );
}

export default GameBoard;

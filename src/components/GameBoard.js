import React, { useState } from 'react';

const userId = '1';
const opponentId = '2';

function GameBoard() {
  const [mapState, setMapState] = useState(Array(100).fill(null));
  const [turnCount, setTurnCount] = useState(0);

  const handleBoardClick = (e) => {
    const cellId = e.target.attributes.getNamedItem('cell-id').value;
    let nowUserId = userId;

    if (turnCount % 2 === 0) {
      nowUserId = opponentId;
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

  return (
    <div className="h-full w-full bg-gray-400 grid grid-cols-10 grid-rows-10 rounded">
      {[...Array(100).keys()].map((idx) => (
        <div
          cell-id={idx}
          className="border flex justify-center items-center relative"
          onClick={handleBoardClick}
        >
          {mapState[idx] ? (
            <div className="absolute">{mapState[idx].userId}</div>
          ) : (
            ''
          )}
        </div>
      ))}
    </div>
  );
}

export default GameBoard;

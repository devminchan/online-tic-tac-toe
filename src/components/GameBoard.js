import React from 'react';

function GameBoard() {
  return (
    <div className="h-full w-full bg-gray-400 grid grid-cols-10 grid-rows-10 rounded">
      {[...Array(100).keys()].map((idx) => (
        <div className="border"></div>
      ))}
    </div>
  );
}

export default GameBoard;

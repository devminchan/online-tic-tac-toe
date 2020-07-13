import React, { useEffect, useRef, useState } from 'react';

export function Chatting({ chatState, onSendMessage }) {
  const myRef = useRef(null);
  const [chatMessage, setChatMessage] = useState('');

  const executeScroll = () => {
    if (myRef.current) {
      myRef.current.scrollTop = myRef.current.scrollHeight;
    }
  };

  const handleSumbitMessage = (e) => {
    e.preventDefault();
    onSendMessage(chatMessage);
    setChatMessage('');
  };

  useEffect(() => {
    executeScroll();
  }, [chatState]);

  return (
    <div className="w-full h-full px-2 py-2 flex flex-col">
      <ul
        className="max-w-full overflow-x-hidden h-auto overflow-y-auto flex-auto"
        ref={myRef}
      >
        {chatState &&
          chatState.map((chat, key) => (
            <li key={key} className="w-full mx-1 flex flex-wrap">
              <div className="text-opacity-75 text-indigo-900">{chat}</div>
            </li>
          ))}
      </ul>
      <div className="w-full mt-2 h-12 pointer-events-auto">
        <form
          action=""
          className="w-full h-full flex items-center"
          onSubmit={handleSumbitMessage}
        >
          <input
            className="flex-grow h-8 px-2 rounded"
            type="text"
            placeholder="Input Text!"
            onChange={(e) => setChatMessage(e.target.value)}
            value={chatMessage}
          />
          <button
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-1 px-4 ml-4 rounded text-base"
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

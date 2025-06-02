import { MessageSquare } from 'lucide-react';
import React from 'react'

const NoChatSelected = () => {
  return (
    <div className="flex flex-col gap-3 justify-center items-center h-full w-full">
      <div className="bg-indigo-950 p-2 rounded-xl animate-bounce">
        <MessageSquare />
      </div>
      <h1 className='text-xl font-bold'>Welcome to ChatApp</h1>
      <p className='text-center'>select a conversation from sidebar to start chatting</p>
    </div>
  );
}

export default NoChatSelected
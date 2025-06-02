import React from 'react'
import { useChatstore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuth';
import { X } from "lucide-react";


const ChatHeader = () => {
  const {
      messages,
      getMessages,
      selectedUser,
      setSelectedUser,
      
    } = useChatstore();
    const { onlineUsers } = useAuthStore();

  return (
    <div className="w-full h-14 bg-gray-800 flex items-center justify-between p-5">
      <div className="flex items-center gap-2">
        <div className="relative">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt="userPicture"
                className="min-w-10 w-10 h-10 rounded-full object-cover"
              />
              {onlineUsers.includes(selectedUser._id) && (
                <span className="w-3 h-3 border-2 border-gray-900 bg-green-500 absolute bottom-0 right-0 rounded-full"></span>
              )}
            </div>
        <div className="">
          <p>{selectedUser.fullName}</p>
          <p className="text-sm text-gray-400">
            {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}{" "}
          </p>
        </div>
      </div>
      <button
        onClick={() => setSelectedUser(null)}
        className="text-white rounded-lg hover:bg-base-300 p-2 cursor-pointer"
      >
        <X />
      </button>
    </div>
  );
}

export default ChatHeader
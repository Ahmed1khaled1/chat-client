import React from "react";
import Sidebar from "../components/Sidebar";
import { useChatstore } from "../store/useChatStore";
import Chatcontainer from "../components/Chatcontainer";
import NoChatSelected from "../components/NoChatSelected";

const Home = () => {
  const { selectedUser } = useChatstore();

  return (
    <div className="bg-base-200 h-[calc(100%-48px)] flex justify-center items-center">
      
      <div className="bg-gray-900 rounded-lg w-full max-w-6xl h-full md:h-[90%] flex overflow-hidden">
        <Sidebar />
        {selectedUser ? <Chatcontainer /> : <NoChatSelected />}
      </div>
    </div>
  );
};

export default Home;

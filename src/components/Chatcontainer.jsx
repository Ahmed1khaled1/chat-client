import React, { useEffect, useRef } from "react";
import { useChatstore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuth";
import ChatHeader from "./ChatHeader";
import MessageSkeleton from "./MessageSkeletons";
import MessageInput from "./MessageInput";
import { formatMessageTime } from "../lib/utils";

const Chatcontainer = () => {
  const {
    messages,
    getMessages,
    selectedUser,
    isMessegesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatstore();
  const { authUser } = useAuthStore();
  const messageRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser?._id);
    subscribeToMessages();
    return () => {
      unsubscribeFromMessages();
    };
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageRef.current && messages)
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
  }, [messages]);

  if (isMessegesLoading)
    return (
      <div className="w-full min-h-full flex flex-col items-center justify-center">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );

  return (
    <div className="w-full h-full flex flex-col items-center">
      {/* top */}
      <ChatHeader />
      {/* messages */}
      <div className="w-full h-full overflow-hidden">
        <div
          ref={messageRef}
          className="h-full w-full overflow-y-auto flex flex-col gap-5 p-3"
        >
          {messages.map((message) => (
            <div
              key={message._id}
              className={`flex gap-1 items-end ${
                authUser._id === message.senderId ? "flex-row-reverse" : ""
              } `}
            >
              <img
                src={
                  message.senderId === authUser._id
                    ? authUser.profilePic || "/avatar.png"
                    : selectedUser.profilePic || "/avatar.png"
                }
                alt="userPicture"
                className="min-w-10 w-10 h-10 rounded-full object-cover"
              />
              <div className="flex flex-col   ">
                <time className={`text-gray-400 `}>
                  {formatMessageTime(message.createdAt)}{" "}
                </time>
                <div>
                  {message.image && (
                    <img
                      src={message.image}
                      alt="messageImage"
                      className={`max-w-60 rounded-md ${
                        message.text && message.image ? "rounded-b-none" : ""
                      }`}
                    />
                  )}
                  {message.text && (
                    <p
                      className={`bg-gray-700 py-2 px-4 rounded-md max-w-60 break-words ${
                        message.text && message.image ? "rounded-t-none" : ""
                      }`}
                    >
                      {message.text}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* input */}
      <MessageInput />
    </div>
  );
};

export default Chatcontainer;

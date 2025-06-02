import React, { useEffect } from "react";
import { useChatstore } from "../store/useChatStore";
import SidebarSkeleton from "./SidebarSkelton";
import { Users } from "lucide-react";
import { useAuthStore } from "../store/useAuth";

const Sidebar = () => {
  const { users, getUsers, selectedUser, setSelectedUser, isUsersLoading } =
    useChatstore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) {
    return <SidebarSkeleton />;
  }

  return (
    <aside
      className="h-full w-20 lg:w-72 border-r border-base-100 
    flex flex-col transition-all duration-200 p-3 mx-auto"
    >
      {/* Header */}
      <div className="flex items-center gap-2 justify-center lg:justify-start">
        <Users className="min-w-6" />
        <p className="hidden lg:inline-block">Contacts</p>
      </div>
      <hr className="w-full m-5 mx-auto" />



      {/* Contacts List */}
      <div className="flex flex-col items-center max-lg:gap-4 overflow-y-auto h-full">
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full lg:p-3 flex items-center gap-2 ${
              selectedUser?._id === user._id
                ? "bg-base-200"
                : "hover:bg-base-200"
            } rounded-lg transition-all duration-200 cursor-pointer`}
          >
            <div className="relative">
              <img
                src={user.profilePic || "/avatar.png"}
                alt="userPicture"
                className="min-w-10 w-10 h-10 rounded-full object-cover"
              />
              {onlineUsers.includes(user._id) && (
                <span className="w-3 h-3 border-2 border-gray-900 bg-green-500 absolute bottom-0 right-0 rounded-full"></span>
              )}
            </div>
            <div className="hidden lg:inline-block">
              <p>{user.fullName}</p>
              <p className="text-sm text-gray-400 text-start">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}{" "}
              </p>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;

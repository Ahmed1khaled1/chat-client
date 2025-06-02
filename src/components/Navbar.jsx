import { LogOut, MessageSquare, User } from "lucide-react";
import { useAuthStore } from "../store/useAuth";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className=" h-12 p-2 flex items-center justify-between ">
      <Link to="/" className="flex items-center gap-2">
        <div className="bg-indigo-950 p-2 rounded-xl">
          <MessageSquare />
        </div>
        <p className="text-xl font-bold">Chat app</p>
      </Link>
      <div className="flex items-center gap-4">
        
        {authUser && (
          <>
            <Link to={"/profile"} className="bg-gray-700 hover:bg-gray-800 cursor-pointer p-2 rounded-xl flex items-center gap-2">
              <User className="text-white" />
              <p className="max-sm:hidden">Profile</p>
            </Link>
            <div
              onClick={() => logout()}
              className="bg-gray-700 hover:bg-gray-800 cursor-pointer p-2 rounded-xl flex items-center gap-2"
            >
              <LogOut className="text-white" />
              <p className="max-sm:hidden">Logout</p>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;

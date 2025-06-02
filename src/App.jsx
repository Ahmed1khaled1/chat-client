import React, { use, useEffect } from "react";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import { useAuthStore } from "./store/useAuth";
import { Loader } from "lucide-react";
import { Toaster } from "sonner";

const App = () => {
  const { authUser, checkAuth, isChickingAuth } = useAuthStore(
    (state) => state
  );

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isChickingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin text-blue-500" size={48} />
      </div>
    );
  return (
    <div className="h-[100dvh] w-full">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={authUser ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <Signup /> : <Navigate to="/" />}
        />
      </Routes>
      <Toaster position="top-center" richColors />
    </div>
  );
};

export default App;

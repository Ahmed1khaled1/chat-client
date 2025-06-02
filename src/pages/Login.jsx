import React, { useState } from "react";
import {
  MessageSquare,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  LockOpen,
  LoaderCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuth";
import AuthImagePattern from "../components/AuthImagePattern";
import { toast } from "sonner";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isSigningIn } = useAuthStore();

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!formData.password.trim()) return toast.error("Password is required");
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) login(formData);
  };

  return (
    <div className="h-[calc(100%-48px)] w-full grid gridcols-1 lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center ">
        <div className="flex flex-col items-center justify-center gap-2 ">
          <div className="bg-indigo-950 p-3 rounded-xl">
            <MessageSquare />
          </div>
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p>sign in to your account</p>
        </div>
        <div className="w-full max-w-md ">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-full mt-4 p-4"
          >
            <div className="w-full">
              <label>
                <span>Email</span>{" "}
              </label>
              <div className="flex items-center border border-gray-300 rounded-md px-2">
                <Mail />
                <input
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  type="email"
                  placeholder="you@example.com"
                  className="focus:outline-none w-full p-2"
                />
              </div>
            </div>
            <div className="w-full">
              <label>
                <span>Password</span>{" "}
              </label>
              <div className="flex items-center border border-gray-300 rounded-md px-2">
                {showPassword ? <LockOpen /> : <LockKeyhole />}
                <input
                  min={6}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  className="focus:outline-none w-full p-2"
                />
                {showPassword ? (
                  <Eye
                    className="cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <EyeOff
                    className="cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
            </div>
            <button
              type="submit"
              disabled={isSigningIn}
              className="bg-blue-700 p-2 rounded-md font-semibold hover:bg-blue-800 cursor-pointer "
            >
              {isSigningIn ? (
                <div className="flex items-center justify-center gap-2">
                  <LoaderCircle className="animate-spin" />
                  <p>Loading...</p>
                </div>
              ) : (
                "login"
              )}
            </button>
          </form>
          <p className="text-center mt-3">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-purple-800 cursor-pointer hover:underline font-semibold"
            >
              Sign up
            </Link>{" "}
          </p>
        </div>
      </div>

      <AuthImagePattern
        title="Join our community"
        subtitle="connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};

export default Login;

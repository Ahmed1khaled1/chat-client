import React, { useState } from "react";
import {
  MessageSquare,
  Mail,
  User,
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

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signUp, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!formData.password.trim()) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters long");
    return true; 
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm()
    if(success===true)signUp(formData);
  };

  return (
    <div className="h-[calc(100%-48px)] w-full grid gridcols-1 lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center ">
        <div className="flex flex-col items-center justify-center gap-2 ">
          <div className="bg-indigo-950 p-3 rounded-xl">
            <MessageSquare />
          </div>
          <h1 className="text-2xl font-bold">Create Acount</h1>
          <p>Get started with your free account</p>
        </div>
        <div className="w-full max-w-md ">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-full mt-4 p-4"
          >
            <div className="w-full">
              <label>
                <span>Full Name</span>{" "}
              </label>
              <div className="flex items-center border border-gray-300 rounded-md px-2">
                <User />
                <input
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  type="text"
                  placeholder="Enter your full name"
                  className="focus:outline-none w-full p-2"
                />
              </div>
            </div>
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
              disabled={isSigningUp}
              className="bg-blue-700 p-2 rounded-md font-semibold hover:bg-blue-800 cursor-pointer "
            >
              {isSigningUp ? (
                <div className="flex items-center justify-center gap-2">
                  <LoaderCircle className="animate-spin" />
                  <p>Loading...</p>
                </div>
              ) : (
                "Create account"
              )}
            </button>
          </form>
          <p className="text-center mt-3">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-purple-800 cursor-pointer hover:underline font-semibold"
            >
              Sign in
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

export default Signup;

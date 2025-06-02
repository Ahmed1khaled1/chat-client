import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { toast } from "sonner";

import { io } from "socket.io-client";

const BASE_URL = "https://chat-backend-beta-ten.vercel.app";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningIn: false,
  isSigningUp: false,
  isUpdatingUser: false,
  isChickingAuth: false,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check",{
        withCredentials: true,
      });
      set({ authUser: response.data });
      get().connectSocket();
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isChickingAuth: false });
    }
  },

  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post("/auth/signup", data);
      set({ authUser: response.data });
      toast.success("Sign up successful! Welcome!");
      get().connectSocket();
    } catch (error) {
      toast.error("Failed to sign up. Please try again.");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isSigningIn: true });
    try {
      const response = await axiosInstance.post("/auth/login", data);
      set({ authUser: response.data });
      toast.success("Login successful! Welcome back!");
      get().connectSocket();
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Failed to log in. Please check your credentials.");
    } finally {
      set({ isSigningIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully!");
      get().disconnectSocket();
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out. Please try again.");
    }
  },

  updateUser: async (data) => {
    set({ isUpdatingUser: true });
    try {
      const response = await axiosInstance.put("/auth/update-profile", data);
      set((state) => ({
        authUser: {
          ...state.authUser, // الاحتفاظ بالبيانات السابقة
          ...response.data, // تحديث الاسم والإيميل فقط إذا تم إرسالهما
          profilePic: state.authUser.profilePic, // الحفاظ على الصورة
        },
      }));      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Update user error:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      set({ isUpdatingUser: false });
    }
  },

  

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();
    set({ socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));

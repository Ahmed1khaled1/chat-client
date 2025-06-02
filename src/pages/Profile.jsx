import React, { useState } from "react";
import { useAuthStore } from "../store/useAuth";
import { Camera, Mail, User } from "lucide-react";
import { toast } from "sonner";
import { formatJoiningTime } from "../lib/utils";

const Profile = () => {
  const { authUser, updateUser, isUpdatingUser, updateUserInfo } =
    useAuthStore();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    profilePic: "",
  });

  const handleImageUpdate = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64Image = reader.result;
      await updateUser({ profilePic: base64Image });

      setFormData((prev) => ({ ...prev, profilePic: base64Image }));
    };
  };

  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    const { fullName, email } = formData;

    if (!fullName && !email) {
      toast.error("All fields are empty");
      return;
    }

    try {
      await updateUser({ fullName, email });
      setFormData((prev) => ({
        ...prev,
        fullName: fullName || prev.fullName,
        email: email || prev.email,
      }));
    } catch (error) {
      console.error("Error updating profile information:", error);
      toast.error("Failed to update profile information");
    }
  };

  return (
    <div className="h-[calc(100%-48px)] w-full flex flex-col justify-center items-center gap-6">
      {/* top section  */}
      <div className="flex flex-col items-center justify-center gap-4 bg-gray-900 p-5 rounded-md max-w-md w-full">
        <div className=" flex flex-col items-center justify-center gap-3">
          <h1 className="text-xl font-semibold">Profile</h1>
          <p>Your profile information</p>
          <div className="relative">
            <img
              src={authUser.profilePic || "/avatar.png"}
              alt="profilePicture"
              className="w-30 h-30 rounded-full object-cover outline-4 "
            />
            <label
              htmlFor="image"
              className="bg-gray-300 absolute bottom-0 right-0 p-2 rounded-full cursor-pointer"
            >
              <Camera className=" text-blue-800 rounded-full " />
              <input
                type="file"
                onChange={handleImageUpdate}
                accept="image/*"
                disabled={isUpdatingUser}
                hidden
                id="image"
              />
            </label>
          </div>
          <p>
            {isUpdatingUser
              ? "Uploading..."
              : "click the camera icon to update your photo"}
          </p>
        </div>

        <form
          onSubmit={handleUpdateInfo}
          className="flex flex-col gap-4 w-full"
        >
          <div className="w-full">
            <label>
              <span>FullName</span>{" "}
            </label>
            <div className="flex items-center border border-gray-300 rounded-md px-2">
              <User />
              <input
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                type="text"
                placeholder={authUser.fullName}
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
                placeholder={authUser.email}
                className="focus:outline-none w-full p-2"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-600 py-1 px-2 hover:bg-blue-700 mx-auto text-sm rounded-md cursor-pointer"
          >
            Update
          </button>
        </form>
      </div>
      {/* bottom section */}
      <div className=" bg-gray-900 p-5 rounded-md max-w-md w-full">
        <h2 className="mb-5 font-semibold text-lg">Account information</h2>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <p>Member since</p>
            <p> {formatJoiningTime(authUser.createdAt)} </p>
          </div>
          <hr />
          <div className="flex justify-between items-center">
            <p>Account status</p>
            <p className="text-green-500"> Active</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

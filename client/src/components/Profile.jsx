import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const Profile = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append("profilePic", file);
  
    console.log("Uploading File:", file.name); // Debugging log
    await updateProfile(formData);
  };
  
  

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-8">
          
          {/* Title Section */}
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-purple-700">Profile</h1>
            <p className="mt-2 text-gray-500">Your profile information</p>
          </div>

          {/* Avatar Upload Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 border-purple-600"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-purple-600 p-2 rounded-full cursor-pointer 
                transition-all duration-200 hover:scale-105 ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}
              >
                <Camera className="w-5 h-5 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-gray-500">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* User Info Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <User className="w-4 h-4 text-purple-600" />
                <span className="font-medium">Full Name</span>
              </div>
              <p className="px-4 py-2.5 bg-gray-100 rounded-lg border border-gray-300">{authUser?.fullName}</p>
            </div>

            <div className="space-y-2">
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-600" />
                <span className="font-medium">Email Address</span>
              </div>
              <p className="px-4 py-2.5 bg-gray-100 rounded-lg border border-gray-300">{authUser?.email}</p>
            </div>
          </div>

          {/* Account Information Section */}
          <div className="mt-6 bg-gray-100 rounded-xl p-6">
            <h2 className="text-lg font-medium text-purple-700 mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-gray-300">
                <span>Member Since</span>
                <span className="text-gray-700">{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-600 font-medium">Active</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Profile;

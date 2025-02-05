import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users = [], selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers = [] } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-purple-300 flex flex-col transition-all duration-200 bg-purple-100">
      {/* Header */}
      <div className="border-b border-purple-300 w-full p-5 bg-purple-600 text-white">
        <div className="flex items-center gap-2">
          <Users className="size-6 text-white" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        
        {/* Online filter toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-gray-200">({Math.max(onlineUsers.length - 1, 0)} online)</span>
        </div>
      </div>

      {/* User List */}
      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full p-3 flex items-center gap-3 hover:bg-purple-300 transition-colors 
                ${selectedUser?._id === user._id ? "bg-purple-300 ring-2 ring-purple-500" : ""}`}
            >
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.name}
                  className="size-12 object-cover rounded-full border-2 border-purple-500"
                />
                {onlineUsers.includes(user._id) && (
                  <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-white" />
                )}
              </div>

              {/* User info - only visible on larger screens */}
              <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate text-purple-900">{user.fullName}</div>
                <div className="text-sm text-gray-600">
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className="text-center text-gray-600 py-4">No users available</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;



const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-purple-100">
      <div className="max-w-md text-center space-y-6">
        

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold text-purple-900">Welcome to Chatt Page</h2>
        <p className="text-gray-700">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;

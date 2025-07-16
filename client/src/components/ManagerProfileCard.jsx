const ManagerProfileCard = () => {
  // Extract user from localStorage
  const user = JSON.parse(localStorage.getItem("user")) || {};

  return (

    <div className="bg-white shadow rounded-xl p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img
  src={user.avatar || "/avatars/userIcon.png"}
  alt="Avatar"
  className="w-14 h-14 rounded-full object-cover"
/>

        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {user.name || "Manager Name"}
          </h3>
          <p className="text-sm text-gray-500">
            Manager @ {user?.building?.name || "Your Building"}
          </p>
        </div>
      </div>
      <button className="text-blue-600 hover:underline text-sm">Edit Profile</button>
    </div>
  );
};

export default ManagerProfileCard;

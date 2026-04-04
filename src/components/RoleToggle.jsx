const RoleToggle = ({ role, setRole, dark }) => {
  return (
    <div
      className={`flex items-center p-0.5 rounded-full border text-xs ${
        dark ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-300"
      }`}
    >
      <button
        onClick={() => setRole("viewer")}
        className={`px-3 py-1 rounded-full transition ${
          role === "viewer"
            ? dark
              ? "bg-gray-900 text-blue-400 shadow"
              : "bg-white text-blue-600 shadow"
            : dark
            ? "text-gray-400"
            : "text-gray-600"
        }`}
      >
        User
      </button>

      <button
        onClick={() => setRole("admin")}
        className={`px-3 py-1 rounded-full transition ${
          role === "admin"
            ? dark
              ? "bg-gray-900 text-blue-400 shadow"
              : "bg-white text-blue-600 shadow"
            : dark
            ? "text-gray-400"
            : "text-gray-600"
        }`}
      >
        Admin
      </button>
    </div>
  );
};

export default RoleToggle;
const RoleToggle = ({ role, setRole, dark }) => {
  return (
    <div
      className={`flex items-center p-0.5 rounded-full border text-xs sm:text-sm ${
        dark ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-300"
      }`}
    >
      <button
        onClick={() => setRole("viewer")}
        className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full transition whitespace-nowrap ${
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
        className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full transition whitespace-nowrap ${
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

import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  if (!user) return null;

  return (
    <div className="border-b border-gray-800">
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold tracking-wide">
          Expense<span className="text-[#d4af37]">Tracker</span>
        </h1>

        <button
          onClick={logout}
          className="text-sm px-4 py-1.5 border border-[#d4af37] text-[#d4af37] rounded hover:bg-[#d4af37] hover:text-black transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;

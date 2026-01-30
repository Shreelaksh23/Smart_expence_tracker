import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white text-black p-8 rounded-lg"
      >
        <h2 className="text-2xl font-semibold mb-1">
          Welcome back
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Sign in to manage your expenses
        </p>

        {error && (
          <p className="text-sm text-red-500 mb-3">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:border-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-5 p-2 border border-gray-300 rounded focus:outline-none focus:border-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-black text-white py-2 rounded hover:bg-[#d4af37] hover:text-black transition">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

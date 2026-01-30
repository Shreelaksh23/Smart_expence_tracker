import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { register } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(form.name, form.email, form.password);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white text-black p-8 rounded-lg"
      >
        <h2 className="text-2xl font-semibold mb-1">
          Create account
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Start tracking your expenses
        </p>

        <input
          placeholder="Name"
          className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:border-black"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Email"
          className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:border-black"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-5 p-2 border border-gray-300 rounded focus:outline-none focus:border-black"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button className="w-full bg-black text-white py-2 rounded hover:bg-[#d4af37] hover:text-black transition">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;

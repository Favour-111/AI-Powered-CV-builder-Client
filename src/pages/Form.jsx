import { useState } from "react";
import axios from "axios";
import { FaEnvelope, FaLock, FaUserPlus } from "react-icons/fa";

export default function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
        email,
        password,
      });

      setMessage(res.data.message);
      setEmail("");
      setPassword("");
    } catch (err) {
      setMessage(err.response?.data?.error || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-purple-900">
      <form
        onSubmit={handleSignup}
        className="w-[380px] bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl"
      >
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Create Account
        </h2>

        {/* Email */}
        <div className="relative mb-4">
          <FaEnvelope className="absolute top-3 left-3 text-gray-300" />
          <input
            type="email"
            placeholder="Email"
            className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/10 text-white outline-none border border-white/20 focus:border-purple-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="relative mb-4">
          <FaLock className="absolute top-3 left-3 text-gray-300" />
          <input
            type="password"
            placeholder="Password"
            className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/10 text-white outline-none border border-white/20 focus:border-purple-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 transition py-2 rounded-lg text-white font-semibold"
        >
          <FaUserPlus />
          {loading ? "Creating..." : "Sign Up"}
        </button>

        {/* Message */}
        {message && (
          <p className="text-center text-sm mt-4 text-gray-200">{message}</p>
        )}
      </form>
    </div>
  );
}

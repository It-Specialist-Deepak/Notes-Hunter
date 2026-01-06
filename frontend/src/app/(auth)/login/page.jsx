"use client";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // cookies
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
  
      if (!res.ok) {
        setError(data.message || "Invalid credentials");
        return;
      }
            // ✅ STORE ID & ROLE (UI purpose only)
    if (data.user) {
      localStorage.setItem("userId", data.user._id);
      localStorage.setItem("role", data.user.role);
    }
     window.location.href = "/";


    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br 
      from-[#081a2d] via-[#0b3a4a] to-[#061622] px-4">

      {/* Card */}
      <div className="w-full max-w-md rounded-2xl bg-white/5 backdrop-blur-xl 
        border border-white/10 shadow-2xl p-8">

        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-white">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-300 mt-2">
          Login to access your notes
        </p>

        {/* Error */}
        {error && (
          <div className="mt-4 rounded-lg bg-red-500/10 border border-red-500/30 
            text-red-400 text-sm px-4 py-2">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">

          {/* Email */}
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <div className="relative mt-2">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-400"
                size={18}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-xl bg-transparent border border-white/20 
                pl-10 pr-4 py-3 text-white placeholder-gray-400 
                focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-300">Password</label>
            <div className="relative mt-2">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-400"
                size={18}
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full rounded-xl bg-transparent border border-white/20 
                pl-10 pr-10 py-3 text-white placeholder-gray-400 
                focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-teal-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Forgot */}
          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-sm text-teal-400 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-xl 
            bg-gradient-to-r from-teal-400 to-teal-600 
            py-3 font-semibold text-gray-900 hover:opacity-90 
            transition disabled:opacity-60"
          >
            {loading && <Loader2 className="animate-spin" size={18} />}
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-teal-400 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

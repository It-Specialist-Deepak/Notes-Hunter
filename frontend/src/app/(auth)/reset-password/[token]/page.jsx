"use client";

import { useState } from "react";
import { Lock, Eye, EyeOff, Loader2, CheckCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function ResetPassword() {
  const { token } = useParams();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Reset failed");
        return;
      }

      setSuccess(true);

      // Redirect to login after 3 seconds
      setTimeout(() => router.push("/login"), 3000);
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br 
      from-[#081a2d] via-[#0b3a4a] to-[#061622] px-4">

      <div className="w-full max-w-md rounded-2xl bg-white/5 backdrop-blur-xl 
        border border-white/10 shadow-2xl p-8">

        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-white">
          Reset Password 🔑
        </h2>
        <p className="text-center text-gray-300 mt-2">
          Create a new secure password
        </p>

        {/* Error */}
        {error && (
          <div className="mt-4 rounded-lg bg-red-500/10 border border-red-500/30 
            text-red-400 text-sm px-4 py-2">
            {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="mt-4 rounded-lg bg-green-500/10 border border-green-500/30 
            text-green-400 text-sm px-4 py-2 flex items-center gap-2">
            <CheckCircle size={18} />
            Password reset successfully. Redirecting to login...
          </div>
        )}

        {!success && (
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">

            {/* New Password */}
            <div>
              <label className="text-sm text-gray-300">New Password</label>
              <div className="relative mt-2">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-400"
                  size={18}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full rounded-xl bg-transparent border border-white/20 
                  pl-10 pr-10 py-3 text-white placeholder-gray-400 
                  focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 
                  text-gray-400 hover:text-teal-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm text-gray-300">Confirm Password</label>
              <div className="relative mt-2">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-400"
                  size={18}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full rounded-xl bg-transparent border border-white/20 
                  pl-10 pr-4 py-3 text-white placeholder-gray-400 
                  focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>
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
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Remembered your password?{" "}
          <Link href="/login" className="text-teal-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

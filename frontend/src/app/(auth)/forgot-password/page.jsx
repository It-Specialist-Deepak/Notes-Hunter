"use client";

import { useState } from "react";
import { Mail, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) {
      setError("Email is required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/forget-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        return;
      }

      setSuccess("Password reset link has been sent to your email");
      setEmail("");
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

        {/* Back */}
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm text-teal-400 hover:underline mb-4"
        >
          <ArrowLeft size={16} /> Back to Login
        </Link>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-white">
          Forgot Password 🔐
        </h2>
        <p className="text-center text-gray-300 mt-2">
          Enter your email to receive a reset link
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
            text-green-400 text-sm px-4 py-2">
            {success}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
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
            {loading ? "Sending link..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}

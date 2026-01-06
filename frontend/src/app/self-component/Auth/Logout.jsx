"use client";

import { useState } from "react";
import { LogOut, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/logout`,
        {
          method: "POST",
          credentials: "include", // 🔑 cookie removal
        }
      );

      // ✅ Clear localStorage
      localStorage.removeItem("userId");
      localStorage.removeItem("role");
      window.location.href = "/";


    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="
    relative flex items-center md: gap-2 px-5 py-2.5 rounded-2xl
    bg-gradient-to-r from-red-500 via-rose-500 to-pink-500
    text-white font-medium
    shadow-lg shadow-red-500/30
    hover:shadow-red-500/50 hover:scale-[1.03]
    active:scale-95
    transition-all duration-300 ease-out cursor-pointer
    disabled:opacity-60 disabled:cursor-not-allowed
  "
    >
      {/* glow effect */}
      <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 blur opacity-40 -z-10" />

      {loading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <LogOut size={18} />
      )}

      {loading ? "Logging out..." : "Logout"}
    </button>

  );
}

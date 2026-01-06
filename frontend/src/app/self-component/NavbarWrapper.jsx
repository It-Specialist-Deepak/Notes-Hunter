// ❌ NO "use client"

import { cookies } from "next/headers";
import NavBar from "./Navbar";

export default async function NavbarWrapper() {
  const cookieStore = await cookies(); // ✅ MUST await
  const token = cookieStore.get("token")?.value;
 
  return <NavBar isLoggedIn={Boolean(token)} />;
}

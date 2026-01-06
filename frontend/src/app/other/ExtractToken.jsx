import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

import NotePreview from "../(notes)/browse-notes/[noteId]/page";
   
export default async function MyPage() {
  const cookieStore = await cookies(); // ✅ MUST await
  const token = cookieStore.get("token")?.value;// ✅ extract value
  console.log("Token from cookies:", token);

  let userId = null;

  if (token) {
    try {
      const decoded = jwt.decode(token); // ✅ token string
      console.log("Decoded token:", decoded);

      userId = decoded?.id || decoded?.userId || null;
      console.log("User ID from token:", userId);
    } catch (err) {
      console.error("Invalid token:", err);
    }
  }

  return <NotePreview userId={userId} token={Boolean(token)} cookieStore={cookieStore} />;
}

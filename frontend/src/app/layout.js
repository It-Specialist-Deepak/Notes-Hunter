import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./self-component/Footer"; // Create Footer.jsx
import NavbarWrapper from "./self-component/NavbarWrapper";
import ReduxProvider from "./redux/store/provider";
import { Toaster } from "react-hot-toast";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Notes Hunter",
  description: "Your notes app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <>
         <ReduxProvider>
        {/* Navbar shows on every page */}
        <NavbarWrapper />

        {/* Dynamic page content */}
        <main className="flex-1">{children}
        <Toaster
  position="top-center"
  toastOptions={{
    style: {
      background: "#0f172a",
      color: "#fff",
      border: "1px solid rgba(255,255,255,0.1)",
    },
  }}
/>

        </main>

        {/* Footer shows on every page */}
        <Footer />
        </ReduxProvider>
        </>
      </body>
    </html>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { X, Menu, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useIsMobile } from "../../app/other/use-navigation-mobile";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import LogoutButton from "./Auth/Logout";
import { FaBookmark } from "react-icons/fa";
import { 
  BookOpen
} from "lucide-react";

const NavBar = ({ isLoggedIn }) => {
  const [role, setRole] = useState(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  const { notes = [], papers = [] } = useSelector((state) => state.savedItems);
  const savedCount = notes.length + papers.length;
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);
  /* ================= SCROLL EFFECT ================= */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const mobileMenuItems = [
    {
      title: "Notes",
      subItems: [
        { title: "Browse Notes / Collection", href: "/browse-notes" },
        { title: "Categories", href: "/notes-collection" },
      ],
    },
    {
      title: "Previous Papers",
      subItems: [
        { title: "Browse Papers / Categories", href: "/browse-papers" },
        { title: "Collection", href: "papers-collection" },
      ],
    },
     {
    title: "Admin",
    roles: ["admin"], // 🔒 only admin
    subItems: [
      { title: "Dashboard", href: "/admindashboard" },
      { title: "Upload Section", href: "/upload" },
    ],
  },
    { title: "Question Bank", href: "/browse-questionbank" },
    { title: "Courses", href: "/docs" },
    { title: "About Us", href: "/about" },
    { title: "Blogs", href: "/docs" },
  ];
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (title) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };
  /* ================= DESKTOP MENU ================= */
  const desktopMenu = (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Notes</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] ">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/browse-notes">
                    <div className="font-medium">Browse Notes / Collection</div>
                    <div className="text-muted-foreground" >
                      Browse notes based on your requirements
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/notes-collection">
                    <div className="font-medium">Categories</div>
                    <div className="text-muted-foreground">
                      Search notes by categories
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Previous Papers</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] ">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/browse-papers">
                    <div className="font-medium">Browse Papers</div>
                    <div className="text-muted-foreground">
                      Browse exam papers easily
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/papers-collection">
                    <div className="font-medium">Collection</div>
                    <div className="text-muted-foreground">
                      Search papers by category
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Admin Menu */}
        {role === "admin" && (
          <NavigationMenuItem>
            <NavigationMenuTrigger>Admin</NavigationMenuTrigger>

            <NavigationMenuContent>
              <ul className="grid w-[300px]">
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="/admindashboard">
                      <div className="font-medium">Admin Dashboard</div>
                      <div className="text-muted-foreground">
                        See Website Stats
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </li>

                <li>
                  <NavigationMenuLink asChild>
                    <Link href="/upload">
                      <div className="font-medium">Upload Notes/Papers</div>
                      <div className="text-muted-foreground">
                        Upload Notes and Papers
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}


        {[
          { name: "Question Banks", href: "/browse-questionbank" },
          { name: "Courses", href: "/courses" },
          { name: "About Us", href: "/about" },
          { name: "Blogs", href: "/blog" }
        ].map((item) => (
          <NavigationMenuItem key={item.name}>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href={item.href}>{item.name}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>

  );

  return (
    <>
      {/* ================= HEADER ================= */}
      <header
        className={`left-0 w-full z-50 transition-all duration-300 ease-out
    backdrop-blur-3xl backdrop-saturate-150
    ${scrolled
            ? "fixed top-0 bg-white/20 dark:bg-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.08)] border-b border-white/40"
            : "absolute top-0 bg-white/10 dark:bg-white/5 border-b border-white/30"
          }
  `}
      >

        <div className="mx-auto flex justify-between h-20 max-w-8xl items-center px-5">
          {/* LOGO */}
         <Link href="/" className="flex items-center gap-3">
  <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-teal-600 rounded-lg flex items-center justify-center shadow-md shadow-emerald-500/30">
                <BookOpen className="w-6 h-6 text-white" />
           
  </div>

  <span className="text-2xl font-bold text-teal-600 leading-none">
    NotesHunter
  </span>
</Link>


          {/* DESKTOP NAV */}
          <div className="ml-auto hidden md:flex items-center gap-5">
            {desktopMenu}
            {isLoggedIn ? (
              <div className="relative">
                <Link href="/saved-collection" className="
    w-10 h-10
    flex items-center justify-center
    rounded-full
    bg-white/10 backdrop-blur-md
    border border-white/10
    hover:bg-white/20
    transition-all duration-300 cursor-pointer
  ">
                  <FaBookmark className="text-lg text-white" />
                </Link>

                {savedCount > 0 && (
                  <span className="
      absolute -top-1 -right-1
      min-w-[18px] h-[18px]
      flex items-center justify-center
      text-[10px] font-semibold
      text-white
      bg-gradient-to-r from-red-500 to-pink-500
      rounded-full
      shadow-md
      animate-bounce
    ">
                    {savedCount}
                  </span>
                )}
              </div>
            ) : null}

            {isLoggedIn ? (
              <LogoutButton />
            ) : (
              <div className="flex gap-3">
                <Link
                  href="/login"
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-teal-400 to-teal-700 text-white font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-5 py-2 rounded-lg  bg-gradient-to-r from-teal-400 to-teal-700 text-white font-medium"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <div className="ml-auto md:hidden flex items-center gap-3">
            {isLoggedIn ? (
              <div className="relative">
                <Link href="/saved-collection" className="
    w-10 h-10
    flex items-center justify-center
    rounded-full
    bg-white/10 backdrop-blur-md
    border border-white/10
    hover:bg-white/20
    transition-all duration-300 cursor-pointer
  ">
                  <FaBookmark className="text-lg text-white" />
                </Link>

                {savedCount > 0 && (
                  <span className="
      absolute -top-1 -right-1
      min-w-[18px] h-[18px]
      flex items-center justify-center
      text-[10px] font-semibold
      text-white
      bg-gradient-to-r from-red-500 to-pink-500
      rounded-full
      shadow-md
      animate-bounce
    ">
                    {savedCount}
                  </span>
                )}
              </div>
            ) : null}
            <button
              onClick={() => setOpen(true)}
              className="ml-auto md:hidden p-2 rounded-lg bg-white/40"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* ================= MOBILE DRAWER ================= */}
      <div
        className={`fixed inset-0 z-50 ${open ? "visible opacity-100" : "invisible opacity-0"
          }`}
      >
        <div
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        <div
          className={`absolute right-0 top-0 h-full w-80 bg-gradient-to-br from-gray-900 via-gray-800/95 to-gray-900/90 backdrop-blur-2xl
          transform transition-all duration-500 ease-out shadow-2xl border-l border-teal-500/20
          ${open ? "translate-x-0" : "translate-x-full"}`}
        >
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-5 border-b border-teal-500/20 bg-gradient-to-r from-teal-900/30 via-teal-800/20 to-teal-900/30 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-400 to-teal-600 rounded-lg flex items-center justify-center shadow-lg shadow-teal-500/30">
                <span className="text-white font-bold text-sm">NH</span>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-teal-300 via-teal-400 to-teal-300 bg-clip-text text-transparent">NotesHunter</span>
            </div>
            <button 
              onClick={() => setOpen(false)}
              className="p-2 rounded-full hover:bg-teal-500/10 transition-all duration-200 group"
            >
              <X size={20} className="text-gray-400 group-hover:text-teal-400 transition-colors" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Desktop menu fallback */}
            {!isMobile && desktopMenu}

            {/* Mobile Menu */}
           {isMobile && (
  <ul className="flex flex-col gap-2">
    {mobileMenuItems
      .filter(item => !item.roles || item.roles.includes(role))
      .map((item, idx) => (
        <li key={idx}>
          {item.subItems ? (
            <div className="overflow-hidden rounded-xl">
              <div
                className="flex justify-between items-center p-4 font-medium text-gray-200 cursor-pointer
                           hover:bg-gradient-to-r hover:from-teal-500/10 hover:to-teal-600/10
                           transition-all duration-200 rounded-xl group"
                onClick={() => toggleMenu(item.title)}
              >
                <span className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"></div>
                  {item.title}
                </span>
                {openMenus[item.title] ? (
                  <ChevronUp size={16} className="text-teal-400" />
                ) : (
                  <ChevronDown size={16} className="text-gray-500 group-hover:text-teal-400 transition-colors" />
                )}
              </div>

              {openMenus[item.title] && (
                <ul className="ml-4 mt-1 space-y-1 animate-in slide-in-from-top-2 duration-200">
                  {item.subItems
                    .filter(sub => !sub.roles || sub.roles.includes(role))
                    .map((sub, i) => (
                      <li key={i}>
                        <Link
                          href={sub.href}
                          className="block py-3 px-4 text-gray-300 hover:text-teal-300
                                     hover:bg-gradient-to-r hover:from-teal-500/5 hover:to-transparent
                                     transition-all duration-200 rounded-lg"
                          onClick={() => setOpen(false)}
                        >
                          <span className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-teal-400 rounded-full"></div>
                            {sub.title}
                          </span>
                        </Link>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          ) : (
            <Link
              href={item.href}
              className="flex items-center gap-3 p-4 font-medium text-gray-200
                         hover:bg-gradient-to-r hover:from-teal-500/10 hover:to-teal-600/10
                         hover:text-teal-300 transition-all duration-200 rounded-xl group"
              onClick={() => setOpen(false)}
            >
              <div className="w-2 h-2 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"></div>
              {item.title}
            </Link>
          )}
        </li>
      ))}
  </ul>
)}


            {/* Auth */}
            <div className="pt-6 border-t border-teal-500/20 flex flex-col gap-3">
              {isLoggedIn ? (
                <div className="p-1">
                  <LogoutButton />
                </div>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    className="w-full rounded-xl bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 py-3.5 text-center text-base font-semibold text-white shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/40 hover:from-teal-600 hover:via-teal-700 hover:to-teal-800 transform hover:scale-[1.02] transition-all duration-200"
                    onClick={() => setOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    href="/register" 
                    className="w-full rounded-xl border-2 border-teal-500/50 bg-teal-500/10 py-3.5 text-center text-base font-semibold text-teal-300 hover:bg-teal-500/20 hover:border-teal-400 transform hover:scale-[1.02] transition-all duration-200"
                    onClick={() => setOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;

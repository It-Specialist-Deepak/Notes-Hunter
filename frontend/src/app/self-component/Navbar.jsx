"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { X, Menu, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
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

const NavBar = ({ isLoggedIn }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();

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
        { title: "Browse Papers / Categories", href: "/previous-papers" },
        { title: "Collection", href: "papers-collection" },
      ],
    },
    { title: "Courses", href: "/docs" },
    { title: "About Us", href: "/docs" },
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

        {["Courses", "About Us", "Blogs"].map((item) => (
          <NavigationMenuItem key={item}>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/docs">{item}</Link>
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
    ${
      scrolled
        ? "fixed top-0 bg-white/20 dark:bg-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.08)] border-b border-white/40"
        : "absolute top-0 bg-white/10 dark:bg-white/5 border-b border-white/30"
    }
  `}
>

        <div className="mx-auto flex justify-around h-20 max-w-7xl items-center px-4">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/Notes-hunter-logo.png"
              alt="Notes Hunter"
              width={44}
              height={44}
            />
            <span className="text-2xl font-bold text-teal-600">
              NotesHunter
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="ml-auto hidden md:flex items-center gap-8">
            {desktopMenu}

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
          <button
            onClick={() => setOpen(true)}
            className="ml-auto md:hidden p-2 rounded-lg bg-white/40"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* ================= MOBILE DRAWER ================= */}
      <div
        className={`fixed inset-0 z-50 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-black/40"
        />

        <div
          className={`absolute right-0 top-0 h-full w-72 bg-white backdrop-blur-xl
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex justify-between items-center px-5 py-4 border-b">
            <span className="font-bold text-teal-600">NotesHunter</span>
            <button onClick={() => setOpen(false)}>
              <X />
            </button>
          </div>

          <div className="p-5 space-y-6">
            {/* Desktop menu fallback */}
            {!isMobile && desktopMenu}

            {/* Mobile Menu */}
            {isMobile && (
              <ul className="flex flex-col gap-4">
                {mobileMenuItems.map((item, idx) => (
                  <li key={idx}>
                    {item.subItems ? (
                      <>
                        <div
                          className="flex justify-between items-center font-medium text-teal-700 cursor-pointer"
                          onClick={() => toggleMenu(item.title)}
                        >
                          {item.title}
                          {openMenus[item.title] ? (
                            <ChevronUp size={16} />
                          ) : (
                            <ChevronDown size={16} />
                          )}
                        </div>

                        {openMenus[item.title] && (
                          <ul className="ml-4 mt-2 space-y-2">
                            {item.subItems.map((sub, i) => (
                              <li key={i}>
                                <Link
                                  href={sub.href}
                                  className="text-teal-600"
                                >
                                  {sub.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className="font-medium text-teal-700"
                      >
                        {item.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            )}

            {/* Auth */}
            <div className="pt-4 border-t flex flex-col gap-2">
              {isLoggedIn ? (
                <LogoutButton />
              ) : (
                <>
                  <Link href="/login" className="w-full rounded-xl bg-gradient-to-r from-teal-400 to-teal-700 py-3 text-center text-base font-semibold text-white shadow-lg hover:opacity-90 transition ">Login</Link>
                  <Link href="/register" className="w-full rounded-xl bg-gradient-to-r from-teal-400 to-teal-700 py-3 text-center text-base font-semibold text-white shadow-lg hover:opacity-90 transition ">Register</Link>
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

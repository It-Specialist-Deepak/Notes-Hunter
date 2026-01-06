// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { useIsMobile } from "../../app/other/use-navigation-mobile";
// import {
//   NavigationMenu,
//   NavigationMenuList,
//   NavigationMenuItem,
//   NavigationMenuTrigger,
//   NavigationMenuContent,
//   NavigationMenuLink,
//   navigationMenuTriggerStyle,
// } from "@/components/ui/navigation-menu";
// import { ChevronDown, ChevronUp } from "lucide-react";
// import LogoutButton from "./Auth/Logout";

// export function NavigationMenuDemo({isLoggedIn}) {
//   const isMobile = useIsMobile();

//   // Desktop menu
//   const desktopMenu = (
//     <NavigationMenu viewport={isMobile}>
//       <NavigationMenuList className="flex-wrap">
//         <NavigationMenuItem className="hidden md:block">
//           <NavigationMenuTrigger>Notes</NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <ul className="grid w-[300px] gap-4">
//               <li>
//                 <NavigationMenuLink asChild>
//                   <Link href="/browse-notes">
//                     <div className="font-medium">Browse Notes / Collection</div>
//                     <div className="text-muted-foreground">
//                       Browse Notes Based on your Requirements
//                     </div>
//                   </Link>
//                 </NavigationMenuLink>
//                 <NavigationMenuLink asChild>
//                   <Link href="/notes-collection">
//                     <div className="font-medium">Categories</div>
//                     <div className="text-muted-foreground">
//                       Search Notes Based on Categories Available
//                     </div>
//                   </Link>
//                 </NavigationMenuLink>
//               </li>
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem>

//         <NavigationMenuItem className="hidden md:block">
//           <NavigationMenuTrigger>Previous Papers</NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <ul className="grid w-[300px] gap-4">
//               <li>
//                 <NavigationMenuLink asChild>
//                   <Link href="/browse-papers">
//                     <div className="font-medium">Browse Papers / Categories</div>
//                     <div className="text-muted-foreground">
//                       Browse Previous Exam Papers Based on your Requirements
//                     </div>
//                   </Link>
//                 </NavigationMenuLink>
//                 <NavigationMenuLink asChild>
//                   <Link href="/papers-collection">
//                     <div className="font-medium">Collection</div>
//                     <div className="text-muted-foreground">
//                       Search Exam Papers Based on Categories Available
//                     </div>
//                   </Link>
//                 </NavigationMenuLink>
//               </li>
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem>

//         <NavigationMenuItem>
//           <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
//             <Link href="/docs">Courses</Link>
//           </NavigationMenuLink>
//         </NavigationMenuItem>

//         <NavigationMenuItem>
//           <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
//             <Link href="/docs">About Us</Link>
//           </NavigationMenuLink>
//         </NavigationMenuItem>

//         <NavigationMenuItem>
//           <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
//             <Link href="/docs">Blogs</Link>
//           </NavigationMenuLink>
//         </NavigationMenuItem>
//       </NavigationMenuList>
       

//     </NavigationMenu>
  
//   );

//   // Mobile menu items
//   const mobileMenuItems = [
//     {
//       title: "Notes",
//       subItems: [
//         { title: "Browse Notes / Collection", href: "/browse-notes" },
//         { title: "Categories", href: "/notes-collection" },
//       ],
//     },
//     {
//       title: "Previous Papers",
//       subItems: [
//         { title: "Browse Papers / Categories", href: "/previous-papers" },
//         { title: "Collection", href: "papers-collection" },
//       ],
//     },
//     { title: "Courses", href: "/docs" },
//     { title: "About Us", href: "/docs" },
//     { title: "Blogs", href: "/docs" },
//   ];

//   const [openMenus, setOpenMenus] = useState({});

//   const toggleMenu = (title) => {
//     setOpenMenus((prev) => ({
//       ...prev,
//       [title]: !prev[title],
//     }));
//   };

//   return (
//     <>
//       {/* Desktop Menu */}
//       {!isMobile && desktopMenu}

//       {/* Mobile Menu */}
//       {isMobile && (
//         <div className="fixed inset-0 z-50 flex">
//           <div className="relative w-full bg-white/95 backdrop-blur-md overflow-auto px-6 py-8 flex flex-col justify-start">
//             {/* Header */}
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-700">NotesHunter</h2>
//             </div>

//             {/* Nav Items */}
//             <ul className="flex flex-col gap-4">
//               {mobileMenuItems.map((item, idx) => (
//                 <li key={idx} className="flex flex-col">
//                   {item.subItems ? (
//                     <>
//                       <div
//                         className="flex justify-between items-center font-medium text-teal-700 cursor-pointer"
//                         onClick={() => toggleMenu(item.title)}
//                       >
//                         {item.title}
//                         {openMenus[item.title] ? (
//                           <ChevronUp className="w-4 h-4 text-teal-700" />
//                         ) : (
//                           <ChevronDown className="w-4 h-4 text-teal-700" />
//                         )}
//                       </div>
//                       {openMenus[item.title] && (
//                         <ul className="ml-4 flex flex-col gap-2 mt-1">
//                           {item.subItems.map((sub, i) => (
//                             <li key={i}>
//                               <Link
//                                 href={sub.href}
//                                 className="text-teal-500 hover:text-teal-700"
//                               >
//                                 {sub.title}
//                               </Link>
//                             </li>
//                           ))}
//                         </ul>
//                       )}
//                     </>
//                   ) : (
//                     <Link
//                       href={item.href}
//                       className="font-medium text-teal-700 hover:text-teal-900"
//                     >
//                       {item.title}
//                     </Link>
//                   )}
//                 </li>
//               ))}
//             </ul>
//   {/* {isLoggedIn ? (
//     <LogoutButton />
//   ) : (
//     <>
//       <Link
//         href="/login"
//         className="w-full rounded-xl bg-gradient-to-r from-teal-400 to-teal-700 py-3 text-center text-base font-semibold text-white shadow-lg hover:opacity-90 transition mt-"
//       >
//         Login
//       </Link>

//       <Link
//         href="/register"
//         className="w-full rounded-xl border border-teal-600 py-3 text-center text-base font-semibold text-teal-700 hover:bg-teal-600 hover:text-white transition mt-2"
//       >
//         Register
//       </Link>
//     </>
//   )} */}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default NavigationMenuDemo;

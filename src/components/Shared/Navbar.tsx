"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Menu, ShoppingCart, X } from "lucide-react";
import { useUser } from "../context/UserContext";
import { logout } from "@/services/AuthService";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { motion } from "framer-motion";
import { protectedRoutes } from "../constant";
import { orderSelector } from "../redux/features/cartSlice";
import { useAppSelector } from "../redux/hooks";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, setIsLoading } = useUser();
  const order = useAppSelector(orderSelector);
  console.log("order in the payment", order);
  console.log("order in the length", order?.meals?.length);

  const handleLogOut = () => {
    logout();
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  const menuItems = [
    { name: "Home", link: "/" },
    { name: "Meals", link: "/meals" },
    { name: "Meal Providers", link: "/mealProviders" },
    { name: "Search", link: "/search" },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <Link
            href="/"
            className="text-red-400 text-2xl font-bold mr-2 md:mr-0F"
          >
            Meal<span className="text-green-400 dark:text-white">Box</span>
          </Link>

          <div className="hidden md:flex space-x-4">
            {menuItems.map(({ name, link }) => (
              <Link
                key={name}
                href={link}
                className={`text-gray-800 font-bold dark:text-gray-300 hover:text-red-500 ${
                  pathname === link ? "font-bold text-red-500" : ""
                }`}
              >
                {name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {!user || user?.role === "customer" ? (
              <Link href="/cart">
                <div
                  className="relative rounded-full size-12 flex items-center justify-center gap-1 
             text-red-500 border-2 border-red-500/50 bg-white/30 backdrop-blur-md 
             shadow-xl shadow-red-300/40 transition-all hover:scale-110 hover:bg-red-500 hover:text-white p-3"
                >
                  <ShoppingCart className="w-6 h-6" />

                  <span
                    className="absolute text-xs font-semibold text-white 
                  top-[-5px] right-[-5px] flex items-center justify-center 
                  w-6 h-6 bg-red-500 text-center rounded-full"
                  >
                    {order?.meals?.length || 0}
                  </span>
                </div>
              </Link>
            ) : null}

            {user?.email ? (
              <>
                {user?.role === "customer" && (
                  <Link
                    href="/meal-provider"
                    className="border-2 border-red-400 rounded p-3 text-red-400 md:px-2 py-2 text-xs font-medium hover:shadow-lg transition"
                  >
                    Meal Provider
                  </Link>
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>User</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href={`/${user?.role}/dashboard`}>Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer flex items-center gap-2"
                      onClick={handleLogOut}
                    >
                      <LogOut />
                      <span>Log Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link
                href="/login"
                className="border-2 border-green-400 rounded p-3 text-green-400 px-4 py-2 text-sm font-medium hover:shadow-lg transition"
              >
                Login
              </Link>
            )}

            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <X className="w-6 h-6 text-gray-700 dark:text-white" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700 dark:text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          className="absolute top-16 left-0 w-full bg-white dark:bg-gray-800 shadow-lg rounded-b-lg p-4 z-50 border-t border-gray-200 dark:border-gray-700"
        >
          <button
            className="absolute top-2 right-2 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col space-y-4 mt-6">
            {menuItems.map(({ name, link }) => (
              <Link
                key={name}
                href={link}
                className={`block px-4 py-2 rounded-lg text-gray-800 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition ${
                  pathname === link
                    ? "bg-gray-100 text-red-400 dark:bg-gray-700"
                    : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                {name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;

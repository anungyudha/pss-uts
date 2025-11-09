"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import AuthModal from "./authModal";
import { authHelpers } from "../lib/utils/auth";
import type { UserData } from "../lib/types/auth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    // Cek apakah user sudah login
    const userData = authHelpers.getUserData();
    setUser(userData);
  }, []);

  const navLinks = [
    { name: "Rooms", href: "#rooms" },
    { name: "Location", href: "#location" },
    { name: "About us", href: "#about" },
  ];

  const handleLoginClick = () => {
    setShowAuthModal(true);
    setIsOpen(false);
  };

  const handleLogout = () => {
    if (confirm("Yakin ingin logout?")) {
      authHelpers.logout();
      setUser(null);
    }
  };

  return (
    <>
      <div className="sticky top-0 left-0 right-0 z-40 px-4">
        <nav className="max-w-5xl mx-auto bg-[#97A87A] rounded-[30px] shadow-2xl">
          <div className="flex justify-between items-center h-14 px-8">
            {/* Logo */}
            <Link
              href="/"
              className="text-xl font-bold text-white hover:text-[#DAD7CD] transition duration-150"
            >
              Gsuites
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex flex-grow justify-end items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-white text-sm font-medium hover:text-[#DAD7CD] transition duration-150"
                >
                  {link.name}
                </Link>
              ))}

              {/* Tampilkan user info atau login button */}
              {user ? (
                <div className="flex items-center space-x-4 ml-8">
                  <div className="flex items-center space-x-2">
                    <img
                      src={user.image_url}
                      alt={user.username}
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                    <span className="text-white text-sm font-medium">
                      {user.username}
                    </span>
                    {user.role === "admin" && (
                      <span className="bg-yellow-400 text-xs px-2 py-1 rounded-full text-gray-800 font-semibold">
                        Admin
                      </span>
                    )}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-full hover:bg-red-600 transition duration-300"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleLoginClick}
                  className="px-6 py-2 text-sm font-medium text-gray-800 bg-[#DAD7CD] rounded-full hover:bg-white transition duration-300 transform hover:scale-[1.03] shadow-md ml-8"
                >
                  Login
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-[#DAD7CD] focus:outline-none rounded-md p-1"
              >
                <span className="sr-only">Buka menu utama</span>
                ☰
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:hidden max-w-5xl mx-auto bg-[#97A87A] rounded-b-xl shadow-xl`}
        >
          <div className="px-5 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-white hover:bg-[#85956A] block px-3 py-2 rounded-md font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile User Info / Login */}
            {user ? (
              <div className="pt-2 border-t border-white/20">
                <div className="flex items-center space-x-2 px-3 py-2">
                  <img
                    src={user.image_url}
                    alt={user.username}
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                  <div>
                    <p className="text-white text-sm font-medium">
                      {user.username}
                    </p>
                    <p className="text-white/70 text-xs">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="mt-2 block w-full text-center px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-full hover:bg-red-600 shadow-md"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={handleLoginClick}
                className="mt-2 block w-full text-center px-4 py-2 text-sm font-medium text-gray-800 bg-[#DAD7CD] rounded-full hover:bg-white shadow-md"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
  );
};

export default Navbar;
"use client"
import { faHome, faMoon, faSun, faTicket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const Nav = () => {
  const currentPath = usePathname();
  const { data: session } = useSession();

  const isActive = (href) => currentPath === href;

  const [tooltip, setTooltip] = useState(null);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const showTooltip = (content) => setTooltip(content);
  const hideTooltip = () => setTooltip(null);

  return (
    <nav className="flex flex-col dark:bg-nav bg-light-nav p-4">
      {/* Top Section: Heading, IMG Logo, and Theme Toggle */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Link href="http://img.iitr.ac.in/" target="_blank">
            <img
              src="/img-logo.png"
              alt="IMG Logo"
              className="w-8 h-8 cursor-pointer"
            />
          </Link>
          <p className="text-default-text text-lg font-bold">INFORMATION MANAGEMENT GROUP</p>
        </div>
        <button onClick={toggleTheme}>
          <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} className="icon text-white" />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/"
            onMouseEnter={() => showTooltip('Home')}
            onMouseLeave={hideTooltip}>
            <FontAwesomeIcon icon={faHome} className={`icon ${isActive("/") ? "text-white dark:text-white" : "text-gray-500 dark:text-gray-500"}`} />
          </Link>
          <Link href="/TicketPage/new"
            onMouseEnter={() => showTooltip('Create a new ticket')}
            onMouseLeave={hideTooltip}>
            <FontAwesomeIcon icon={faTicket} className={`icon ${isActive("/TicketPage/new") ? "text-white dark:text-white" : "text-gray-500 dark:text-gray-500"}`} />
          </Link>
        </div>

        {tooltip && (
          <div className="absolute bg-black text-white text-xs py-1 px-2 rounded top-12">
            {tooltip}
          </div>
        )}

        {/* User Session Section */}
        <div>
          {session ? (
            <div className="text-right">
              <p className="text-default-text">Welcome, {session.user.name}</p>
              <button
                onClick={() => signOut()}
                className="text-red-500 hover:underline"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <p className="text-default-text">INFORMATION MANAGEMENT GROUP</p>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;

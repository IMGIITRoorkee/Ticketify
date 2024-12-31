"use client"
import { faHome, faMoon, faSun, faTicket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useState, useEffect } from 'react';

const Nav = () => {
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
    <nav className="flex justify-between dark:bg-nav bg-light-nav p-4">
      <div className="flex items-center space-x-4">
        <Link href="/"
          onMouseEnter={() => showTooltip('Home')}
          onMouseLeave={hideTooltip}>
          <FontAwesomeIcon icon={faHome} className="icon text-white" />
        </Link>
        <Link href="/TicketPage/new"
          onMouseEnter={() => showTooltip('Create a new ticket')}
          onMouseLeave={hideTooltip}>
          <FontAwesomeIcon icon={faTicket} className="icon text-white" />
        </Link>
      </div>
      {tooltip && (
        <div className="absolute bg-black text-white text-xs py-1 px-2 rounded top-12">
          {tooltip}
        </div>
      )}

      <div className="flex justify-end space-x-4">
        <button onClick={toggleTheme}>
          <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} className="icon text-white" />
        </button>
        <div>
          <p className=" text-default-text">INFORMATION MANAGEMANT GROUP</p>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

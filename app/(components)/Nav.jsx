"use client"
import { faHome, faTicket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useState } from 'react';

const Nav = () => {
  const [tooltip, setTooltip] = useState(null);

  const showTooltip = (content) => setTooltip(content);
  const hideTooltip = () => setTooltip(null);
  return (
    <nav className="flex justify-between bg-nav p-4">
      <div className="flex items-center space-x-4">
        <Link href="/"
        onMouseEnter={() => showTooltip('Home')}
        onMouseLeave={hideTooltip}>
          <FontAwesomeIcon icon={faHome} className="icon" />
        </Link>
        <Link href="/TicketPage/new"
        onMouseEnter={() => showTooltip('Create a new ticket')}
        onMouseLeave={hideTooltip}>
          <FontAwesomeIcon icon={faTicket} className="icon" />
        </Link>
      </div>
      {tooltip && (
        <div className="absolute bg-black text-white text-xs py-1 px-2 rounded top-12">
          {tooltip}
        </div>
      )}
      <div>
        
        
        <p className=" text-default-text">INFORMATION MANAGEMENT GROUP</p>
      </div>
    </nav>
  );
};

export default Nav;

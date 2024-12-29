"use client"
import { faHome, faTicket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav = () => {
  const currentPath = usePathname()

  const isActive = (href) => currentPath === href;

  return (
    <nav className="flex justify-between bg-nav p-4">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <FontAwesomeIcon icon={faHome} className={`icon ${isActive("/") ? "text-white" : "text-gray-500"}`} />
        </Link>
        <Link href="/TicketPage/new">
          <FontAwesomeIcon icon={faTicket} className={`icon ${isActive("/TicketPage/new") ? "text-white" : "text-gray-500"}`} />
        </Link>
      </div>
      <div>


        <p className=" text-default-text">INFORMATION MANAGEMANT GROUP</p>
      </div>
    </nav>
  );
};

export default Nav;

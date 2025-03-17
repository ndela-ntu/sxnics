"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdOutlineCancel } from "react-icons/md";
import { IoIosMenu } from "react-icons/io";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

interface NavItem {
  name: string;
  href: string;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen && menuRef.current) {
      const height = menuRef.current.scrollHeight;
      setHeight(height);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  const navItems: NavItem[] = [
    { name: "Home", href: "/" },
    // { name: "Shop", href: "/shop" },
    { name: "Blog", href: "/blog" },
    { name: "Episodes", href: "/episodes" },
    { name: "Releases", href: "/release-radar" },
    { name: "Support Us", href: "/supporter" },
    { name: "About Us", href: "/about-us" },
    {name: 'Events', href: "/events"}
  ];

  const isActive = (href: string): boolean => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className={`py-2.5 ${montserrat.className}`}>
      <div className="flex justify-between items-center">
        <Link href="/" className="text-white text-3xl lg:text-5xl font-bold">
          SXNICS
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-white hover:text-gray-300 transition duration-300 ${
                isActive(item.href) ? "font-bold border-b-1 border-white" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <MdOutlineCancel size={24} /> : <IoIosMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        style={{ maxHeight: `${height}px` }}
        className="md:hidden overflow-hidden transition-all duration-300 ease-in-out"
      >
        <div className="py-2 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block py-1 pl-1 text-base font-medium hover:bg-gray-700 transition duration-300 ${
                isActive(item.href) ? "bg-white text-black font-bold" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "@/assets";
import { useState } from "react";
import Link from "next/link";

interface NavOption {
  label: string;
  href?: string;
  hash?: string;
}

const NAVBAR_OPTIONS: NavOption[] = [
  { label: "Home", href: "/" },
  { label: "Car Types", hash: "car-types" },
  { label: "Cities", hash: "cities" },
  { label: "About", href: "/about" },
  { label: "T&C", hash: "terms-and-condition" },
];

interface NavBarProps {
  scrolled: boolean;
}

export default function NavBar({ scrolled }: NavBarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = (option: NavOption) => {
    if (option.href) {
      router.push(option.href);
      setIsDropdownOpen(false);
      return;
    }

    const targetPath = "/";
    const targetHash = `#${option.hash}`;

    if (pathname === targetPath && option.hash) {
      const el = document.getElementById(option.hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else if (option.hash) {
      router.push(`${targetPath}${targetHash}`);
    }

    setIsDropdownOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 py-2 px-6 lg:px-8 transition-colors duration-300 ${
        scrolled ? "bg-navbar-gradient backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="md:w-11/12 xl:10/12 mx-auto flex justify-between items-center">
        <Link href="/" className="cursor-pointer">
          <Image src={Logo} alt="Logo" width={70} height={50} />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8 be-vietnam-pro">
          {NAVBAR_OPTIONS.map((option, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(option)}
              className="text-white hover:text-yellow transition-colors duration-200 text-lg"
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <button
            className="text-white focus:outline-none"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <div className="hidden lg:block">
          <a
            href="https://wa.me/923134911933?text=Hi%20there%2C%20I%27d%20like%20to%20book%20a%20ride"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow text-white px-6 xl:px-8 py-3 rounded-full poppins"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isDropdownOpen && (
        <div className="lg:hidden bg-[#1A1346] mt-4 py-2 rounded-lg be-vietnam-pro">
          {NAVBAR_OPTIONS.map((option, index) => (
            <div key={index} className="px-4 py-2">
              <button
                onClick={() => handleNavigation(option)}
                className="block text-white hover:text-[#56aeff] w-full text-left"
              >
                {option.label}
              </button>
            </div>
          ))}
          <div className="px-4 py-2 mt-2">
            <a
              href="https://wa.me/923134911933?text=Hi%20there%2C%20I%27d%20like%20to%20book%20a%20ride"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow text-white px-8 py-3 rounded-full poppins w-full block text-center"
            >
              Get in Touch
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import ProfileDropDown from "./ProfileDropDown";
import { useSelector } from "react-redux";

const links = [
  { href: "/home", label: "Home" },
  { href: "/about", label: "About" },
  // { href: "/contact", label: "Contact" },
  { href: "/pricing", label: "Pricing" },
];

function Navbar() {
  const [show, setShow] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dropdownRef = useRef(null);

  const { token } = useSelector((state) => state.auth);
  // console.log("token in navbar: " + token);
  let { userDetails } = useSelector((state) => state.auth);
  userDetails = JSON.parse(userDetails);
  // console.log("userDetails in navbar : " + userDetails);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShow(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [show]);

  function handleDropDown() {
    setShow(!show);
  }

  // console.log("userDetails?.image" + userDetails?.image);

  return (
    // <>
    //   {isClient && (
    //     <nav className="sticky top-0 bg-white h-[4rem] flex flex-row items-center justify-between shadow-md">
    //       <div className="h-[2.9rem] w-[2.9rem] rounded-full border-1 border-gray-400 shadow-sm ml-[1rem] flex items-center justify-center">
    //         <Link href="/">
    //           <img
    //             src="https://res.cloudinary.com/dvb4dvz1m/image/upload/v1730119934/logo_f10fr4.svg"
    //             alt="company logo"
    //             loading="lazy"
    //             className="h-[2.5rem] w-[2rem] rounded-full "
    //           />
    //         </Link>
    //       </div>
    //       <div className="flex flex-row space-x-4 text-md text-ellipsis">
    //         {links.map((link, id) => (
    //           <Link key={id} href={link.href}>
    //             <ul className="text-gray-600 transition duration-300 ease-in-out hover:text-teal-400">
    //               {link.label}
    //             </ul>
    //           </Link>
    //         ))}
    //       </div>
    //       {token ? (
    //         <div
    //           className="mr-5 flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse"
    //           // ref={dropdownRef}
    //         >
    //           <button className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
    //             {/* <img
    //               className="w-8 h-8 rounded-full"
    //               src={userDetails?.image}
    //               alt="userPhoto"
    //               onClick={handleDropDown}
    //             /> */}
    //             {userDetails?.image ? (
    //               <img
    //                 className="w-8 h-8 rounded-full"
    //                 src={userDetails.image}
    //                 alt="userPhoto"
    //                 onClick={handleDropDown}
    //                 loading="lazy"
    //               />
    //             ) : (
    //               <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
    //                 <img
    //                   src="./profileimageavtar.jpg"
    //                   className="w-8 h-8 rounded-full"
    //                   alt="userPhoto"
    //                   onClick={handleDropDown}
    //                   loading="lazy"
    //                 />
    //               </div>
    //             )}
    //           </button>
    //           <button
    //             className="inline-flex mr-4 items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    //             aria-label="Open main menu"
    //           >
    //             <span className="sr-only">Open main menu</span>
    //             <svg
    //               className="w-5 h-5"
    //               aria-hidden="true"
    //               xmlns="http://www.w3.org/2000/svg"
    //               fill="none"
    //               viewBox="0 0 17 14"
    //             >
    //               <path
    //                 stroke="currentColor"
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 strokeWidth="2"
    //                 d="M1 1h15M1 7h15M1 13h15"
    //               />
    //             </svg>
    //           </button>
    //         </div>
    //       ) : (
    //         <div className="flex flex-row space-x-4 mr-4">
    //           <Link href="/signup">SignUp</Link>
    //           <Link href="/login">Login</Link>
    //         </div>
    //       )}
    //       <ProfileDropDown show={show} setShow={setShow} />
    //     </nav>
    //   )}
    // </>

    <>
      {isClient && (
        <nav className="sticky top-0 bg-white h-[4rem] flex items-center justify-between shadow-md px-4">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" aria-label="Company Home">
              <img
                src="https://res.cloudinary.com/dvb4dvz1m/image/upload/v1730119934/logo_f10fr4.svg"
                alt="Company logo"
                loading="lazy"
                className="h-[2.5rem] w-[2rem] rounded-full"
              />
            </Link>
          </div>

          {/* Links Section (Visible on larger screens) */}
          <div className="hidden md:flex space-x-4 text-gray-600">
            {links.map((link, id) => (
              <Link key={id} href={link.href} className="hover:text-teal-400">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Profile Section for Larger Screens */}
          <div className="hidden md:flex items-center space-x-3">
            {token ? (
              <button
                onClick={handleDropDown}
                className="flex items-center space-x-2 text-sm"
              >
                <img
                  src={userDetails?.image || "./profileimageavtar.jpg"}
                  className="w-8 h-8 rounded-full"
                  alt="User avatar"
                  loading="lazy"
                />
              </button>
            ) : (
              <div className="flex space-x-4">
                <Link
                  href="/signup"
                  className="text-gray-800 hover:text-teal-400"
                >
                  SignUp
                </Link>
                <Link
                  href="/login"
                  className="text-gray-800 hover:text-teal-400"
                >
                  Login
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle mobile menu"
            className="p-2 w-10 h-10 text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          {/* Mobile Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute top-[4rem] left-0 w-full bg-white shadow-md p-4 md:hidden">
              {/* Mobile Links */}
              <div className="flex flex-col space-y-4 text-gray-600">
                {links.map((link, id) => (
                  <Link
                    key={id}
                    href={link.href}
                    className="hover:text-teal-400"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Profile Links */}
              <div className="mt-4 border-t pt-4 flex flex-col space-y-3">
                {token ? (
                  <button
                    onClick={handleDropDown}
                    className="flex items-center space-x-2 text-sm"
                  >
                    <img
                      src={userDetails?.image || "./profileimageavtar.jpg"}
                      className="w-8 h-8 rounded-full"
                      alt="User avatar"
                      loading="lazy"
                    />
                    <span className="text-gray-600">Profile</span>
                  </button>
                ) : (
                  // <div className="flex flex-col space-y-2">
                  //   <Link href="/signup" className="hover:text-teal-400">
                  //     SignUp
                  //   </Link>
                  //   <Link href="/login" className="hover:text-teal-400">
                  //     Login
                  //   </Link>
                  // </div>
                  <div className="flex flex-col space-y-2 text-gray-800">
                    <Link
                      href="/signup"
                      className="text-lg font-semibold text-gray-800 hover:text-teal-400 transition duration-300 ease-in-out transform hover:scale-105"
                    >
                      Sign Up
                    </Link>
                    <Link
                      href="/login"
                      className="text-lg font-semibold text-gray-800 hover:text-teal-400 transition duration-300 ease-in-out transform hover:scale-105"
                    >
                      Login
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Profile Dropdown */}
          <ProfileDropDown show={show} setShow={setShow} />
        </nav>
      )}
    </>
  );
}

export default Navbar;

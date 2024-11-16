"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { FaRegCircleUp } from "react-icons/fa6";

function Footer() {
  const [email, setEmail] = useState("");

  const [isVisible, setIsVisible] = useState(false);

  // Show button when scrolling down
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("email : " + email);
  };

  return (
    // <div>
    //   <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 p-5 m-7 space-x-10">
    //     <div className=" flex flex-col p-4 m-2">
    //       <div className="flex items-center justify-center h-[6.5rem] w-[6.5rem] rounded-full border-2 border-gray-300 bg-[rgb(255,255,255)]">
    //         <img
    //           src="https://res.cloudinary.com/dvb4dvz1m/image/upload/v1730119934/logo_f10fr4.svg"
    //           alt="logo"
    //           loading="lazy"
    //           className="bg-slate-400 h-[6rem] w-[6rem] rounded-full object-cover"
    //         />
    //       </div>
    //       <div className="text-base mt-5 text-gray-200 opacity-100">
    //         <p>
    //           {" "}
    //           Empowering candidates with AI-driven mock interviews, real-time
    //           feedback, and insights to help you succeed in any interview.
    //         </p>
    //       </div>
    //       <div className="space-y-4 flex flex-col mt-4">
    //         <h4 className="text-base font-bold text-zinc-400 mt-7">
    //           You can connect with us
    //         </h4>
    //         <div className="flex flex-row space-x-4">
    //           <div className="flex items-center justify-center border-1 border-gray-100 bg-blue-200 rounded-full h-[2.8rem] w-[2.8rem]">
    //             <Link href={""}>
    //               <FaInstagram className="h-[1.9rem] w-[1.9rem] text-gray-500 hover:text-pink-500 transform hover:scale-110 transition duration-300" />
    //             </Link>
    //           </div>
    //           <div className="flex items-center justify-center border-1 border-gray-100 bg-blue-200 rounded-full h-[2.8rem] w-[2.8rem]">
    //             <Link href={"https://www.linkedin.com/in/soumenpal01/"}>
    //               <FaLinkedin className="h-[1.9rem] w-[1.9rem] text-gray-500 hover:text-blue-600 transform hover:scale-110 transition duration-300" />
    //             </Link>
    //           </div>
    //           <div className="flex items-center justify-center border-1 border-gray-100 bg-blue-200 rounded-full h-[2.8rem] w-[2.8rem]">
    //             <Link href={""}>
    //               <FaTwitter className="h-[1.9rem] w-[1.9rem] text-gray-500 hover:text-blue-400 transform hover:scale-110 transition duration-300" />
    //             </Link>
    //           </div>
    //           <div className="flex items-center justify-center border-1 border-gray-100 bg-blue-200 rounded-full h-[2.8rem] w-[2.8rem]">
    //             <Link href={"https://github.com/soumeningit"}>
    //               <FaGithub className="h-[1.9rem] w-[1.9rem] text-gray-500 hover:text-blue-400 transform hover:scale-110 transition duration-300" />
    //             </Link>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="grid grid-cols-2 p-4 m-2">
    //       <ul className="space-y-6">
    //         <h2 className="text-white text-lg font-semibold">Help Center</h2>
    //         <li className="text-gray-300 mt-4 text-base text-pretty">
    //           <Link href="/contact">Contact Us</Link>
    //         </li>
    //         <li className="text-gray-300 mt-4 text-base text-pretty">
    //           <a href="mailto:support@mockinterview.com">Email</a>
    //         </li>
    //       </ul>
    //       <ul className="space-y-6">
    //         <h2 className="text-white text-lg font-semibold">Privacy Pilicy</h2>
    //         <li className="text-gray-300 mt-4 text-base text-pretty">
    //           <Link href="/contact">Terms & Condition</Link>
    //         </li>
    //         <li className="text-gray-300 mt-4 text-base text-pretty">
    //           <a>Privacy Policy</a>
    //         </li>
    //       </ul>
    //     </div>
    //     <div className="flex flex-col p-4 m-2">
    //       <div className="text-lg font-bold text-[rgba(255,255,255,0.86)]">
    //         <p>Subscribe our news letter to get latest update.</p>
    //       </div>
    //       <div className="flex flex-row my-4">
    //         <input
    //           type="email"
    //           name="email"
    //           value={email}
    //           placeholder="Type Your email"
    //           onChange={(e) => setEmail(e.target.value)}
    //           className="w-full rounded-tl-lg rounded-es-lg bg-gray-600 text-white outline-none border-2 border-cyan-300 p-2"
    //         />

    //         <button
    //           onClick={handleSubmit}
    //           className="px-3 py-1 rounded-tr-lg rounded-ee-lg bg-slate-600 text-gray-200 border-2 border-cyan-300"
    //         >
    //           Submit
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    //   <hr />
    //   <div className="grid grid-cols-3 p-2 ">
    //     <div className="flex flex-row">
    //       <p className="text-base text-pretty font-semibold text-white">
    //         Developed By :{" "}
    //         <Link
    //           href={"https://www.linkedin.com/in/soumenpal01/"}
    //           target="_blank"
    //         >
    //           Soumen
    //         </Link>
    //       </p>
    //     </div>
    //     <div>
    //       <span className="text-sm text-gray-100 dark:text-gray-300 sm:text-center">
    //         © 2024 <a href="">MockInterview™</a>. All Rights Reserved.
    //       </span>
    //     </div>
    //     <div className="relative mt-5">
    //       {isVisible && (
    //         <button
    //           onClick={scrollToTop}
    //           className="absolute -bottom-4 right-0 translate-y-2 mb-4 mr-4 p-2 rounded bg-blue-600 text-white transition duration-300 hover:bg-blue-700"
    //         >
    //           <FaRegCircleUp />
    //         </button>
    //       )}
    //     </div>
    //   </div>
    // </div>

    <div className="bg-gray-800 text-white">
      <div className="p-6 md:p-10 lg:p-12 space-y-8">
        {/* Logo and About Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-5">
          <div className="flex items-center justify-center h-28 w-28 rounded-full border-2 border-gray-300 bg-white mx-auto md:mx-0">
            <img
              src="https://res.cloudinary.com/dvb4dvz1m/image/upload/v1730119934/logo_f10fr4.svg"
              alt="logo"
              loading="lazy"
              className="h-24 w-24 rounded-full object-cover"
            />
          </div>
          <p className="text-gray-400 mt-5 px-4 md:px-0">
            Empowering candidates with AI-driven mock interviews, real-time
            feedback, and insights to help you succeed in any interview.
          </p>
          <div>
            <h4 className="text-base font-bold text-gray-300">
              Connect with us
            </h4>
            <div className="flex justify-center md:justify-start space-x-4 mt-3">
              <Link href="#">
                <FaInstagram className="h-7 w-7 text-gray-500 hover:text-pink-500 transition duration-300" />
              </Link>
              <Link href="https://www.linkedin.com/in/soumenpal01/">
                <FaLinkedin className="h-7 w-7 text-gray-500 hover:text-blue-600 transition duration-300" />
              </Link>
              <Link href="#">
                <FaTwitter className="h-7 w-7 text-gray-500 hover:text-blue-400 transition duration-300" />
              </Link>
              <Link href="https://github.com/soumeningit">
                <FaGithub className="h-7 w-7 text-gray-500 hover:text-blue-400 transition duration-300" />
              </Link>
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center md:text-left">
          <ul className="space-y-4">
            <h2 className="text-lg font-semibold">Help Center</h2>
            <li className="text-gray-400 hover:text-white">
              <Link href="/contact">Contact Us</Link>
            </li>
            <li className="text-gray-400 hover:text-white">
              <a href="mailto:support@mockinterview.com">Email</a>
            </li>
          </ul>
          <ul className="space-y-4">
            <h2 className="text-lg font-semibold">Privacy Policy</h2>
            <li className="text-gray-400 hover:text-white">
              <Link href="/contact">Terms & Conditions</Link>
            </li>
            <li className="text-gray-400 hover:text-white">Privacy Policy</li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div className="flex flex-col items-center space-y-4">
          <p className="text-lg font-bold text-gray-300 text-center md:text-left">
            Subscribe to our newsletter for the latest updates.
          </p>
          <div className="flex flex-col md:flex-row w-full md:w-auto">
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Your email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full md:w-auto rounded-tl-lg rounded-bl-lg bg-gray-700 text-white p-2 outline-none border-2 border-teal-500"
            />
            <button
              onClick={handleSubmit}
              className="mt-2 md:mt-0 md:ml-2 px-4 py-2 rounded-lg bg-teal-500 text-white hover:bg-teal-600 transition"
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      <hr className="border-gray-700 my-6" />

      {/* Footer Bottom Section */}
      <div className="flex flex-col items-center lg:flex-row lg:justify-between p-4 text-center lg:text-left space-y-4 lg:space-y-0">
        <p className="text-sm text-gray-500">
          Developed By:{" "}
          <Link
            href="https://www.linkedin.com/in/soumenpal01/"
            className="hover:text-teal-400"
          >
            Soumen
          </Link>
        </p>
        <p className="text-sm text-gray-500">
          © 2024{" "}
          <a href="#" className="hover:text-teal-400">
            MockInterview™
          </a>
          . All Rights Reserved.
        </p>
        {isVisible && (
          <button
            onClick={scrollToTop}
            className="p-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
          >
            <FaRegCircleUp />
          </button>
        )}
      </div>
    </div>
  );
}

export default Footer;

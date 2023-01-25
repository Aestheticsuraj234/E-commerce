import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import Link from "next/link";

function Footer() {
  return (
    <>
      <div className="bg-gray-50 h-1/2 w-full flex md:flex-row flex-col justify-around items-start p-20">
        <div className="p-5 ">
          <ul>
            <p className="text-gray-800 font-bold text-3xl pb-6">
              Roll<span className="text-indigo-400">end</span>
            </p>
            <div className="flex gap-6 pb-5">
              <Link href="#">
                <FaInstagram className="text-2xl cursor-pointer hover:text-yellow-600" />
              </Link>
              <Link href="#">
                <FaTwitter className="text-2xl cursor-pointer hover:text-blue-600" />
              </Link>
              <Link href="#">
                <FaLinkedin className="text-2xl cursor-pointer hover:text-blue-600" />
              </Link>
              <Link href="#">
                <FaYoutube className="text-2xl cursor-pointer hover:text-red-600" />
              </Link>
            </div>
          </ul>
        </div>
        <div className="p-5">
          <ul>
            <p className="text-gray-800 font-bold text-2xl pb-4">Product</p>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-indigo-300 cursor-pointer">
              All
            </li>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-indigo-300 cursor-pointer">
              Beauty
            </li>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-indigo-300 cursor-pointer">
              Electronic & Mobile
            </li>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-indigo-300 cursor-pointer">
              Gems
            </li>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-indigo-300 cursor-pointer">
              Health
            </li>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-indigo-300 cursor-pointer">
              Clothes
            </li>
          </ul>
        </div>
        <div className="p-5">
          <ul>
            <p className="text-gray-800 font-bold text-2xl pb-4">Company</p>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-indigo-300 cursor-pointer">
              About
            </li>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-indigo-300 cursor-pointer">
              Products
            </li>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-indigo-300 cursor-pointer">
              Pricing
            </li>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-indigo-300 cursor-pointer">
              Careers
            </li>
          </ul>
        </div>
        <div className="p-5">
          <ul>
            <p className="text-gray-800 font-bold text-2xl pb-4">Support</p>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-indigo-300 cursor-pointer">
              Contact
            </li>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-indigo-300 cursor-pointer">
              Customer Support
            </li>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-indigo-300 cursor-pointer">
              Become a Seller
            </li>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-indigo-300 cursor-pointer">
              Affilate Program
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center text-center  p-5 bg-gray-50">
        <h1 className=" text-gray-800 font-semibold">
          © 2023-2024 All rights reserved | Build with ❤ by{" "}
          <span className="hover:text-indigo-300 font-semibold cursor-pointer">
            Rollend{" "}
          </span>
        </h1>
      </div>
    </>
  );
}

export default Footer;

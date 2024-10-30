// components/Footer.js

import Image from 'next/image';
import React from 'react';
import logo from "/public/images/Nimbooo_Lime.png";

const Footer = () => {
  return (
    <footer className= " bg-slate-200 dark:bg-gray-900  text-secondary-foreground py-10  text-xl">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-gray-700 pb-8">
          
          {/* Column 1: Links */}
          <div className="flex flex-col md:flex-row md:space-x-8 border-r border-gray-700">
            <div>
              <h3 className="font-semibold mb-4">Explore</h3>
              <ul className="space-y-2">
                <li>About Us</li>
                <li>Pivacy policy</li>
                <li>Blog</li>
              </ul>
            </div>
            <div className="mt-6 md:mt-0">
              <ul className="space-y-2">
                <li>Contact</li>
                <li>Features</li>
              </ul>
            </div>
          </div>
          
          {/* Column 2: Logo and Description */}
          <div className="flex flex-col items-center text-center border-r border-gray-700">
            <p className="mb-4">Dive into a world of endless creative possibilities. Join with us, and earn more.</p>
            <Image
              src={logo}
              alt="NFTG Logo"
              width={80}
              height={80}
              className="w-16 h-16 m-4"
            />
            <h1 className="text-primary text-2xl mt-2">Nimboo</h1>
            <p className="mt-2 text-gray-400">Level up your creative experience with us!</p>
          </div>
          
          {/* Column 3: Contact Info and Social Media */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <p className="mb-1">Valentine, Street Road 27, New York, USA - 752252</p>
            <p className="mb-1">(629) 555-0129</p>
            <p>example@gmail.com</p>
            <h4 className="mt-6 font-semibold">Follow Us:</h4>
            <div className="flex justify-center md:justify-start space-x-4 mt-3">
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-twitch"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-sm">&copy; {new Date().getFullYear()} NFTG. Designed by PIXELAXIS</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-400">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

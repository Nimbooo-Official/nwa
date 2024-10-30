'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCopy } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faWhatsapp, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';

interface SharePageProps {
  shareUrl: string;
}

const SharePage: React.FC<SharePageProps> = ({ shareUrl }) => {
  const [isShareModalOpen, setShareModalOpen] = useState(false);

  // Function to handle modal opening
  const openShareModal = () => {
    setShareModalOpen(true);
  };

  // Function to handle modal closing
  const closeShareModal = () => {
    setShareModalOpen(false);
  };

  // Function to copy the link to the clipboard
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="flex justify-center items-center ">
      {/* Share Page Button */}
      <button 
        className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:from-indigo-600 hover:to-purple-500 transition duration-300 ease-in-out"
        onClick={openShareModal}
      >
        Share Page
      </button>

      {/* Modal Logic */}
      {isShareModalOpen && (
        <div className="fixed inset-0 bg-opacity-60 flex justify-center items-center">
          <div className="relative bg-white p-8 rounded-xl w-full max-w-md shadow-2xl">
            
            {/* Close Icon */}
            <button 
              onClick={closeShareModal} 
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition duration-200"
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>

            {/* Modal Title */}
            <h2 className="text-xl font-semibold mb-6 text-center">Share This Page</h2>

            {/* Share URL Box with Copy Icon */}
            <div className="flex items-center border border-gray-300 p-3 rounded-lg mb-4 relative">
              <span className="truncate text-black w-full">http://localhost:3000/{shareUrl}</span>
              <button 
                onClick={handleCopyLink} 
                className="absolute right-3 text-gray-500 hover:text-gray-800 transition duration-200"
              >
                <FontAwesomeIcon icon={faCopy} />
              </button>
            </div>

            {/* Impactful Message */}
            <p className="text-center text-lg font-semibold text-gray-700 mb-6">
              Support the creator by sharing this page or tipping them to help keep their work going!
            </p>

            {/* Social Media Links */}
            <div className="flex space-x-4 justify-center mt-4">
              {/* WhatsApp */}
              <a 
                href={`https://wa.me/?text=${shareUrl}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition duration-200"
              >
                <FontAwesomeIcon icon={faWhatsapp} size="lg" />
              </a>

              {/* Facebook */}
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-blue-700 text-white p-3 rounded-full shadow-lg hover:bg-blue-800 transition duration-200"
              >
                <FontAwesomeIcon icon={faFacebook} size="lg" />
              </a>

              {/* Twitter */}
              <a 
                href={`https://twitter.com/intent/tweet?url=${shareUrl}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition duration-200"
              >
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </a>

              {/* LinkedIn */}
              <a 
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-blue-800 text-white p-3 rounded-full shadow-lg hover:bg-blue-900 transition duration-200"
              >
                <FontAwesomeIcon icon={faLinkedin} size="lg" />
              </a>

              {/* Instagram */}
              <a 
                href={`https://www.instagram.com/`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white p-3 rounded-full shadow-lg hover:from-yellow-500 hover:to-pink-500 transition duration-200"
              >
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SharePage;

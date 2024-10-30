'use client';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars, faXmark, faHome, faFileAlt, faUserFriends,
  faBullseye, faHeart, faLock, faShop, faPenNib,
  faChevronDown, faChevronUp, faImage, faPlug,
  faMoneyBill, faCog,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link'; // Import Next.js Link

interface NavigationProps {
  username: string;
}

const Navigation: React.FC<NavigationProps> = ({ username }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPublishOpen, setIsPublishOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-4">
        {isOpen ? (
          <FontAwesomeIcon icon={faXmark} className="w-6 h-6" />
        ) : (
          <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
        )}
      </button>

      {/* Sidebar Navigation */}
      <div
        className={`fixed md:relative top-0 left-0 h-full w-64 bg-background dark:bg-gray-900  shadow-lg p-5 z-50 transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
        <nav>
          <ul>
            {/* Home */}
            <li className="mb-4">
              <Link href={`/${username}/dashboard `}className="flex items-center space-x-3 text-secondary-foreground">
                <FontAwesomeIcon icon={faHome} className="w-5 h-5" />
                <span>Home</span>
              </Link>
            </li>
            {/* View Page */}
            <li className="mb-4">
              <Link href={`/${username}`} className="flex items-center space-x-3 text-secondary-foreground">
                <FontAwesomeIcon icon={faFileAlt} className="w-5 h-5" />
                <span>View Page</span>
              </Link>
            </li>
            {/* Explore Creators */}
            <li className="mb-4">
              <Link href="#" className="flex items-center space-x-3 text-secondary-foreground">
                <FontAwesomeIcon icon={faUserFriends} className="w-5 h-5" />
                <span>Explore Creators</span>
              </Link>
            </li>
            {/* Goals */}
            <li className="mb-4">
              <Link href="#" className="flex items-center space-x-3 text-secondary-foreground">
                <FontAwesomeIcon icon={faBullseye} className="w-5 h-5" />
                <span>Goals <span className="text-yellow-500">New</span></span>
              </Link>
            </li>
            {/* Monetize Section */}
            <li className="text-lg font-semibold mb-4">Monetize</li>
            <li className="mb-4">
              <Link href="#" className="flex items-center space-x-3 text-secondary-foreground">
                <FontAwesomeIcon icon={faHeart} className="w-5 h-5" />
                <span>Supporters</span>
              </Link>
            </li>
            <li className="mb-4">
              <Link href="#" className="flex items-center space-x-3 text-secondary-foreground">
                <FontAwesomeIcon icon={faLock} className="w-5 h-5" />
                <span>Memberships</span>
              </Link>
            </li>
            <li className="mb-4">
              <Link href="#" className="flex items-center space-x-3 text-secondary-foreground">
                <FontAwesomeIcon icon={faShop} className="w-5 h-5" />
                <span>Shop</span>
              </Link>
            </li>
            {/* Publish Dropdown */}
            <li className="mb-4">
              <button
                onClick={() => setIsPublishOpen(!isPublishOpen)}
                className="flex items-center space-x-3 text-secondary-foreground w-full text-left"
              >
                <FontAwesomeIcon icon={faPenNib} className="w-5 h-5" />
                <span>Publish</span>
                <FontAwesomeIcon icon={isPublishOpen ? faChevronUp : faChevronDown} className="ml-auto" />
              </button>
              {isPublishOpen && (
                <ul className="ml-6 mt-3">
                  <li className="mb-3">
                    <Link href="#" className="text-secondary-foreground">Sub-item 1</Link>
                  </li>
                  <li className="mb-3">
                    <Link href="#" className="text-secondary-foreground">Sub-item 2</Link>
                  </li>
                </ul>
              )}
            </li>
            {/* Settings Section */}
            <li className="text-lg font-semibold mb-4">Settings</li>
            <li className="mb-4">
              <Link href="#" className="flex items-center space-x-3 text-secondary-foreground">
                <FontAwesomeIcon icon={faImage} className="w-5 h-5" />
                <span>Buttons & Graphics</span>
              </Link>
            </li>
            <li className="mb-4">
              <Link href="#" className="flex items-center space-x-3 text-secondary-foreground">
                <FontAwesomeIcon icon={faPlug} className="w-5 h-5" />
                <span>Integrations</span>
              </Link>
            </li>
            <li className="mb-4">
              <Link href="#" className="flex items-center space-x-3 text-secondary-foreground">
                <FontAwesomeIcon icon={faMoneyBill} className="w-5 h-5" />
                <span>Payouts</span>
              </Link>
            </li>
            <li className="mb-4">
              <Link href="#" className="flex items-center space-x-3 text-secondary-foreground">
                <FontAwesomeIcon icon={faCog} className="w-5 h-5" />
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay Background for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navigation;

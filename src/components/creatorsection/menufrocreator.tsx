'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faCog,
  faBell,
  faSignOutAlt, // Logout icon
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

interface Preferences {
  email: boolean;
  sms: boolean;
  whatsapp: boolean;
  push: boolean;
}

interface MenuForCreatorProps {
  userId: string; // Add userId prop
}

const MenuForCreator: React.FC<MenuForCreatorProps> = ({ userId }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [preferences, setPreferences] = useState<Preferences>({
    email: false,
    sms: false,
    whatsapp: false,
    push: false,
  });
  const [loading, setLoading] = useState<boolean>(true);

  // Toggle profile menu
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // Toggle notification dropdown
  const toggleNotificationDropdown = () => {
    setShowNotificationDropdown(!showNotificationDropdown);
  };

  // Fetch preferences when component mounts or userId changes
  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const { data } = await axios.get(`/api/cretor/notification/getPreferences?userId=${userId}`);
        setPreferences(data.preferences);
      } catch (error) {
        console.error('Error fetching preferences:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchPreferences();
    }
  }, [userId]);

  // Handle preference toggle
  const handleToggle = async (type: keyof Preferences, value: boolean) => {
    const updatedPreferences = { ...preferences, [type]: value };
    setPreferences(updatedPreferences);

    try {
      await axios.put('/api/creator/notification/updatePreferences', {
        userId, // Use the userId from props
        preferences: updatedPreferences,
      });
    } catch (error) {
      console.error('Error updating preferences:', error);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      localStorage.removeItem('authToken')
      const response = await fetch('/api/auth/logout', { method: 'POST' });
      if (response.ok) {
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="relative">
      {/* Profile menu button */}
      <button onClick={toggleMenu} className="p-2 rounded-full hover:bg-gray-200">
        <FontAwesomeIcon icon={faBars} className="w-8 h-8 rounded-full" />
      </button>

      {/* Dropdown menu */}
      {showMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2">
          <Link href="/settings">
            <div className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              <FontAwesomeIcon icon={faCog} /> <span>Settings</span>
            </div>
          </Link>
          <Link href={`/creator/${userId}`}>
            <div className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              <FontAwesomeIcon icon={faCog} /> <span>editeprofile</span>
            </div>
          </Link>

          {/* Notification Dropdown */}
          <div>
            <button
              onClick={toggleNotificationDropdown}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              <FontAwesomeIcon icon={faBell} /> <span>Manage Notification</span>
            </button>

            {showNotificationDropdown && (
              <div className="bg-white shadow-lg rounded-lg mt-2 p-4">
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  <>
                    <div className="mb-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={preferences.email}
                          onChange={() => handleToggle('email', !preferences.email)}
                          className="mr-2"
                        />
                        Email Notifications
                      </label>
                    </div>

                    <div className="mb-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={preferences.sms}
                          onChange={() => handleToggle('sms', !preferences.sms)}
                          className="mr-2"
                        />
                        SMS Notifications
                      </label>
                    </div>

                    <div className="mb-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={preferences.whatsapp}
                          onChange={() => handleToggle('whatsapp', !preferences.whatsapp)}
                          className="mr-2"
                        />
                        WhatsApp Notifications
                      </label>
                    </div>

                    <div className="mb-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={preferences.push}
                          onChange={() => handleToggle('push', !preferences.push)}
                          className="mr-2"
                        />
                        Push Notifications
                      </label>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={faSignOutAlt} /> <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuForCreator;

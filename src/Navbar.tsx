import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import logo from './assets/logo.gif';  // Update the path accordingly
import user1 from './assets/user.png'; // Update the path accordingly
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase"; // Adjust this import path as necessary

interface NavbarProps {
  handleLogoClick: () => void;
  handleLogout: () => void;
}

const uid = localStorage.getItem('uid');



const Navbar: React.FC<NavbarProps> = ({ handleLogoClick, handleLogout }) => {
  const [email, setEmail] = useState('Loading email...'); // Initial state

  useEffect(() => {
    const getEmail = async () => {
      if (uid) {
        const userRef = doc(db, "users", uid);
        try {
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            setEmail(docSnap.data().email); // Update state with the email
          } else {
            setEmail('No email found');
          }
        } catch (error) {
          console.error("Error getting document:", error);
          setEmail('Error getting email');
        }
      } else {
        console.log("UID is null. User might not be signed in.");
        setEmail('Error getting email');
      }
    };

    getEmail();
  }, [uid]); // Depend on uid so this runs again if uid changes
  return (
    <nav className="flex justify-between items-center p-4">
      <img
        src={logo}
        alt="Description of the image"
        width="150"
        onClick={handleLogoClick}
      />
      <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse hidden sm:block">
        <button
          type="button"
          className="flex text-sm bg-gray-800 border border-white rounded-full md:me-0 focus:ring-10 "
          id="user-menu-button"
          aria-expanded="false"
          data-dropdown-toggle="user-dropdown"
          data-dropdown-placement="bottom"
        >
          <span className="sr-only">Open user menu</span>
          <img className="w-8 h-8 rounded-full" src={user1} alt="user" />
        </button>

        {/* Dropdown menu */}
        <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
          <div className="px-4 py-3">
            <span className="block text-sm text-gray-900 dark:text-white">{email}</span>

          </div>
          <ul className="py-2" aria-labelledby="user-menu-button">
            <li>
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</button>
            </li>
          </ul>
        </div>
      </div>
      <div className="sm:hidden">
        <button onClick={handleLogout} className="text-red-500">
          <FontAwesomeIcon icon={faSignOutAlt} className="w-16 h-8" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

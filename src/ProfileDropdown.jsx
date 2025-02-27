import React, { useState } from "react";
import useravatar from "./useravatar.png";
import "./assets/styles.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export function ProfileDropdown({ username }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        console.log("User successfully logged out");
        navigate("/"); // Redirect to login page
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleOrdersClick = () => {
    navigate("/orders"); // Navigate to the orders route
  };

  const handleProfileClick = () => {
    navigate(`/profile?username=${username}`); // Navigate to the profile route with the username as a query param
  };

  return (
    <div className="profile-dropdown">
      <button className="profile-button" onClick={toggleDropdown}>
        <img
          src={useravatar}
          alt="User Avatar"
          className="user-avatar"
          onError={(e) => {
            e.target.src = "fallback-logo.png";
          }}
        />
        <span className="username">{username || "Guest"}</span>
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <a onClick={handleProfileClick}>Profile</a> {/* Navigate to profile */}
          <a onClick={handleOrdersClick}>Orders</a>
          <button className="profile-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

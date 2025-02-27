import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from './Header';  // ✅ Import Header
import { Footer } from './Footer';  // ✅ Import Footer
import "./ProfilePage.css";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [cartItems, setCartItems] = useState([]); // State to store cart items
  const [cartCount, setCartCount] = useState(0); // State to store cart count
  const [loading, setLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(true); // State for cart loading
  const [cartError, setCartError] = useState(false); // State for cart fetch error
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const username = params.get("username");

  useEffect(() => {
    if (username) {
      fetchProfile();
      fetchCartItems(); // Fetch cart items when username is available
      fetchCartCount(); // Fetch cart count when username is available
    }
  }, [username]);

  const fetchProfile = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/userprofile/profile?username=${username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error("Failed to fetch profile");

      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCartItems = async () => {
    setCartLoading(true); // Set loading state for cart
    try {
      const response = await fetch(
        `http://localhost:8081/api/cart/items?username=${username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error("Failed to fetch cart items");

      const data = await response.json();
      setCartItems(data.cartItems || []); // Assuming the response contains cartItems
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setCartError(true); // Set error state
    } finally {
      setCartLoading(false); // Remove loading state for cart
    }
  };

  const fetchCartCount = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/cart/items/count?username=${username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const count = await response.json();
      setCartCount(count);
      setCartError(false); // Reset error state if successful
    } catch (error) {
      console.error("Error fetching cart count:", error);
      setCartError(true); // Set error state
    }
  };

  if (loading) {
    return <div className="profile-loading">Loading profile...</div>;
  }

  return (
    <div className="profile-page">
      {/* Pass dynamic cartCount to Header */}
      <Header cartCount={cartLoading ? '...' : cartError ? 'Error' : cartCount} username={username} /> 

      <div className="profile-container">
        <div className="profile-card">
          <h2 className="profile-title">User Profile Details</h2>
          <div className="profile-info">
            <p><strong>User ID:</strong> {profile.userId}</p>
            <p><strong>Username:</strong> {profile.username}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Role:</strong> {profile.role}</p>
          </div>

          {/* Return to Customer Home Button */}
          <button className="return-button" onClick={() => navigate("/customerhome")}>
            Continue Shopping
          </button>
        </div>
      </div>

      {/* Add Footer here */}
      <Footer />
    </div>
  );
};

export default ProfilePage;

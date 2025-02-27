
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegistrationPage from './RegistrationPage';
import CustomerHomePage from './CustomerHomePage'; // Import the CustomerHome component
import ForgotPasswordPage from './ForgotPasswordPage'; // Import the ForgotPasswordPage component
import ResetPasswordPage from './ResetPasswordPage'; // Import ResetPasswordPage component
import VerifyOTPPage from './VerifyOTPPage'; // Import VerifyOTPPage component
import CartPage from "./CartPage";
import OrderPage from "./OrderPage";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import ProfilePage from './ProfilePage';
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/customerhome" element={<CustomerHomePage />} /> {/* Customer route */}
            <Route path="/forgot-password" element={<ForgotPasswordPage />} /> {/* Forgot Password route */}
            <Route path="/verifyotp" element={<VerifyOTPPage />} /> {/* Verify OTP route */}
            <Route path="/resetpassword" element={<ResetPasswordPage />} /> {/* Reset Password route */}
            <Route path="/cart" element={<CartPage />} />
            <Route path="/orders" element={<OrderPage />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admindashboard" element={<AdminDashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
            {/* Add more routes as needed */}
        </Routes>
    );
};

export default AppRoutes;

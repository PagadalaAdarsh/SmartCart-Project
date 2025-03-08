
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './assets/styles.css';

export default function VerifyOTPPage() {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email;

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await fetch('http://localhost:8081/api/auth/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp }),
            });

            if (response.ok) {
                navigate('/resetpassword', { state: { email } });
            } else {
                throw new Error('Invalid OTP. Please try again.');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="page-container">
            <div className="form-container">
                <h1 className="form-title">Verify OTP</h1>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleVerifyOTP} className="form-content">
                    <div className="form-group">
                        <label htmlFor="otp" className="form-label">OTP</label>
                        <input
                            id="otp"
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>
                    <button type="submit" className="form-button">Verify</button>
                </form>
            </div>
        </div>
    );
}

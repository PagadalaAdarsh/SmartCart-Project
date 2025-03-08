import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './assets/styles.css';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setError(null);  // Reset error before the request

        try {
            // Sending a POST request to the backend
            const response = await fetch('http://localhost:8081/api/auth/send-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }), // Send the email in the request body
            });

            // Check if the response is in JSON format or plain text
            let data;
            if (response.headers.get('content-type').includes('application/json')) {
                data = await response.json(); // If the response is JSON, parse it
            } else {
                data = { message: await response.text() }; // If the response is plain text, parse it
            }

            if (response.ok) {
                setMessage(data.message || 'OTP sent to your email!');
                navigate('/verifyotp', { state: { email } });  // Redirect to verify OTP page
            } else {
                throw new Error(data.error || 'Failed to send OTP');
            }
        } catch (err) {
            setError(err.message);  // Set error message in the UI
        }
    };

    return (
        <div className="page-container">
            <div className="form-container">
                <h1 className="form-title">Forgot Password</h1>
                
                {message && <p className="success-message">{message}</p>}  {/* Show success message */}
                {error && <p className="error-message">{error}</p>}  {/* Show error message */}

                <form onSubmit={handleSendOTP} className="form-content">
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>
                    <button type="submit" className="form-button">Send OTP</button>
                </form>
            </div>
        </div>
    );
}

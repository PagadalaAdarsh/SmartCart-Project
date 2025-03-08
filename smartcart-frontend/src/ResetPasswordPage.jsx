import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './assets/styles.css';

export default function ResetPasswordPage() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const location = useLocation();
    const email = location.state?.email;
    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError(null);

        if (newPassword !== confirmPassword) {
            setError("Passwords don't match!");
            return;
        }

        try {
            const response = await fetch('http://localhost:8081/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, newPassword }),
            });

            if (response.ok) {
                navigate('/', { state: { message: 'Password reset successful! Please login.' } });
            } else {
                throw new Error('Failed to reset password');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="page-container">
            <div className="form-container">
                <h1 className="form-title">Reset Password</h1>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleResetPassword} className="form-content">
                    <div className="form-group">
                        <label htmlFor="newPassword" className="form-label">New Password</label>
                        <input
                            id="newPassword"
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>
                    <button type="submit" className="form-button">Reset Password</button>
                </form>
            </div>
        </div>
    );
}


import React from 'react';
import { CartIcon } from './CartIcon';
import { ProfileDropdown } from './ProfileDropdown';
import './assets/styles.css';
import Logo from './Logo';

export function Header({ cartCount, username }) {
  return (
    <header className="header">
      <div className="header-content">
        <Logo />
        <div className="header-actions">
          <CartIcon count={cartCount} />   {/* Display current cart count */}
          <ProfileDropdown username={username} />  {/* Display logged-in user's username */}
        </div>
      </div>
    </header>
  );
}
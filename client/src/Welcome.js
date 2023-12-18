import React from 'react';

const WelcomeText = ({ username }) => {
  return (
    <div>
      <h1>Welcome to Our Website</h1>
      {username && <p>Hello, {username}! Thanks for visiting.</p>}
      <p>We are excited to have you here. Explore and enjoy our content.</p>
    </div>
  );
};

export default WelcomeText;

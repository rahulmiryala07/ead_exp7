import React, { useState } from 'react';
import './PasswordStrengthChecker.css';

const PasswordStrengthChecker = () => {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(0);

  const evaluatePasswordStrength = (pwd) => {
    let strengthScore = 0;

    if (pwd.length >= 6) strengthScore += 1; // Check for length
    if (/[A-Z]/.test(pwd)) strengthScore += 1; // Check for uppercase letters
    if (/[a-z]/.test(pwd)) strengthScore += 1; // Check for lowercase letters
    if (/[0-9]/.test(pwd)) strengthScore += 1; // Check for numbers
    if (/[^A-Za-z0-9]/.test(pwd)) strengthScore += 1; // Check for special characters

    setStrength(strengthScore);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    evaluatePasswordStrength(newPassword);
  };

  const getStrengthText = () => {
    const strengthLevels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
    return strengthLevels[strength];
  };

  return (
    <div className="container">
      <h1>Password Strength Checker</h1>
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="Enter your password"
      />
      <div className="strength-indicator">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className={`strength-bar ${
              index < strength
                ? strength >= 4
                  ? 'very-strong'
                  : strength >= 3
                  ? 'strong'
                  : 'active'
                : ''
            }`}
          ></div>
        ))}
      </div>
      <div className="strength-text">{password && getStrengthText()}</div>
    </div>
  );
};

export default PasswordStrengthChecker;

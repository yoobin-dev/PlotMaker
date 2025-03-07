import React from "react";

const LoginButton = ({ title, onClick, disabled }) => {
  return (
    <button id="loginButton" onClick={onClick} disabled={disabled}>
      <img src="/email.png" width="32" height={31} />
      <div className="headline_1 ft_white">{title}</div>
    </button>
  );
};

export default LoginButton;

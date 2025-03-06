import React from "react";

const LoginButton = ({title, onClick, disabled}) => {

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ backgroundColor: disabled? 'red' : 'green'}}
    >
      <div className="headline_1 ft_white">
        {title}
      </div>
    </button>
  )
  
}

export default LoginButton;
import React from "react";

const LoginButton = ({onClick, disabled}) => {

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ backgroundColor: disabled? 'red' : 'green'}}
    >
      <div className="headline_1 ft_white">
        이메일로 로그인
      </div>
    </button>
  )
  
}

export default LoginButton;
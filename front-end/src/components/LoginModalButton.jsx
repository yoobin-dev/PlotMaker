import React from "react";

const LoginModalButton = ({onClick}) => {

  return (
    <div onClick={onClick}>
      <div className="headline_1 ft_white">
        이메일로 이용하기
      </div>
    </div>
  )
  
}

export default LoginModalButton;
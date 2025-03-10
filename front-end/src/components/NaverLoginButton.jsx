import React from "react";
import { v4 as uuidv4 } from "uuid";

const NaverLoginButton = () => {
  const client_id = import.meta.env.VITE_NAVER_CLIENT_ID;
  const redirect_uri = encodeURIComponent(
    import.meta.env.VITE_NAVER_REDIRECT_URI
  );
  const state = uuidv4();

  const handleLogin = () => {
    sessionStorage.setItem("naver_state", state);
    const naver_login_url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}`;
    console.log(naver_login_url);
    //window.location.href = naver_login_url;
  }

  return (
    <div id="naverLogin" onClick={handleLogin}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="23"
        viewBox="0 0 22 23"
        fill="none"
      >
        <rect y="0.497742" width="22" height="22" rx="4" fill="#03C75A" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.1047 5.75726V11.9026L8.91812 5.75726H5.25952V17.2383H8.89535V11.093L13.0819 17.2383H16.7405V15.0518V5.75726H13.1047Z"
          fill="white"
        />
      </svg>
      <div className="headline_1 ft_white">네이버 계정으로 이용하기</div>
    </div>
  );
};

export default NaverLoginButton;

import { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { naverLogin } from "../api/login";

const NaverCallbackPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleLogin = async () => {
      const queryParams = new URLSearchParams(location.search);
      const code = queryParams.get("code");
      const state = queryParams.get("state");

      if (!code || !state) {
        console.error("잘못된 네이버 로그인 요청");
        navigate("/");
        return;
      }

      try {
        const userData = await naverLogin(code, state);
        sessionStorage.setItem("userInfo", JSON.stringify(userData));
        if (userData.nickname == null) {
          navigate("/login/nickname");
        } else {
          navigate("/prompt");
        }
      } catch (error) {
        console.error("error: ", error);
        console.error("로그인 실패: ", error.message);
      }
    };

    handleLogin();
  }, [navigate, location.key]);

  return <div className="w-100 h-100 bg_black">???</div>;
};

export default NaverCallbackPage;

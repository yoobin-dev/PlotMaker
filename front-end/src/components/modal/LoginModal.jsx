import { React, useState } from "react";

import LoginButton from "../LoginButton";
import { getEmailCheck, postAddUser } from "../../api/user";
import { useNavigate } from "react-router-dom";

import "../../styles/modal/loginModal.css";

const LoginModal = ({
  isLoginModalOpen,
  setIsLoginModalOpen,
  onLogin,
  onClose,
}) => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isMember, setIsMember] = useState(false);

  /* 로그인 관련 */
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const isLoginActive = id && pw;

  const handleSubmitLogin = () => {
    if (pw.length < 1 || id.length < 1) {
      alert("로그인 정보를 입력해주세요");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(id)) {
      alert("이메일 형식을 확인해주세요.");
      return;
    }
    if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/.test(
        pw
      )
    ) {
      alert(
        "비밀번호 조합을 확인해주세요. (영문, 숫자, 특수문자 조합 8자리 이상)"
      );
      return;
    }
    onLogin(id, pw);
  };

  /* 회원가입 관련 */
  const [form, setForm] = useState({
    email: "",
    userPw: "",
    passwordCk: "",
    birthyear: "",
    gender: "",
    agree: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    userPw: "",
    passwordCk: "",
  });
  const [confirmEmail, setConfirmEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState("");

  const isFormValid = () => {
    return (
      form.email &&
      confirmEmail &&
      form.userPw &&
      form.passwordCk &&
      form.birthyear &&
      form.gender &&
      form.agree &&
      Object.values(errors).every((error) => error === "")
    );
  };

  const validate = (name, value) => {
    switch (name) {
      case "email":
        if (!value) return "";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          setEmailStatus("");
          return "이메일 형식(@.)을 지켜주세요.";
        }
        return "";
      case "userPw":
        if (!value) return "";
        if (
          !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/.test(
            value
          )
        )
          return "비밀번호 조합을 확인하세요.";
        return "";
      case "passwordCk":
        if (!value) return "";
        if (value !== form.userPw) return "비밀번호가 일치하지 않습니다.";
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      setConfirmEmail(false);
    }

    const message = validate(name, value);
    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  const handleBirthYear = (e) => {
    let onlyNumber = e.target.value.replace(/[^0-9]/g, "").slice(0, 4);
    if (onlyNumber.length === 4) {
      if (onlyNumber < 1900 || onlyNumber > 2025) {
        setForm((prev) => ({ ...prev, birthyear: "" }));
        // 여긴 뭐.. 굳이 띄우기 귀찮아서 안띄웠는데.. 필요하면 추가할 수 있긴 함..
        return;
      }
    }
    setForm((prev) => ({ ...prev, birthyear: onlyNumber }));
  };

  const handleCheckEmail = async () => {
    try {
      const result = await getEmailCheck(form.email);
      if (result.message.includes("중복")) {
        setErrors((prev) => ({
          ...prev,
          email: "이미 가입된 아이디입니다.",
        }));
        setEmailStatus("");
      }
      if (result.message.includes("가능")) {
        setErrors((prev) => ({
          ...prev,
          email: "",
        }));
        setEmailStatus("사용 가능한 이메일입니다.");
        setConfirmEmail(true);
      }
    } catch (error) {}
  };

  const handleSubmitSignUp = async () => {
    try {
      const result = await postAddUser(form);
      const userData = result.data;

      // sessionStorage.setItem("userInfo", JSON.stringify(userData));
      // 회원가입 축하 보여주기
      setIsMember(true);
      // 가입 완료 5초 후에 이동
      setTimeout(() => {
        // navigate("/login/nickname");
        setIsSignUp(false);
        setIsMember(false);
      }, 5000);
    } catch (error) {}
  };

  const handleGenderRadio = (e, gender) => {
    const radio = document.getElementsByClassName("genderRadio");

    // 라디오 선택 초기화
    for (let r of radio) {
      r.classList.remove("selected");
    }

    // 선택한 성별 표기
    e.target.classList.add("selected");

    setForm((prev) => ({ ...prev, gender: gender }));
  };

  const handleClose = () => {
    onClose();
    setIsSignUp(false);
    setId("");
    setPw("");
    setForm({
      email: "",
      userPw: "",
      passwordCk: "",
      birthyear: "",
      gender: "",
      agree: false,
    });
  };
  return (
    <div
      id="loginModalBackground"
      className={`${isLoginModalOpen ? "" : "d-none"}`}
    >
      <div id="loginModal">
        {!isSignUp ? (
          <>
            <div className="loginModalClose">
              <img
                className="close1"
                src="/close.png"
                onClick={handleClose}
              ></img>
            </div>
            <div id="loginInputBox">
              <div>
                <div className="loginText headline_2 ft_white">
                  아이디(이메일)
                </div>
                <input
                  type="email"
                  className="loginInput label_2 ft_gray_6"
                  placeholder="이메일을 입력해 주세요."
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </div>
              <div>
                <div className="loginText headline_2 ft_white">비밀번호</div>
                <input
                  type="password"
                  className="loginInput label_2 ft_gray_6"
                  placeholder="영문, 숫자, 특수문자 조합 8자리 이상"
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                />
              </div>
            </div>
            <LoginButton
              onClick={handleSubmitLogin}
              title={"이메일로 로그인"}
            />
            <div id="loginModalFooter">
              <span className="label_2 ft_gray_8">회원이 아니신가요?</span>
              <span
                id="joinButton"
                className="lable_1 ft_gray_8"
                onClick={() => setIsSignUp(true)}
              >
                회원가입 하기
              </span>
            </div>
          </>
        ) : !isMember ? (
          <>
            <div className="loginModalClose">
              <img
                className="close2"
                src="/close.png"
                onClick={handleClose}
              ></img>
            </div>
            <div id="joinBox" className="ft_white">
              <div className="joinTitle title_2">회원가입</div>
              <div id="emailBox">
                <div>
                  <div className="loginText headline_2 ft_white">
                    아이디(이메일)
                  </div>
                  <input
                    type="email"
                    name="email"
                    className="loginInput label_2 ft_gray_6"
                    placeholder="이메일을 입력해주세요."
                    value={form.email}
                    onChange={handleChange}
                  />
                  <button
                    id="duplChkButton"
                    className="label_2 ft_gray_d"
                    onClick={handleCheckEmail}
                    disabled={!form.email || !!errors.email || confirmEmail}
                  >
                    중복확인
                  </button>
                </div>
                <div className="status">
                  <span className="red caption_1">{errors.email}</span>
                  <span className="caption_1 blue">{emailStatus}</span>
                </div>
              </div>
              <div id="passwordBox">
                <div className="loginText headline_2 ft_white">비밀번호</div>
                <div>
                  <input
                    type="password"
                    name="userPw"
                    className="loginInput label_2 ft_gray_6"
                    placeholder="영문, 숫자, 특수문자 조합 8자리 이상"
                    value={form.userPw}
                    onChange={handleChange}
                  />
                </div>
                <div className="status">
                  <span className="red caption_1">{errors.userPw}</span>
                </div>
                <div>
                  <input
                    type="password"
                    name="passwordCk"
                    className="loginInput label_2 ft_gray_6"
                    placeholder="비밀번호를 다시 입력해주세요."
                    value={form.passwordCk}
                    onChange={handleChange}
                  />
                  <div className="status">
                    <span className="red caption_1">{errors.passwordCk}</span>
                  </div>
                </div>
              </div>
              <div>
                <div id="personalTitle" className="heading_2">
                  간단한 정보를 알려주세요.
                </div>
                <div id="personalInfoBox">
                  <div id="birthYearBox">
                    <div className="headline_2">출생년도</div>
                    <div className="headline_1">
                      <input
                        id="bitrhYearInput"
                        type="text"
                        name="birthyear"
                        value={form.birthyear}
                        onChange={handleBirthYear}
                        maxLength={4}
                        autoComplete="off"
                      />
                      <span>년</span>
                    </div>
                  </div>
                  <div id="genderBox">
                    <div className="headline_2">성별</div>
                    <div id="genderRadioBox">
                      <div
                        className="genderRadio"
                        onClick={(e) => handleGenderRadio(e, "M")}
                      >
                        남성
                      </div>
                      <div
                        className="genderRadio"
                        onClick={(e) => handleGenderRadio(e, "F")}
                      >
                        여성
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="joinFooter">
                <label>
                  <input
                    type="checkbox"
                    checked={form.agree}
                    onChange={(e) => {
                      setForm((prev) => ({ ...prev, agree: e.target.checked }));
                      e.target.classList.add("selected");
                    }}
                  />
                  (필수) 개인정보 이용에 동의합니다.
                </label>
                <LoginButton
                  disabled={!isFormValid()}
                  onClick={handleSubmitSignUp}
                  title={"이메일로 회원가입하기"}
                />
              </div>
            </div>
          </>
        ) : (
          <div id="MemberClapBox" className="ft_white">
            <div>
              <img src="/clap.gif"></img>
            </div>
            <div id="clapText" className="main_1">
              <span>플롯메이커에 오신 걸 환영해요!</span>
            </div>
            <div id="joinCompleteText" className="body_1">
              <span>회원가입이 완료되었습니다.</span>
              <span>다시 로그인해주세요.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginModal;

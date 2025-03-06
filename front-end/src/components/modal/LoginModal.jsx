import {React, useState} from "react";

import LoginButton from "../LoginButton";
import { getEmailCheck, postAddUser } from "../../api/user";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ isOpen, onLogin }) => {
  if(!isOpen) return null;

  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);

  /* 로그인 관련 */
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const isLoginActive = id && pw;
  
  const handleSubmitLogin = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(id)) {
      alert('이메일 형식을 확인해주세요.');
      return;
    }
    if(!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/.test(pw)) {
      alert('비밀번호 조합을 확인해주세요. (영문, 숫자, 특수문자 조합 8자리 이상)');
      return;
    }
    onLogin(id, pw);
  }

  /* 회원가입 관련 */
  const [form, setForm] = useState({
    email: '',
    userPw: '',
    passwordCk: '',
    birthyear: '',
    gender: '',
    agree: false
  })
  const [errors, setErrors] = useState({
    email: '',
    userPw: '',
    passwordCk: ''
  })
  const [confirmEmail, setConfirmEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState('');

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
    )
  }

  const validate = (name, value) => {
    switch(name) {
      case "email":
        if(!value) return '';
        if((!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))) return '이메일 형식(@.)을 지켜주세요.';
        return '';
      case "userPw":
        if(!value) return '';
        if(!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/.test(value)) return '비밀번호 조합을 확인하세요.';
        return '';
      case "passwordCk":
        if(!value) return '';
        if(value !== form.userPw) return '비밀번호가 일치하지 않습니다.';
        return '';
    }
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm((prev) => ({...prev, [name]: value}));

    if(name === 'email'){
      setConfirmEmail(false);
    }

    const message = validate(name, value);
    setErrors((prev) => ({...prev, [name]: message}));
  }

  const handleBirthYear = (e) => {
    let onlyNumber = e.target.value.replace(/[^0-9]/g, "").slice(0, 4);
    if (onlyNumber.length === 4){
      if(onlyNumber < 1900 || onlyNumber > 2025){
        setForm((prev) => ({...prev, birthyear: ''}));
        // 여긴 뭐.. 굳이 띄우기 귀찮아서 안띄웠는데.. 필요하면 추가할 수 있긴 함..
        return;
      }
    }
    setForm((prev) => ({ ...prev, birthyear: onlyNumber }));
  };

  const handleCheckEmail = async () => {
    try {
      const result = await getEmailCheck(form.email);
      if(result.message.includes('중복')){
        setErrors((prev) => ({
          ...prev, email: '이미 가입된 아이디입니다.'
        }));
        setEmailStatus('');
      }
      if(result.message.includes('가능')){
        setErrors((prev) => ({
          ...prev,
          email: '',
        }));
        setEmailStatus('사용 가능한 이메일입니다.');
        setConfirmEmail(true);
      }
    } catch(error){
    }
  }

  const handleSubmitSignUp = async () => {
    try {
      const result = await postAddUser(form);
      const userData = result.data;
      sessionStorage.setItem("userInfo", JSON.stringify(userData));
      // 여기 회원가입완료 안내창 있어야 할 지?
      navigate("/login/nickname");
    } catch(error){

    }
  }

  // 클래스 적용할 때 CclassName={form."이름"? errors."이름"? "오류(빨간색) 클래스명" : "정상(파란색) 클래스명" : ""} 이렇게 주면 될 듯

  return (
    <div style={{ zIndex: "99"}}>
      {
        !isSignUp?
        <>
          <div>
            <div>아이디(이메일)</div>
            <input
              type="email"
              placeholder="이메일을 입력해 주세요."
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <div>
            <div>비밀번호</div>
            <input
              type="password"
              placeholder="영문, 숫자, 특수문자 조합 8자리 이상"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
            />
          </div>
          <LoginButton
            onClick={handleSubmitLogin} 
            title={'이메일로 로그인'}
            disabled={!isLoginActive}
          />
          <span className="ft_white">회원이 아니신가요?</span>
          <span className="ft_white" onClick={() => setIsSignUp(true)}>회원가입 하기</span>
        </>
        :
        <div className="ft_white">
          <div>회원가입</div>
          <div>
            <div>아이디(이메일)</div>
            <input
              type="email"
              name="email"
              placeholder="이메일을 입력해주세요."
              value={form.email}
              onChange={handleChange}
            />
            <button
              onClick={handleCheckEmail}
              disabled={!form.email || !!errors.email || confirmEmail}
            >
              중복확인
            </button>
            <span>
              {errors.email}
            </span>
            <span>
              {emailStatus}
            </span>
          </div>
          <div>
            <div>비밀번호</div>
            <div>
              <input
                type="password"
                name="userPw"
                placeholder="영문, 숫자, 특수문자 조합 8자리 이상"
                value={form.userPw}
                onChange={handleChange}
              />
              <span>
                {errors.userPw}
              </span>
            </div>
            <div>
              <input
                type="password"
                name="passwordCk"
                placeholder="비밀번호를 다시 입력해주세요."
                value={form.passwordCk}
                onChange={handleChange}
              />
              <span>
                {errors.passwordCk}
              </span>
            </div>
          </div>
          <div>
            <div>
              <div>출생년도</div>
              <input
                type="text"
                name="birthyear"
                value={form.birthyear}
                onChange={handleBirthYear}
                maxLength={4}
              />
              <span>년</span>
            </div>
            <div>
              <div>성별</div>
              <div>
                <div onClick={() => {
                  setForm((prev) =>({...prev, gender: 'M'}))
                }}>남성</div>
                <div onClick={() => {
                  setForm((prev) =>({...prev, gender: 'F'}))
                }}>여성</div>
              </div>
            </div>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={form.agree}
                onChange={(e) => {
                  setForm((prev) => ({...prev, agree: e.target.checked}))
                }}
              />
              (필수) 개인정보 이용에 동의합니다.
            </label>
          </div>
          <LoginButton 
            disabled={!isFormValid()}
            onClick={handleSubmitSignUp}
            title={'이메일로 회원가입하기'}
          />
        </div>
      }
    </div>
  )

}

export default LoginModal;
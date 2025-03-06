package org.ohap.plotmaker.login;

import org.ohap.plotmaker.mapper.LoginMapper;
import org.ohap.plotmaker.user.UserDTO;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoginServiceImpl implements LoginService {
  
  private final LoginMapper loginMapper;
  private final BCryptPasswordEncoder passwordEncoder;

  @Override
  public UserDTO login(String socialId, String userPw) {
    LoginDTO loginInfo = loginMapper.findLoginInfoBySocialId(socialId);
    UserDTO user = null;
    if(loginInfo == null){
      return null;
    }
    if(passwordEncoder.matches(userPw, loginInfo.getUserPw())){
      user = loginMapper.findUserBySocialId(socialId);
    }
    return user;
  }

}

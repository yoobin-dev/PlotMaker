package org.ohap.plotmaker.login;

import org.ohap.plotmaker.mapper.LoginMapper;
import org.ohap.plotmaker.mapper.PromptMapper;
import org.ohap.plotmaker.mapper.UserMapper;
import org.ohap.plotmaker.user.UserDTO;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoginServiceImpl implements LoginService {
  
  private final LoginMapper loginMapper;
  private final UserMapper userMapper;
  private final PromptMapper promptMapper;
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

  @Transactional
  @Override
  public void deleteUser(String socialId, String userPw){
    if(!passwordEncoder.matches(userPw, loginMapper.findLoginInfoBySocialId(socialId).getUserPw())){
      throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
    }
    promptMapper.deletePromptCascadeBySocialId(socialId);
    userMapper.deleteUser(socialId);
  }

}

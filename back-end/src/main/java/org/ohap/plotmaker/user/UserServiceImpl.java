package org.ohap.plotmaker.user;

import org.ohap.plotmaker.login.LoginDTO;
import org.ohap.plotmaker.mapper.LoginMapper;
import org.ohap.plotmaker.mapper.UserMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

  private final UserMapper userMapper;
  private final LoginMapper loginMapper;
  private final BCryptPasswordEncoder passwordEncoder;

  @Override
  public boolean isNicknameDupl(String nickname){
    return userMapper.isNicknameDupl(nickname) != 0;
  }
  @Override
  public UserDTO setNickname(String socialId, String nickname) {
    int result = userMapper.setNickname(socialId, nickname);
    if(result == 0){
      // 수정사항: 예외처리 : 업데이트 실패
    }
    UserDTO userInfo = userMapper.findUserBySocialId(socialId);
    return userInfo;
  }
  @Override
  public boolean isEmailDupl(String email) {
    return userMapper.findUserBySocialId(email) != null;
  }
  @Override
  public UserDTO addUser(UserRequestDTO user) {
    user.setUserPw(passwordEncoder.encode(user.getUserPw()));
    userMapper.insertUser(user);
    UserDTO userInfo = userMapper.findUserBySocialId(user.getSocialId());
    return userInfo;
  }

  @Override
  public boolean isPasswordCorrect(String socialId, String userPw){
    LoginDTO user = loginMapper.findLoginInfoBySocialId(socialId);
    return passwordEncoder.matches(userPw, user.getUserPw());
  }

  @Transactional
  @Override
  public int deleteUser(String socialId){
    int delete = userMapper.deleteUser(socialId);
    return delete;
  }
  
}

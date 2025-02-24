package org.ohap.plotmaker.login;

import org.ohap.plotmaker.mapper.UserMapper;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

  private final UserMapper userMapper;

  @Override
  public boolean isNicknameDupl(String nickname){
    return userMapper.isNicknameDupl(nickname) != 0;
  }
  @Override
  public UserDTO setNickname(String socialId, String nickname) {
    int result = userMapper.setNickname(socialId, nickname);
    if(result == 0){
      // 예외처리 : 업데이트 실패
    }
    UserDTO userInfo = userMapper.findUserBySocialId(socialId);
    return userInfo;
  }
  
}

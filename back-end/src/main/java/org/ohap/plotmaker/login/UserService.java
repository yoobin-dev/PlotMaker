package org.ohap.plotmaker.login;

public interface UserService {
  
  public boolean isNicknameDupl(String nickname);
  public UserDTO setNickname(String socialId, String nickname);

}

package org.ohap.plotmaker.login;

import org.ohap.plotmaker.user.UserDTO;

public interface LoginService {
  
  public UserDTO login(String socialId, String userPw);

}

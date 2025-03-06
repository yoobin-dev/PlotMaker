package org.ohap.plotmaker.login;

import org.ohap.plotmaker.user.UserDTO;

public interface NaverLoginService {
  
  public String getAccessToken(String code, String state);
  public UserDTO insertOrUpdateUser(String accessToken);

}

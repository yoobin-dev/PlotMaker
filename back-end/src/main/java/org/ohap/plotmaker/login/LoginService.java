package org.ohap.plotmaker.login;

public interface LoginService {
  
  public String getAccessToken(String code, String state);
  public UserDTO getUserInfo(String accessToken);
  public UserDTO insertOrUpdateUser(String accessToken);

}

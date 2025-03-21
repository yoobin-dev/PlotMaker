package org.ohap.plotmaker.user;

public interface UserService {
  
  public boolean isNicknameDupl(String nickname);
  public UserDTO setNickname(String socialId, String nickname);

  public boolean isEmailDupl(String email);
  public UserDTO addUser(UserRequestDTO user);

  public boolean isPasswordCorrect(String socialId, String userPw);
  public int deleteUser(String socialId);

}

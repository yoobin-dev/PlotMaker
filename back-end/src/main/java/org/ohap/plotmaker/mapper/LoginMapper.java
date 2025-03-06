package org.ohap.plotmaker.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.ohap.plotmaker.login.LoginDTO;
import org.ohap.plotmaker.user.UserDTO;

@Mapper
public interface LoginMapper {
  
  public UserDTO findUserBySocialId(String socialId);
  public LoginDTO findLoginInfoBySocialId(String socialId);
  public int insertUser(UserDTO user);
  public int setNickname(String nickname, String socialId);
  public int updateLastLogin(String socialId);

}

package org.ohap.plotmaker.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.ohap.plotmaker.login.UserDTO;

@Mapper
public interface LoginMapper {
  
  public UserDTO findUserBySocialId(String socialId);
  public int insertUser(UserDTO user);
  public int setNickname(String nickname, String socialId);
  public int updateLastLogin(String socialId);

}

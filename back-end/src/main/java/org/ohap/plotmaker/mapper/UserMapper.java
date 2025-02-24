package org.ohap.plotmaker.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.ohap.plotmaker.login.UserDTO;

@Mapper
public interface UserMapper {
  
  public UserDTO findUserBySocialId(String socialId);
  public int isNicknameDupl(String nickname);
  public int setNickname(String socialId, String nickname);

}

package org.ohap.plotmaker.login;

import java.sql.Timestamp;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
@Builder
@Getter
public class UserDTO {
  
  private String loginType;
  private String socialId;
  private String email;
  private String nickname;
  private String profile;
  private String gender;
  private String age;
  private String birthyear;
  private Timestamp createAt;
  private Timestamp modifyAt;
  private Timestamp lastLogin;

}

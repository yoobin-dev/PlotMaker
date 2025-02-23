package org.ohap.plotmaker.login;

import java.sql.Timestamp;

import org.springframework.lang.Nullable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
  
  private String loginType;
  private String socialId;
  @Nullable private String email;
  @Nullable private String nickname;
  @Nullable private String profile;
  private String gender;
  private String age;
  private String birthyear;
  @Nullable private Timestamp createAt;
  @Nullable private Timestamp modifyAt;
  @Nullable private Timestamp lastLogin;

}

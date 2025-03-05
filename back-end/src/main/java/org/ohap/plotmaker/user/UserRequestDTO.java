package org.ohap.plotmaker.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRequestDTO {

  private String loginType;
  private String socialId;
  private String email;
  private String userPw;
  private String gender;
  private String age;
  private String birthyear;

}

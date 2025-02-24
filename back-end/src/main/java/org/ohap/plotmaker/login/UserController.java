package org.ohap.plotmaker.login;

import org.ohap.plotmaker.common.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@RestController
@RequestMapping("/api/user")
@AllArgsConstructor
public class UserController {

  private final UserService userService;
  
  @PostMapping("/{socialId}/nickname")
  public ResponseEntity<ApiResponse<UserDTO>> setNickname(@PathVariable String socialId,
    @RequestParam("nickname") String nickname
    ){
    if(userService.isNicknameDupl(nickname)){
      // 예외처리 : 닉네임 중복
    }
    UserDTO userInfo = userService.setNickname(socialId, nickname);
    ApiResponse<UserDTO> response = ApiResponse.<UserDTO>builder().isSuccess(true).data(userInfo).build();
    return ResponseEntity.ok().body(response);
  }

}

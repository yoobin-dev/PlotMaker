package org.ohap.plotmaker.login;

import java.util.Map;

import org.ohap.plotmaker.common.ApiResponse;
import org.ohap.plotmaker.user.UserDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/login")
@AllArgsConstructor
public class LoginController {

  private final LoginService loginService;
  
  @PostMapping("/naver")
  public ResponseEntity<ApiResponse<UserDTO>> naverLogin(@RequestBody Map<String, String> request){
    String code = request.get("code");
    String state = request.get("state");

    if(code == null || state == null){
      throw new IllegalArgumentException("잘못된 요청입니다.");
    }

    String accessToken = loginService.getAccessToken(code, state);
    UserDTO userInfo = loginService.insertOrUpdateUser(accessToken);

    ApiResponse<UserDTO> response = ApiResponse.<UserDTO>builder().isSuccess(true).data(userInfo).build();

    return ResponseEntity.ok().body(response);
  }

}

package org.ohap.plotmaker.login;

import java.util.Map;
import java.util.NoSuchElementException;

import org.ohap.plotmaker.common.ApiResponse;
import org.ohap.plotmaker.mapper.LoginMapper;
import org.ohap.plotmaker.mapper.UserMapper;
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

  private final NaverLoginService naverLoginService;
  private final LoginService loginService;

  @PostMapping("/pm")
  public ResponseEntity<ApiResponse<UserDTO>> plotmakerLogin(@RequestBody LoginDTO request){
    if(request.getSocialId() == null || request.getUserPw() == null){
      throw new IllegalArgumentException("아이디 또는 비밀번호를 입력해주세요.");
    }
    UserDTO user = loginService.login(request.getSocialId(), request.getUserPw());
    if(user == null){
      throw new NoSuchElementException("아이디 또는 비밀번호를 확인주세요.");
    }
    ApiResponse<UserDTO> response = ApiResponse.<UserDTO>builder().isSuccess(true).data(user).build();
    return ResponseEntity.ok().body(response);
  }
  
  @PostMapping("/naver")
  public ResponseEntity<ApiResponse<UserDTO>> naverLogin(@RequestBody Map<String, String> request){
    String code = request.get("code");
    String state = request.get("state");

    if(code == null || state == null){
      throw new IllegalArgumentException("잘못된 요청입니다.");
    }

    String accessToken = naverLoginService.getAccessToken(code, state);
    UserDTO userInfo = naverLoginService.insertOrUpdateUser(accessToken);

    ApiResponse<UserDTO> response = ApiResponse.<UserDTO>builder().isSuccess(true).data(userInfo).build();

    return ResponseEntity.ok().body(response);
  }

  

}

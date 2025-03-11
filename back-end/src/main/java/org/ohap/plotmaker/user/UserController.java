package org.ohap.plotmaker.user;

import org.ohap.plotmaker.common.ApiResponse;
import org.ohap.plotmaker.login.LoginDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

  @GetMapping("/email/check")
  public ResponseEntity<ApiResponse<String>> checkEmailDupl(@RequestParam String email){
    boolean isEmailDupl = userService.isEmailDupl(email);
    String msg = isEmailDupl? "중복된 이메일" : "사용 가능한 이메일";
    ApiResponse<String> response = ApiResponse.<String>builder().isSuccess(true).message(msg).build();
    return ResponseEntity.ok().body(response);
  }

  @PostMapping("")
  public ResponseEntity<ApiResponse<UserDTO>> addUser(@RequestBody UserRequestDTO user){
    user.setLoginType("P");
    user.setSocialId(user.getEmail());
    int age = (2025 - Integer.parseInt(user.getBirthyear())) / 10 * 10;
    String ageStr = age + "-" + (age+9);
    user.setAge(ageStr);
    UserDTO userInfo = userService.addUser(user);
    ApiResponse<UserDTO> response = ApiResponse.<UserDTO>builder().isSuccess(true).data(userInfo).build();
    return ResponseEntity.ok().body(response);
  }
  
  @PostMapping("/{socialId}/nickname")
  public ResponseEntity<ApiResponse<UserDTO>> setNickname(@PathVariable String socialId,
    @RequestParam("nickname") String nickname
    ){
    if(userService.isNicknameDupl(nickname)){
      throw new IllegalArgumentException("중복된 닉네임입니다.");
    }
    UserDTO userInfo = userService.setNickname(socialId, nickname);
    ApiResponse<UserDTO> response = ApiResponse.<UserDTO>builder().isSuccess(true).data(userInfo).build();
    return ResponseEntity.ok().body(response);
  }

  @PostMapping("/leave/password")
  public ResponseEntity<ApiResponse<String>> checkPwBeforeLeave(@RequestBody LoginDTO request){
    boolean passwordCorrect = userService.isPasswordCorrect(request.getSocialId(), request.getUserPw());
    if(!passwordCorrect){
      throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
    }
    ApiResponse<String> response = ApiResponse.<String>builder().isSuccess(true).message("비밀번호가 일치합니다.").build();
    return ResponseEntity.ok().body(response);
  }

  @PostMapping("/leave")
  public ResponseEntity<ApiResponse<String>> deleteUser(@RequestBody String socialId){
    int delete = userService.deleteUser(socialId);
    if(delete != 1){
      throw new RuntimeException();
    }
    ApiResponse<String> response = ApiResponse.<String>builder().isSuccess(true).message("회원탈퇴 완료").build();
    return ResponseEntity.ok().body(response);
  }

}

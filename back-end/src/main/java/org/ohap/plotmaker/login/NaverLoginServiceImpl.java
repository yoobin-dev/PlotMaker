package org.ohap.plotmaker.login;

import org.ohap.plotmaker.mapper.LoginMapper;
import org.ohap.plotmaker.user.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
public class NaverLoginServiceImpl implements NaverLoginService {

  @Autowired
  private final LoginMapper loginMapper;

  @Value("${login.naver.client_id}")
  private String clientId;
  @Value("${login.naver.client_secret}")
  private String clientSecret;
  @Value("${login.naver.redirect_uri}")
  private String redirectUri;

  public NaverLoginServiceImpl(LoginMapper loginMapper) {
    this.loginMapper = loginMapper;
  }

  @Override
  public String getAccessToken(String code, String state) {
    StringBuilder stringBuilder = new StringBuilder();
    stringBuilder.append("https://nid.naver.com/oauth2.0/token?grant_type=authorization_code")
      .append("&client_id=").append(clientId)
      .append("&client_secret=").append(clientSecret)
      .append("&redirect_uri=").append(redirectUri)
      .append("&code=").append(code)
      .append("&state=").append(state);

    RestTemplate restTemplate = new RestTemplate();
    ResponseEntity<String> response = restTemplate.getForEntity(stringBuilder.toString(), String.class);

    JsonElement element = JsonParser.parseString(response.getBody());
    return element.getAsJsonObject().get("access_token").getAsString();
  }

  private UserDTO getUserInfo(String accessToken) {
    String userInfoUrl = "https://openapi.naver.com/v1/nid/me";
    RestTemplate restTemplate = new RestTemplate();
    HttpHeaders headers = new HttpHeaders();
    headers.set("Authorization", "Bearer " + accessToken);

    HttpEntity<String> entity = new HttpEntity<>(headers);
    ResponseEntity<String> response = restTemplate.exchange(userInfoUrl, HttpMethod.GET, entity, String.class);

    JsonElement element = JsonParser.parseString(response.getBody());
    if(element.getAsJsonObject().has("error")){
      throw new RuntimeException();
    }

    JsonObject responseObj = element.getAsJsonObject().get("response").getAsJsonObject();
    UserDTO userInfo = UserDTO.builder()
                        .loginType("N")
                        .socialId(responseObj.get("id").getAsString())
                        .email(responseObj.has("email")? responseObj.get("email").getAsString() : null)
                        .nickname(responseObj.has("nickname")? responseObj.get("nickname").getAsString() : null)
                        .gender(responseObj.has("gender")? responseObj.get("gender").getAsString() : null)
                        .age(responseObj.has("age")? responseObj.get("age").getAsString() : null)
                        .birthyear(responseObj.has("birthyear")? responseObj.get("birthyear").getAsString() : null)
                        .build();

    return userInfo;
  }

  @Override
  @Transactional
  public UserDTO insertOrUpdateUser(String accessToken){
    UserDTO userInfo = getUserInfo(accessToken);
    if(userInfo == null){
      throw new RuntimeException();
    }
    UserDTO existingUser = loginMapper.findUserBySocialId(userInfo.getSocialId());
    if(existingUser != null){
      loginMapper.updateLastLogin(userInfo.getSocialId());
      userInfo = existingUser;
      return userInfo;
    } else {
      loginMapper.insertUser(userInfo);
      return userInfo;
    }
  }

}

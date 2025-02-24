package org.ohap.plotmaker;

import org.junit.jupiter.api.Test;
import org.ohap.plotmaker.login.UserService;
import org.ohap.plotmaker.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class UserTest {

  @Autowired
  private UserMapper userMapper;

  @Test
  public void setNicknameTest() {
    userMapper.setNickname("1", "test");
  }
  
}

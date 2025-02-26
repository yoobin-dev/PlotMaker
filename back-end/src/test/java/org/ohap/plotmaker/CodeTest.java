package org.ohap.plotmaker;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.ohap.plotmaker.code.CodeDTO;
import org.ohap.plotmaker.mapper.CodeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class CodeTest {
  
  @Autowired
  private CodeMapper codeMapper;

  @Test
  public List<CodeDTO> codeListTest() {
    return codeMapper.selectCodeList();
  }

}

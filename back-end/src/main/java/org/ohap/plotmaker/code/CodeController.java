package org.ohap.plotmaker.code;

import java.util.List;

import org.ohap.plotmaker.common.ApiResponse;
import org.ohap.plotmaker.mapper.CodeMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/code")
@RequiredArgsConstructor
public class CodeController {
  
  private final CodeMapper codeMapper;

  @GetMapping("")
  public ResponseEntity<ApiResponse<List<CodeDTO>>> getCodeList(){
    List<CodeDTO> list = codeMapper.selectCodeList();
    ApiResponse<List<CodeDTO>> response = ApiResponse.<List<CodeDTO>>builder().isSuccess(true).data(list).build();
    return ResponseEntity.ok().body(response);
  }

}

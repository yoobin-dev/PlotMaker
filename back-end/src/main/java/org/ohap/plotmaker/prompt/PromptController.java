package org.ohap.plotmaker.prompt;

import org.ohap.plotmaker.common.ApiResponse;
import org.ohap.plotmaker.plot.PlotResponseDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/prompt")
@RequiredArgsConstructor
public class PromptController {

  private final PromptService promptService;

  @PostMapping("/{promptSeq}/status")
  public ResponseEntity<ApiResponse<PlotResponseDTO>> changePublicState(@PathVariable String promptSeq){
    PlotResponseDTO plot = promptService.changePublicState(promptSeq);
    ApiResponse<PlotResponseDTO> response = ApiResponse.<PlotResponseDTO>builder().isSuccess(true).data(plot).build();
    return ResponseEntity.ok().body(response);
  }

  @PostMapping("/{promptSeq}/title")
  public ResponseEntity<ApiResponse<PlotResponseDTO>> changeTitle(@PathVariable String promptSeq,
    @RequestBody String title) {
      PlotResponseDTO plot = promptService.changeTitle(promptSeq, title);
      ApiResponse<PlotResponseDTO> response = ApiResponse.<PlotResponseDTO>builder().isSuccess(true).data(plot).build();
      return ResponseEntity.ok().body(response);
  }

  @PostMapping("/{promptSeq}/delete")
  public ResponseEntity<ApiResponse<String>> deletePrompt(@PathVariable String promptSeq){
    boolean isSuccess = promptService.deletePrompt(promptSeq);
    String result = isSuccess? "플롯 삭제 성공" : "플롯 삭제 실패";
    ApiResponse<String> response = ApiResponse.<String>builder().isSuccess(isSuccess).message(result).data(result).build();
    return ResponseEntity.ok().body(response);
  }

}

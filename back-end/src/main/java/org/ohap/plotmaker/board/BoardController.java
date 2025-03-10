package org.ohap.plotmaker.board;

import java.util.List;

import org.ohap.plotmaker.common.ApiResponse;
import org.ohap.plotmaker.plot.PlotResponseDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/board")
public class BoardController {
  
  private final BoardService boardService;

  /* 
   * RequestBody 형식
   * {
   *  "socialId": 소셜아이디,
   *  "promptSeq": 프롬프트 시퀀스
   * }
  */
  @PostMapping("/likes/toggle")
  public ResponseEntity<ApiResponse<String>> toggleLikes(@RequestBody ToggleLikesDTO likes){
    String result = boardService.toggleLikes(likes);
    ApiResponse<String> response = ApiResponse.<String>builder().message(result).build();
    return ResponseEntity.ok().body(response);
  }

  @GetMapping("/{promptSeq}")
  public ResponseEntity<ApiResponse<PlotResponseDTO>> getPlotDetail(@PathVariable String promptSeq){
    return null;
  }

  /*
   * criteria 값
   * 1. daily : 투데이
   * 2. weekly : 주간
   * 3. monthly : 월간
   * 4. total : 전체
   * 
   * /api/board/best?categoryCode=카테고리코드&criteria=위의값
   */
  @GetMapping("/best")
  public ResponseEntity<ApiResponse<List<PlotResponseDTO>>> getBestList(@ModelAttribute BestListDTO request){
    List<PlotResponseDTO> list = boardService.getBestList(request);
    ApiResponse<List<PlotResponseDTO>> response = ApiResponse.<List<PlotResponseDTO>>builder()
      .isSuccess(true).data(list).build();
    return ResponseEntity.ok().body(response);
  }

  /*
   * /api/board?categoryCode=카테고리코드&page=페이지
   */
  @GetMapping("")
  public ResponseEntity<ApiResponse<List<PlotResponseDTO>>> getPlotList(@RequestParam String categoryCode, @RequestParam String page){
    return null;
  }

}

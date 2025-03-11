package org.ohap.plotmaker.board;

import java.util.List;

import org.ohap.plotmaker.common.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
    ApiResponse<String> response = ApiResponse.<String>builder().message(result).isSuccess(true).build();
    return ResponseEntity.ok().body(response);
  }

  @GetMapping("/{promptSeq}")
<<<<<<< HEAD
  public ResponseEntity<ApiResponse<BoardPlotDTO>> getPlotDetail(@PathVariable String promptSeq){
    BoardPlotDTO result = boardService.getPlotDetail(promptSeq);
=======
  public ResponseEntity<ApiResponse<BoardPlotDTO>> getPlotDetail(@PathVariable String promptSeq, @RequestParam String socialId){
    BoardPlotDTO result = boardService.getPlotDetail(promptSeq, socialId);
>>>>>>> main
    ApiResponse<BoardPlotDTO> response = ApiResponse.<BoardPlotDTO>builder().isSuccess(true).data(result).build();
    return ResponseEntity.ok().body(response);
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
  public ResponseEntity<ApiResponse<List<BoardPlotDTO>>> getBestList(@ModelAttribute BestListDTO request){
    List<BoardPlotDTO> list = boardService.getBestList(request);
    ApiResponse<List<BoardPlotDTO>> response = ApiResponse.<List<BoardPlotDTO>>builder()
      .isSuccess(true).data(list).build();
    return ResponseEntity.ok().body(response);
  }

  /*
   * /api/board?categoryCode=카테고리코드&page=페이지&socialId=소셜아이디&sortBy=정렬기준&sortOrder=정렬순서
   * 정렬기준 1. createAt 2. view 3. likes
   * 정렬순서 DESC, ASC
   */
  @GetMapping("")
  public ResponseEntity<ApiResponse<List<BoardPlotDTO>>> getPlotList(@ModelAttribute BoardListDTO request){
    ApiResponse<List<BoardPlotDTO>> response = boardService.getBoardList(request);
    return ResponseEntity.ok().body(response);
  }

<<<<<<< HEAD
  @PostMapping("/view")
  public ResponseEntity<ApiResponse<String>> increaseView(@RequestBody String promptSeq){
=======
  @GetMapping("/search")
  public ResponseEntity<ApiResponse<List<BoardPlotDTO>>> searchBoard(@ModelAttribute BoardSearchParamDTO search){
    ApiResponse<List<BoardPlotDTO>> response = boardService.searchBoard(search);
    return ResponseEntity.ok().body(response);
  }

  @PostMapping("/view")
  public ResponseEntity<ApiResponse<String>> increaseView(@RequestBody BoardPromptSeqDTO request){
    String promptSeq = request.getPromptSeq();
>>>>>>> main
    String result = boardService.increaseView(promptSeq);
    ApiResponse<String> response = ApiResponse.<String>builder().message(result).isSuccess(true).build();
    return ResponseEntity.ok().body(response);
  }

}

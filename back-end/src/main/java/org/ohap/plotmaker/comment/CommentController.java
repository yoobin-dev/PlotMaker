package org.ohap.plotmaker.comment;

import java.util.List;

import org.ohap.plotmaker.common.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/comment")
@AllArgsConstructor
public class CommentController {

  private final CommentService commentService;

  @GetMapping("/{promptSeq}")
  public ResponseEntity<ApiResponse<List<CommentDTO>>> getCommentList(@PathVariable String promptSeq){
    List<CommentDTO> list = commentService.getCommentList(promptSeq);
    ApiResponse<List<CommentDTO>> response = ApiResponse.<List<CommentDTO>>builder().isSuccess(true).data(list).build();
    return ResponseEntity.ok().body(response);
  }

  @PostMapping("/{promptSeq}")
  public ResponseEntity<ApiResponse<CommentDTO>> insertComment(@PathVariable String promptSeq,
    @RequestBody CommentDTO comment){
    comment.setPromptSeq(promptSeq);
    CommentDTO result = commentService.insertComment(comment);
    ApiResponse<CommentDTO> response = ApiResponse.<CommentDTO>builder().isSuccess(true).data(result).build();
    return ResponseEntity.ok().body(response);
  }

  @PostMapping("/{commentSeq}/delete")
  public ResponseEntity<ApiResponse<String>> deleteComment(@PathVariable String commentSeq){
    boolean isSuccess = commentService.deleteComment(commentSeq);
    String result = isSuccess? "코멘트 삭제 성공" : "코멘트 삭제 실패";
    ApiResponse<String> response = ApiResponse.<String>builder().isSuccess(isSuccess).message(result).data(result).build();
    return ResponseEntity.ok().body(response);
  }
  
}

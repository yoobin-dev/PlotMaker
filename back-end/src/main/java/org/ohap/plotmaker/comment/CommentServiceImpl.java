package org.ohap.plotmaker.comment;

import java.util.List;

import org.ohap.plotmaker.mapper.CommentMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

  private final CommentMapper commentMapper;

  @Override
  public List<CommentDTO> getCommentList(String promptSeq) {
    return commentMapper.selectCommentListByPromptSeq(promptSeq);
  }

  @Transactional
  @Override
  public CommentDTO insertComment(CommentDTO comment) {
    int insertComment = commentMapper.insertComment(comment);
    if(insertComment == 0) throw new RuntimeException("코멘트 등록 실패");
    return commentMapper.selectCommentListByCommentSeq(comment.getCommentSeq());
  }

  @Transactional
  @Override
  public boolean deleteComment(String commentSeq) {
    int deleteComment = commentMapper.deleteComment(commentSeq);
    return deleteComment > 0;
  }


}

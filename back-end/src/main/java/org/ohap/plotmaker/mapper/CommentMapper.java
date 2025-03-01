package org.ohap.plotmaker.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.ohap.plotmaker.comment.CommentDTO;

@Mapper
public interface CommentMapper {

  public List<CommentDTO> selectCommentListByPromptSeq(String promptSeq);
  public CommentDTO selectCommentListByCommentSeq(String commentSeq);
  public int insertComment(CommentDTO comment);
  public int deleteComment(String commentSeq);

}

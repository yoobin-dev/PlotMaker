package org.ohap.plotmaker.comment;

import java.util.List;

public interface CommentService {
  
  public List<CommentDTO> getCommentList(String promptSeq);
  public CommentDTO insertComment(CommentDTO comment);
  public boolean deleteComment(String commentSeq);

}

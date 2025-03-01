package org.ohap.plotmaker.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.ohap.plotmaker.prompt.PromptDTO;

@Mapper
public interface PromptMapper {
  
  public PromptDTO findPromptOnlyByPromptSeq(String promptSeq);
  public int changePublicState(PromptDTO prompt);
  public int changeTitle(PromptDTO prompt);
  public int deletePromptCascade(String promptSeq);

}

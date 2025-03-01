package org.ohap.plotmaker.prompt;

import org.ohap.plotmaker.mapper.PlotMapper;
import org.ohap.plotmaker.mapper.PromptMapper;
import org.ohap.plotmaker.plot.PlotResponseDTO;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PromptServiceImpl implements PromptService {
  
  private final PlotMapper plotMapper;
  private final PromptMapper promptMapper;

  public PlotResponseDTO changePublicState(String promptSeq){
    PromptDTO prompt = promptMapper.findPromptOnlyByPromptSeq(promptSeq);
    if(prompt.getIsPublic().equals("Y")) prompt.setIsPublic("N");
    if(prompt.getIsPublic().equals("N")) prompt.setIsPublic("Y");
    promptMapper.changePublicState(prompt);
    return plotMapper.selectPlotByPromptSeq(Long.parseLong(promptSeq));
  }

  public PlotResponseDTO changeTitle(String promptSeq, String title){
    PromptDTO prompt = PromptDTO.builder().promptSeq(Long.parseLong(promptSeq)).title(title).build();
    int updateTitle = promptMapper.changeTitle(prompt);
    if(updateTitle != 1){
      throw new RuntimeException("제목 변경 실패");
    }
    return plotMapper.selectPlotByPromptSeq(Long.parseLong(promptSeq));
  }

  public boolean deletePrompt(String promptSeq){
    int deletePrompt = promptMapper.deletePromptCascade(promptSeq);
    return deletePrompt > 0;
  }

}

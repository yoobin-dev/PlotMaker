package org.ohap.plotmaker.prompt;

import org.ohap.plotmaker.plot.PlotResponseDTO;

public interface PromptService {
  
  public PlotResponseDTO changePublicState(String promptSeq, String isPublic);
  public PlotResponseDTO changeTitle(String promptSeq, String title);
  public boolean deletePrompt(String promptSeq);
  
}

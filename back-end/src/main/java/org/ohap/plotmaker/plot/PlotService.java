package org.ohap.plotmaker.plot;

import java.util.List;

public interface PlotService {

  public PlotResponseDTO insertPrompt(PlotRequestDTO request);
  public List<PlotResponseDTO> searchPlot(PlotSearchParamDTO param);
  
}

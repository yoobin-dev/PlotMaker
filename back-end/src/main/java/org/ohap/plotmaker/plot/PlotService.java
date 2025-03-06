package org.ohap.plotmaker.plot;

import java.util.List;

public interface PlotService {

  public List<PlotResponseDTO> getPlotList(String socialId, PlotOrderParamDTO order);
  public PlotResponseDTO makePlot(PlotRequestDTO request);
  public PlotResponseDTO savePlot(String socialId, PlotResponseDTO response);
  public List<PlotResponseDTO> searchPlot(PlotSearchParamDTO param);
  
}

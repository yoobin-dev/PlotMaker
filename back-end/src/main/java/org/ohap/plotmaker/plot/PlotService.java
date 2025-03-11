package org.ohap.plotmaker.plot;

import java.util.List;

public interface PlotService {

  public List<PlotResponseDTO> getPlotList(String socialId, PlotOrderParamDTO order);
  public PlotResponseDTO makePlot(PlotRequestDTO request);
<<<<<<< HEAD
=======
  public PlotResponseDTO makeNextPlot(String promptSeq);
>>>>>>> main
  public PlotResponseDTO makePlot2(PlotRequestDTO request);
  public PlotResponseDTO savePlot(String socialId, PlotResponseDTO response);
  public List<PlotResponseDTO> searchPlot(PlotSearchParamDTO param);
  public String makeHtml(long promptSeq);
  
}

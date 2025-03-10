package org.ohap.plotmaker.board;

import java.util.List;

import org.ohap.plotmaker.plot.PlotResponseDTO;

public interface BoardService {

  public List<PlotResponseDTO> getBestList(BestListDTO request);
  
}

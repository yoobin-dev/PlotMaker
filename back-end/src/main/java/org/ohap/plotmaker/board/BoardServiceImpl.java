package org.ohap.plotmaker.board;

import java.util.List;

import org.ohap.plotmaker.mapper.BoardMapper;
import org.ohap.plotmaker.plot.PlotResponseDTO;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {
  
  private final BoardMapper boardMapper;

  @Override
  public List<PlotResponseDTO> getBestList(BestListDTO request) {
    List<PlotResponseDTO> list = boardMapper.selectBestPlot(request);
    return list;
    
  }

  public void toggleLikes(ToggleLikesDTO toggleLikesDTO){
    
  }

}

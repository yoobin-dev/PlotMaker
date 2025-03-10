package org.ohap.plotmaker.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.ohap.plotmaker.board.BestListDTO;
import org.ohap.plotmaker.board.ToggleLikesDTO;
import org.ohap.plotmaker.plot.PlotResponseDTO;

@Mapper
public interface BoardMapper {
  
  public List<PlotResponseDTO> selectBestPlot(BestListDTO request);
  public int selectLikes(ToggleLikesDTO request);
  public void deleteLike(ToggleLikesDTO request);
  public int insertLike(ToggleLikesDTO request);

}

package org.ohap.plotmaker.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.ohap.plotmaker.plot.PlotRequestDTO;
import org.ohap.plotmaker.plot.PlotResponseDTO;

@Mapper
public interface PlotMapper {
  
  public int insertPromptMST(PlotRequestDTO request);
  public int insertPromptDTL(PlotRequestDTO request);
  public List<PlotResponseDTO> selectPlotListBySocialId(String socialId);
  public PlotResponseDTO selectPlotListByPromptSeq(String promptSeq);

}

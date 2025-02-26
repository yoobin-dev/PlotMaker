package org.ohap.plotmaker.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.ohap.plotmaker.plot.PlotResponseDTO;

@Mapper
public interface PlotMapper {
  
  public List<PlotResponseDTO> selectPlotListBySocialId(String socialId);

}

package org.ohap.plotmaker.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.ohap.plotmaker.plot.PlotDTO;
import org.ohap.plotmaker.plot.PlotOrderParamDTO;
import org.ohap.plotmaker.plot.PlotRequestDTO;
import org.ohap.plotmaker.plot.PlotResponseDTO;
import org.ohap.plotmaker.plot.PlotSearchParamDTO;

@Mapper
public interface PlotMapper {
  
  public int insertPromptMST(PlotRequestDTO request);
  public int insertPromptDTL(PlotRequestDTO request);
  public List<PlotResponseDTO> selectandOrderPlot(PlotOrderParamDTO param);
  public List<PlotResponseDTO> selectPlotListBySocialId(@Param("socialId") String socialId, @Param("status") String status);
  public PlotResponseDTO selectPlotByPromptSeq(long promptSeq);
  public List<PlotResponseDTO> selectPlotBySearchParam(PlotSearchParamDTO param);
  public int insertPlotResult(PlotDTO plot);

  public String selectPrevPlot(String promptSeq);
  public PlotRequestDTO selectPrevPlotRequest(String promptSeq);

}

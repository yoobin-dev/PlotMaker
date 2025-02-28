package org.ohap.plotmaker.plot;

import org.ohap.plotmaker.mapper.PlotMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@RequiredArgsConstructor
@Log4j2
public class PlotServiceImpl implements PlotService {

  private final PlotMapper plotMapper;

  @Transactional
  @Override
  public PlotResponseDTO insertPrompt(PlotRequestDTO request){
    try {
      int insert = plotMapper.insertPromptMST(request);
      if(insert == 1){
        plotMapper.insertPromptDTL(request);
      } else {
        throw new RuntimeException();
      }
    } catch(Exception e){
      throw new RuntimeException("Prompt 입력 실패");
    }
    log.info(plotMapper.selectPlotListByPromptSeq(request.getPromptSeq()));
    return plotMapper.selectPlotListByPromptSeq(request.getPromptSeq());
  }

}

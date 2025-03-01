package org.ohap.plotmaker.plot;

import java.util.List;

import org.ohap.plotmaker.mapper.CodeMapper;
import org.ohap.plotmaker.mapper.PlotMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@RequiredArgsConstructor
@Log4j2
@Transactional
public class PlotServiceImpl implements PlotService {

  private final PlotMapper plotMapper;
  private final CodeMapper codeMapper;
  private final ClovaService clovaService;

  /* 수정사항: 메소드 분리 !!!! */
  @Transactional
  @Override
  public PlotResponseDTO insertPrompt(PlotRequestDTO request){
    try {
      int insertPrompt = plotMapper.insertPromptMST(request);
      if (insertPrompt == 1){
        plotMapper.insertPromptDTL(request);
      } else {
        throw new RuntimeException("Prompt 입력 실패");
      }

      /* 코드처리 */
      String categoryCode = request.getCategoryCode();
      request.setCategory(codeMapper.selectCodeNameByCode(categoryCode));
      String genreCode = request.getGenreCode();
      if(!genreCode.contains("999")) request.setGenre(codeMapper.selectCodeNameByCode(genreCode));
      String timeframeCode = request.getTimeframeCode();
      if(!timeframeCode.contains("999")) request.setTimeframe(codeMapper.selectCodeNameByCode(timeframeCode));
      String themeCode = request.getThemeCode();
      if(!themeCode.contains("999")) request.setTheme(codeMapper.selectCodeNameByCode(themeCode));

      Boolean isSynopsis = categoryCode.equals("T000");
      String volume = isSynopsis? "중간에서 끊지 않고, 내용을 끝까지 완성해주세요." : "\n분량: 첫 1화";
      StringBuilder sb = new StringBuilder();
      sb.append("키워드를 가지고 ").append(request.getCategory()).append("을(를) 창작합니다. 키워드는 아래와 같습니다.\n");
      sb.append("장르: ").append(request.getGenre())
        .append("\n대본은 등장인물의 대사를 위주로 작성해야 하고, 시나리오는 실제 영화 시나리오처럼 장면에 대한 묘사도 필요합니다.")
        .append("\n배경: ").append(request.getTimeframe())
        .append("\n테마: ").append(request.getTheme())
        .append("\n사건: ").append(request.getEvent())
        .append("\n고유설정: ").append(request.getCustom())
        .append("\n너의 성격: ").append(request.getTellType())
        .append("\n제목은 정하지 않고, 다른 설명없이 생성된 이야기만 반환해주세요.\n")
        .append(volume);

      PlotDTO plot = PlotDTO.builder().plotContent(clovaService.requestClova(isSynopsis, sb.toString())).promptSeq(request.getPromptSeq()).build();
      int insertPlot = plotMapper.insertPlotResult(plot);
      if(insertPlot != 1){
        throw new RuntimeException("Plot 입력 실패");
      }
      PlotResponseDTO response = plotMapper.selectPlotByPromptSeq(request.getPromptSeq());
      response.setPlotSeq(plot.getPlotSeq());
      return response;
      } catch(Exception e){
        throw new RuntimeException(e.getMessage());
      }

  }

  @Override
  public List<PlotResponseDTO> searchPlot(PlotSearchParamDTO param){
    List<PlotResponseDTO> list = plotMapper.selectPlotBySearchParam(param);
    return list;
  }
}

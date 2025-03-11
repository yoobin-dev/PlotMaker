package org.ohap.plotmaker.plot;

import java.util.List;

import org.ohap.plotmaker.mapper.CodeMapper;
import org.ohap.plotmaker.mapper.PlotMapper;
import org.ohap.plotmaker.util.MakeHtmlUtil;
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
  private final MakeHtmlUtil makeHtmlUtil;

  public List<PlotResponseDTO> getPlotList(String socialId, PlotOrderParamDTO order){
    order.setSocialId(socialId);
    List<PlotResponseDTO> list = plotMapper.selectandOrderPlot(order);
    return list;
  }

  private void codeDefine(PlotRequestDTO request){
    String categoryCode = request.getCategoryCode();
    request.setCategory(codeMapper.selectCodeNameByCode(categoryCode));
    String genreCode = request.getGenreCode();
    if(!genreCode.contains("999")) request.setGenre(codeMapper.selectCodeNameByCode(genreCode));
    String timeframeCode = request.getTimeframeCode();
    if(!timeframeCode.contains("999")) request.setTimeframe(codeMapper.selectCodeNameByCode(timeframeCode));
    String themeCode = request.getThemeCode();
    if(!themeCode.contains("999")) request.setTheme(codeMapper.selectCodeNameByCode(themeCode));
  }

  private PlotResponseDTO makePlotResponseDTObyPlotRequestDTO(PlotRequestDTO request){
    PlotResponseDTO result = PlotResponseDTO.builder()
      .categoryCode(request.getCategoryCode()).category(request.getCategory())
      .genreCode(request.getGenreCode()).genre(request.getGenre())
      .timeframeCode(request.getTimeframeCode()).timeframe(request.getTimeframe())
      .themeCode(request.getThemeCode()).theme(request.getTheme())
      .event(request.getEvent()).tellType(request.getTellType())
      .custom(request.getCustom())
      .title(request.getTitle()).isPublic(request.getIsPublic())
      .build();
      return result;
  }

  @Override
  public PlotResponseDTO makePlot(PlotRequestDTO request){
    codeDefine(request);
    PlotResponseDTO plot = makePlotResponseDTObyPlotRequestDTO(request);
    
    Boolean isSynopsis = request.getCategoryCode().equals("T000");
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
      .append("\n값이 없는 키워드에 대해서는 임의로 값을 설정해서 만들어주세요.")
      .append(volume);
    
    String plotContent = clovaService.requestClova(isSynopsis, sb.toString());
    plot.setPlotContent(plotContent);
    return plot;
  }

  @Override
  public PlotResponseDTO makePlot2(PlotRequestDTO request){
    codeDefine(request);
    PlotResponseDTO plot = makePlotResponseDTObyPlotRequestDTO(request);
    String categoryCode = request.getCategoryCode();
    StringBuilder sb = new StringBuilder();
    sb.append("장르: ").append(request.getGenre())
    .append("\n배경: ").append(request.getTimeframe())
    .append("\n테마: ").append(request.getTheme())
    .append("\n사건: ").append(request.getEvent())
    .append("\n고유설정: ").append(request.getCustom())
    .append("\n너의 성격: ").append(request.getTellType());

    String plotContent = clovaService.requestClova2(categoryCode, sb.toString());
    plot.setPlotContent(plotContent);
    return plot;
  }

  public PlotResponseDTO makeNextPlot(String promptSeq){
    String prevPlot = plotMapper.selectPrevPlot(promptSeq);
    String summary = clovaService.requestSummary(prevPlot);
    PlotRequestDTO request = plotMapper.selectPrevPlotRequest(promptSeq);
    PlotResponseDTO plot = makePlotResponseDTObyPlotRequestDTO(request);
    StringBuilder sb = new StringBuilder();
    sb.append("다음 내용에 이어서 계속 글을 써줘.")
      .append("\n내용: ").append(summary);
    String plotContent = clovaService.requestClova(false, sb.toString());
    plot.setPlotContent(plotContent);
    return plot;
  }

  private void codeNameDefine(PlotResponseDTO response){
    response.setCategory(null);
    String genreCode = response.getGenreCode();
    if(!genreCode.contains("999")) response.setGenre(null);
    String timeframeCode = response.getTimeframeCode();
    if(!timeframeCode.contains("999")) response.setTimeframe(null);
    String themeCode = response.getThemeCode();
    if(!themeCode.contains("999")) response.setTheme(null);
  }

  private PlotRequestDTO makePlotRequestDTObyPlotResponseDTO(PlotResponseDTO response){
    codeNameDefine(response);
    PlotRequestDTO result = PlotRequestDTO.builder()
    .categoryCode(response.getCategoryCode()).category(response.getCategory())
    .genreCode(response.getGenreCode()).genre(response.getGenre())
    .timeframeCode(response.getTimeframeCode()).timeframe(response.getTimeframe())
    .themeCode(response.getThemeCode()).theme(response.getTheme())
    .event(response.getEvent()).tellType(response.getTellType())
    .custom(response.getCustom())
    .title(response.getTitle()).isPublic(response.getIsPublic())
    .build();
    return result;
  }

  @Transactional
  @Override
  public PlotResponseDTO savePlot(String socialId, PlotResponseDTO response){
    PlotRequestDTO request = makePlotRequestDTObyPlotResponseDTO(response);
    request.setSocialId(socialId);
    try {
      int insertPrompt = plotMapper.insertPromptMST(request);
      if (insertPrompt == 1){
        plotMapper.insertPromptDTL(request);
      } else {
        throw new RuntimeException("Prompt 입력 실패");
      }

      PlotDTO plot = PlotDTO.builder().plotContent(response.getPlotContent()).promptSeq(request.getPromptSeq()).build();
      int insertPlot = plotMapper.insertPlotResult(plot);
      if(insertPlot != 1) {
        throw new RuntimeException("Plot 입력 실패");
      }
    } catch(Exception e) {
      throw new RuntimeException(e.getMessage());
    }
    PlotResponseDTO result = plotMapper.selectPlotByPromptSeq(request.getPromptSeq());
    result.setSocialId(socialId);
    return result;
  }

  @Override
  public List<PlotResponseDTO> searchPlot(PlotSearchParamDTO param){
    List<PlotResponseDTO> list = plotMapper.selectPlotBySearchParam(param);
    return list;
  }


  /* 수정사항: 메소드 분리 !!!! */
  @Transactional
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
  public String makeHtml(long promptSeq) {
    PlotResponseDTO plot = plotMapper.selectPlotByPromptSeq(promptSeq);
    String category = plot.getCategory();
    String genre = plot.getGenre();
    String timeframe = plot.getTimeframe();
    String theme = plot.getTheme();
    String event = plot.getEvent();
    String tellType = plot.getTellType();
    String custom = plot.getCustom();
    String title = plot.getTitle();
    String plotContent = plot.getPlotContent();
    String htmlString = makeHtmlUtil.makePlotHtml(category, genre, timeframe, theme, event, tellType, custom, title, plotContent);
    return htmlString;
  }

}

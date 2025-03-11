package org.ohap.plotmaker.board;

import java.util.List;
import java.util.Optional;

import org.ohap.plotmaker.common.ApiResponse;
import org.ohap.plotmaker.common.PagingInfo;
import org.ohap.plotmaker.mapper.BoardMapper;
import org.ohap.plotmaker.util.PageUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {
  
  private final BoardMapper boardMapper;

  private BoardPlotDTO settingIsLiked(BoardPlotDTO plot, String socialId){
    String promptSeq = plot.getPromptSeq() + "";
    if(boardMapper.selectIsLiked(socialId, promptSeq) == 0){
      plot.setLiked(false);
    } else {
      plot.setLiked(true);
    }
    return plot;
  }

  @Override
  public List<BoardPlotDTO> getBestList(BestListDTO request) {
    List<BoardPlotDTO> list = boardMapper.selectBestPlot(request);
    String socialId = request.getSocialId();
    for(BoardPlotDTO plot : list) {
      plot = settingIsLiked(plot, socialId);
    }
    return list;
    
  }

  @Transactional
  @Override
  public String toggleLikes(ToggleLikesDTO toggleLikesDTO){
    if(boardMapper.selectLikes(toggleLikesDTO) != 0){
      boardMapper.deleteLike(toggleLikesDTO);
      return "좋아요 취소";
    } else {
      boardMapper.insertLike(toggleLikesDTO);
      return "좋아요 등록";
    }
  }

  @Override
  public ApiResponse<List<BoardPlotDTO>> getBoardList(BoardListDTO request){
    int totalCount = boardMapper.selectBoardPlotCount(request);
    Optional<String> pageOpt = Optional.ofNullable(request.getPage());
    int page = Integer.parseInt(pageOpt.orElse("1"));
    PageUtil pageUtil = new PageUtil();
    pageUtil.setPageUtil(page, totalCount, 10);
    int totalPage = pageUtil.getTotalPage();
    int begin = pageUtil.getBegin();
    PagingInfo paging = PagingInfo.builder()
      .currentPage(page).size(10).totalCount(totalCount).totalPage(totalPage)
      .build();
    request.setBegin(begin);
    List<BoardPlotDTO> list = boardMapper.selectBoardPlotList(request);
    String socialId = request.getSocialId();
    for(BoardPlotDTO plot : list) {
      plot = settingIsLiked(plot, socialId);
    }
    ApiResponse<List<BoardPlotDTO>> response = ApiResponse.<List<BoardPlotDTO>>builder()
      .isSuccess(true).message("조회 성공").data(list).paging(paging).build();
    return response;
  }

  @Override
  public BoardPlotDTO getPlotDetail(String promptSeq, String socialId){
    BoardPlotDTO plot = boardMapper.selectBoardDetail(promptSeq);
    plot = settingIsLiked(plot, socialId);
    return plot;
  }

  // 수정사항: 실패 Exception 처리
  @Override
  public String increaseView(String promptSeq) {
    int update = boardMapper.increaseView(promptSeq);
    if(update == 0){
      return null;
    }
    return "조회수 증가 성공";
  }

  @Override
  public ApiResponse<List<BoardPlotDTO>> searchBoard(BoardSearchParamDTO param){
    int totalCount = boardMapper.selectBoardSearchCount(param);
    Optional<String> pageOpt = Optional.ofNullable(param.getPage());
    int page = Integer.parseInt(pageOpt.orElse("1"));
    PageUtil pageUtil = new PageUtil();
    pageUtil.setPageUtil(page, totalCount, 10);
    int totalPage = pageUtil.getTotalPage();
    int begin = pageUtil.getBegin();
    PagingInfo paging = PagingInfo.builder()
      .currentPage(page).size(10).totalCount(totalCount).totalPage(totalPage)
      .build();
    param.setBegin(begin);
    List<BoardPlotDTO> list = boardMapper.selectBoardPlotListwithParam(param);
    String socialId = param.getSocialId();
    for(BoardPlotDTO plot : list){
      plot = settingIsLiked(plot, socialId);
    }
    ApiResponse<List<BoardPlotDTO>> response = ApiResponse.<List<BoardPlotDTO>>builder()
      .isSuccess(true).message("조회 성공").data(list).paging(paging).build();
    return response;
  }

}
package org.ohap.plotmaker.board;

import java.util.List;

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

  @Override
  public List<BoardPlotDTO> getBestList(BestListDTO request) {
    List<BoardPlotDTO> list = boardMapper.selectBestPlot(request);
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
    int page = Integer.parseInt(request.getPage());
    PageUtil pageUtil = new PageUtil();
    pageUtil.setPageUtil(page, totalCount, 10);
    int totalPage = pageUtil.getTotalPage();
    int begin = pageUtil.getBegin();
    PagingInfo paging = PagingInfo.builder()
      .currentPage(page).size(10).totalCount(totalCount).totalPage(totalPage)
      .build();
    request.setBegin(begin);
    List<BoardPlotDTO> list = boardMapper.selectBoardPlotList(request);
    ApiResponse<List<BoardPlotDTO>> response = ApiResponse.<List<BoardPlotDTO>>builder()
      .isSuccess(true).message("조회 성공").data(list).paging(paging).build();
    return response;
  }

  @Override
  public BoardPlotDTO getPlotDetail(String promptSeq){
    return boardMapper.selectBoardDetail(promptSeq);
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

}

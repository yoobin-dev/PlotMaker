package org.ohap.plotmaker.board;

import java.util.List;

import org.ohap.plotmaker.common.ApiResponse;

public interface BoardService {

  public List<BoardPlotDTO> getBestList(BestListDTO request);
  public String toggleLikes(ToggleLikesDTO toggleLikesDTO);
  public ApiResponse<List<BoardPlotDTO>> getBoardList(BoardListDTO request);
<<<<<<< HEAD
  public BoardPlotDTO getPlotDetail(String promptSeq);
  public String increaseView(String promptSeq);
=======
  public BoardPlotDTO getPlotDetail(String promptSeq, String socialId);
  public String increaseView(String promptSeq);
  public ApiResponse<List<BoardPlotDTO>> searchBoard(BoardSearchParamDTO param);
>>>>>>> main
  
}

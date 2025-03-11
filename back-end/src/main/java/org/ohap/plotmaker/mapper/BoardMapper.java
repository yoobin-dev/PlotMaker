package org.ohap.plotmaker.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.ohap.plotmaker.board.BestListDTO;
import org.ohap.plotmaker.board.BoardListDTO;
import org.ohap.plotmaker.board.BoardPlotDTO;
import org.ohap.plotmaker.board.BoardSearchParamDTO;
import org.ohap.plotmaker.board.ToggleLikesDTO;

@Mapper
public interface BoardMapper {
  
  public List<BoardPlotDTO> selectBestPlot(BestListDTO request);
  public int selectLikes(ToggleLikesDTO request);
  public int deleteLike(ToggleLikesDTO request);
  public int insertLike(ToggleLikesDTO request);
  public List<BoardPlotDTO> selectBoardPlotList(BoardListDTO request);
  public int selectBoardPlotCount(BoardListDTO request);
  public BoardPlotDTO selectBoardDetail(String promptSeq);
  public int increaseView(String promptSeq);
  public int selectIsLiked(String socialId, String promptSeq);
  public List<BoardPlotDTO> selectBoardPlotListwithParam(BoardSearchParamDTO param);
  public int selectBoardSearchCount(BoardSearchParamDTO param);

}

package org.ohap.plotmaker.board;

import java.util.List;

import org.ohap.plotmaker.mapper.BoardMapper;
import org.ohap.plotmaker.plot.PlotResponseDTO;
import org.springframework.security.access.method.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {
  
  private final BoardMapper boardMapper;

  @Override
  public List<PlotResponseDTO> getBestList(BestListDTO request) {
    List<PlotResponseDTO> list = boardMapper.selectBestPlot(request);
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

}

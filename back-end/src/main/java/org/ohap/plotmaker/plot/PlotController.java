package org.ohap.plotmaker.plot;

import java.util.List;

import org.ohap.plotmaker.common.ApiResponse;
import org.ohap.plotmaker.mapper.PlotMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/plot")
@RequiredArgsConstructor
public class PlotController {

  private final PlotMapper plotMapper;
  
  @GetMapping("/{socialId}")
  public ResponseEntity<ApiResponse<List<PlotResponseDTO>>> getPlotListbySocialId(@PathVariable String socialId){
    List<PlotResponseDTO> list = plotMapper.selectPlotListBySocialId(socialId);
    ApiResponse<List<PlotResponseDTO>> response = ApiResponse.<List<PlotResponseDTO>>builder().isSuccess(true).data(list).build();
    return ResponseEntity.ok().body(response);
  }

}

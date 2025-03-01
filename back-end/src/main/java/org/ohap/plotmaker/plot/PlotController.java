package org.ohap.plotmaker.plot;

import java.util.List;
import java.util.Optional;

import org.ohap.plotmaker.common.ApiResponse;
import org.ohap.plotmaker.mapper.PlotMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/plot")
@RequiredArgsConstructor
public class PlotController {

  private final PlotMapper plotMapper;
  private final PlotService plotService;
  
  @GetMapping("/{socialId}")
  public ResponseEntity<ApiResponse<List<PlotResponseDTO>>> getPlotListbySocialId(@PathVariable String socialId,
    @RequestParam(required = false) String isPublic){
    String status = Optional.ofNullable(isPublic).orElse("all");
    List<PlotResponseDTO> list = plotMapper.selectPlotListBySocialId(socialId, status);
    ApiResponse<List<PlotResponseDTO>> response = ApiResponse.<List<PlotResponseDTO>>builder().isSuccess(true).data(list).build();
    return ResponseEntity.ok().body(response);
  }

  @PostMapping("/{socialId}")
  public ResponseEntity<ApiResponse<PlotResponseDTO>> makePlot(@PathVariable String socialId, @RequestBody PlotRequestDTO request){
    request.setSocialId(socialId);
    PlotResponseDTO plot = plotService.insertPrompt(request);
    ApiResponse<PlotResponseDTO> response = ApiResponse.<PlotResponseDTO>builder().isSuccess(true).data(plot).build();
    return ResponseEntity.ok().body(response);
  }

}

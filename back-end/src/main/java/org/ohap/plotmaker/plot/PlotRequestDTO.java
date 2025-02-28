package org.ohap.plotmaker.plot;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlotRequestDTO {

  private String socialId;
  private String promptSeq;
  
  private String typeCode;
  private String type;
  private String genreCode;
  private String genre;
  private String timeframeCode;
  private String timeframe;
  private String themeCode;
  private String theme;
  private String speech;
  private int characters;
  private String tellType;
  private String custom;
  private String title;
  
}

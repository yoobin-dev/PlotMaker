package org.ohap.plotmaker.plot;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlotResponseDTO {
  
  private long promptSeq;
  private String typeCode;
  private String type;
  private String genreCode;
  private String genre;
  private String timeframeCode;
  private String timeframe;
  private String themeCode;
  private String theme;
  private String event;
  private int characters;
  private String tellType;
  private String custom;
  private String title;
  private long plotSeq;
  private String plotContent;

  @Builder.Default private int view = 0;
  @Builder.Default private int like = 1;
  @Builder.Default private boolean isPublic = false;

}

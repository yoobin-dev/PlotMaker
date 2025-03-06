package org.ohap.plotmaker.plot;

import io.micrometer.common.lang.Nullable;
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
  private long promptSeq;
  
  @Nullable private String categoryCode;
  @Nullable private String category;
  @Nullable private String genreCode;
  @Nullable private String genre;
  @Nullable private String timeframeCode;
  @Nullable private String timeframe;
  @Nullable private String themeCode;
  @Nullable private String theme;
  @Nullable private String event;
  @Nullable private String tellType;
  @Nullable private String custom;
  private String title;
  private String isPublic;
  
}

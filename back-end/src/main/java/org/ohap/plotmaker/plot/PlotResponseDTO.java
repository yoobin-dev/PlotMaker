package org.ohap.plotmaker.plot;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

import io.micrometer.common.lang.Nullable;
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
  private String isPublic;
  private long plotSeq;
  private String plotContent;
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
  private Timestamp createAt;

  @Builder.Default private int view = 0;
  @Builder.Default private int like = 1;
  @Builder.Default private int comment = 3;

}

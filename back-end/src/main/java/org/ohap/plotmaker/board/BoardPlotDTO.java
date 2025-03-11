package org.ohap.plotmaker.board;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BoardPlotDTO {
  
  private String socialId;
  private String nickname;
  private long promptSeq;
  private String categoryCode;
  private String category;
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
  private int view;
  private int likes;
  private long plotSeq;
  private String plotContent;
<<<<<<< HEAD
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
=======
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
>>>>>>> main
  private Timestamp createAt;

  private int comment;

<<<<<<< HEAD
=======
  private boolean isLiked;
>>>>>>> main

}

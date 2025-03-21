package org.ohap.plotmaker.board;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BoardSearchParamDTO {
  
  private String socialId;
  private String categoryCode;
  private String title;
  private String page;
  private int begin;
  @Builder.Default
  private String size = "10";

}

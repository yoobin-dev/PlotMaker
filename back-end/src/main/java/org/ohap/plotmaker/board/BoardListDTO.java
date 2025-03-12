package org.ohap.plotmaker.board;

import io.micrometer.common.lang.Nullable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BoardListDTO {
  
  private String socialId;
  private String categoryCode;
  private String page;
  private int begin;
  @Builder.Default
  private String size = "10";

  @Nullable private String sortBy;
  @Nullable private String sortOrder;

}
package org.ohap.plotmaker.board;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BestListDTO {
  
  private String categoryCode;
  private String criteria;

}

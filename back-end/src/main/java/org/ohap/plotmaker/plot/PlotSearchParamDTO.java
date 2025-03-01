package org.ohap.plotmaker.plot;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlotSearchParamDTO {
  
  private String socialId;
  private String title;

}

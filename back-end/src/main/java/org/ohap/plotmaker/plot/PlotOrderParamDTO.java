package org.ohap.plotmaker.plot;

import io.micrometer.common.lang.Nullable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlotOrderParamDTO {
  
  private String socialId;
  @Nullable private String status;
  @Nullable private String isPublic;
  @Nullable private String sortBy;
  @Nullable private String sortOrder;

}

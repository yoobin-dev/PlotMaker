package org.ohap.plotmaker.code;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CodeDTO {
  
  private int codeSeq;
  private String codeType;
  private String code;
  private String codeName;

}

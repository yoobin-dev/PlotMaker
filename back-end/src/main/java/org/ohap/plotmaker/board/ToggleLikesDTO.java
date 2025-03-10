package org.ohap.plotmaker.board;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ToggleLikesDTO {
  
  private String socialId;
  private String promptSeq;

}

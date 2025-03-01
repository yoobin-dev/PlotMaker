package org.ohap.plotmaker.prompt;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PromptDTO {
  
  private long promptSeq;
  private String socialId;
  private String title;
  private String isPublic;

}

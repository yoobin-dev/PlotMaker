package org.ohap.plotmaker.plot;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SummaryResponseDTO {

  private Status status;
  private Result result;

  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  public static class Status {
      private String code;
      private String message;
  }

  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  public static class Result {
      private String text;
      private int inputTokens;
  }
  
}

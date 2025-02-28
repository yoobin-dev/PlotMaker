package org.ohap.plotmaker.plot;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor(force=true)
@AllArgsConstructor
@Builder
public class ClovaRequestDTO {
  
  private Map<String, String> headers;
  private List<Message> messages;

  /* 기본설정값 */
  @Builder.Default private double temperature = 1.0;
  @Builder.Default private int topK = 33;
  @Builder.Default private double topP = 0.57;
  @Builder.Default private double repeatPenalty = 5.3;
  @Builder.Default private List<String> stopBefore = new ArrayList<>();
  @Builder.Default private int maxToken = 4096;
  @Builder.Default private boolean includeAiFilter = false;

  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  public static class Message {
    private String role;
    private String content;
  }

}

package org.ohap.plotmaker.plot;

import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SummaryRequestDTO {
  
  private List<String> texts;
  @Builder.Default private boolean autoSentenceSplitter = true;
  @Builder.Default private int segCount = -1;
  @Builder.Default private int segMaxSize = 1000;
  @Builder.Default private int segMinSize = 300;
  @Builder.Default private boolean includeAiFilters = false;

  private Map<String, String> headers;

  public static SummaryRequestDTO createWithApiKey(String apiKey, List<String> texts) {
      return SummaryRequestDTO.builder()
              .headers(Map.of(
                      "Authorization", "Bearer " + apiKey,
                      "Content-Type", "application/json"
              ))
              .texts(texts)
              .build();
  }

}

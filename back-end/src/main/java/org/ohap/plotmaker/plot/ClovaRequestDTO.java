package org.ohap.plotmaker.plot;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClovaRequestDTO {

  private List<Message> messages;
  
  @Builder.Default private Map<String, String> headers = new HashMap<>();

  /* 기본설정값 */
  @Builder.Default private double temperature = 1.0;
  @Builder.Default private int topK = 33;
  @Builder.Default private double topP = 0.8;
  @Builder.Default private double repeatPenalty = 5.3;
  @Builder.Default private List<String> stopBefore = new ArrayList<>();
  @Builder.Default private int maxToken = 4096;
  @Builder.Default private boolean includeAiFilter = false;
  private long seed;

  public static ClovaRequestDTO createWithApiKey(String apiKey, List<Message> messages) {
    ClovaRequestDTO request = ClovaRequestDTO.builder()
            .headers(Map.of(
                "Authorization", "Bearer " + apiKey,
                "Content-Type", "application/json"
            ))
            .messages(messages)
            .seed(generateRandomSeed())
            .build();
    request.initDefaults();
    return request;
  }

    @PostConstruct
    public void initDefaults() {
        if (this.temperature == 0) this.temperature = 0.65;
        if (this.topK == 0) this.topK = 0;
        if (this.topP == 0) this.topP = 0.8;
        if (this.repeatPenalty == 0) this.repeatPenalty = 5;
        if (this.stopBefore == null) this.stopBefore = new ArrayList<>();
        if (this.maxToken == 0) this.maxToken = 4096;
        this.includeAiFilter = false;
    }

    private static long generateRandomSeed() {
      return new Random().nextLong(1, 4_294_967_296L);
    }


  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  @Builder
  public static class Message {
    private String role;
    private String content;
  }

}

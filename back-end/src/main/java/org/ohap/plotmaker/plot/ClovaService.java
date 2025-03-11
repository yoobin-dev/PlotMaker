package org.ohap.plotmaker.plot;

import java.util.ArrayList;
import java.util.List;

import org.ohap.plotmaker.plot.ClovaRequestDTO.Message;
import org.ohap.plotmaker.plot.SummaryResponseDTO.Result;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
public class ClovaService {

  @Value("${clova.apikey}") private String apiKey;
  private String apiUrl = "https://clovastudio.stream.ntruss.com/testapp/v1/chat-completions/HCX-003";
  private String summaryUrl = "https://clovastudio.stream.ntruss.com/testapp/v1/api-tools/summarization/v2";
  private final RestTemplate restTemplate = new RestTemplate();

  @SuppressWarnings("null")
  public String requestClova(Boolean isSynopsis, String messageContent){

    List<Message> messages = new ArrayList<>();
    Message input = Message.builder().role("system").content(messageContent).build();
    messages.add(input);

    ClovaRequestDTO request = ClovaRequestDTO.createWithApiKey(apiKey, messages);
    HttpHeaders headers = new HttpHeaders();
    headers.setAll(request.getHeaders());
    HttpEntity<ClovaRequestDTO> entity = new HttpEntity<>(request, headers);
    try {
      ResponseEntity<ClovaResponseDTO> response = restTemplate.exchange(
        apiUrl, HttpMethod.POST, entity, ClovaResponseDTO.class);
      
      Message resMessage = response.getBody().getResult().getMessage();
      StringBuilder sb = new StringBuilder();
      sb.append(resMessage.getContent());

      if(!isSynopsis){
        while(sb.length() < 1800){
          resMessage.setRole("assistant");
          messages.add(resMessage);
          messages.add(Message.builder().role("user").content("화수 표시나 제목없이 지금까지의 내용을 유지하면서 자연스럽게 이어지는 내용을 써줘.").build());
          request = ClovaRequestDTO.createWithApiKey(apiKey, messages);
          HttpEntity<ClovaRequestDTO> repeatEntity = new HttpEntity<>(request, headers);
          ResponseEntity<ClovaResponseDTO> repeatRes = restTemplate.exchange(
            apiUrl, HttpMethod.POST, repeatEntity, ClovaResponseDTO.class);
          resMessage = repeatRes.getBody().getResult().getMessage();
          sb.append(" " + repeatRes.getBody().getResult().getMessage().getContent());
        }
      }

      String plot = sb.toString();
      String plotContent = plot.substring(0, plot.lastIndexOf(".") + 1);
      return plotContent;
    } catch(Exception e){
      throw new RuntimeException("CLOVA STUDIO 요청실패");
    }
  }

  @SuppressWarnings("null")
  public String requestSummary(String plot){
    String result = null;
    List<String> texts = new ArrayList<>();
    texts.add(plot);
    SummaryRequestDTO request = SummaryRequestDTO.createWithApiKey(apiKey, texts);
    HttpHeaders headers = new HttpHeaders();
    headers.setAll(request.getHeaders());
    HttpEntity<SummaryRequestDTO> entity = new HttpEntity<>(request, headers);
    try {
      ResponseEntity<SummaryResponseDTO> response = restTemplate.exchange(
        summaryUrl, HttpMethod.POST, entity, SummaryResponseDTO.class);
      Result resultStr = response.getBody().getResult();
      result = resultStr.getText();
    } catch(Exception e){
      throw new RuntimeException(e.getMessage() + "요약 요청 실패");
    }
    return result;
  }

  @SuppressWarnings("null")
  public String requestClova2(String categoryCode, String messageContent){

    List<Message> messages = new ArrayList<>();
    StringBuilder sb = new StringBuilder();
    switch (categoryCode) {
      case "T000":
        sb.append("너는 줄거리를 작성하는 작가야.\n")
          .append("사용자가 입력하는 키워드에 따라 흥미로운 이야기의 줄거리를 생성해줘.\n")
          .append("분량은 도입부부터 결말까지 중간에서 끊지 않고 내용을 끝까지 완성해줘.");
        break;
      
      case "T001":
        sb.append("너는 소설을 작성하는 작가야.\n")
          .append("사용자가 입력하는 키워드에 따라 소설을 작성해줘.\n")
          .append("분량은 1화를 작성하고, 중간에서 끊지 않고 내용을 끝까지 완성해줘.");
        break;
      
      case "T002":
        sb.append("너는 대본을 작성하는 작가야.\n")
          .append("사용자가 입력하는 키워드에 따라 대본을 작성해줘.\n")
          .append("대본은 간략한 장면, 상황 설명과 대사로만 이루어져 있어.\n")
          .append("대사의 첫 시작은 '캐릭터명: '으로 시작해야 해.\n")
          .append("분량은 1화를 작성하고, 중간에서 끊지 않고 내용을 끝까지 완성해줘.");
        break;
      
      case "T003":
        sb.append("너는 시나리오를 작성하는 작가야.\n")
          .append("사용자가 입력하는 키워드에 따라 시나리오를 작성해줘.\n")
          .append("분량은 1화를 작성하고, 중간에서 끊지 않고 내용을 끝까지 완성해줘.");
        break;
    }
    sb.append("사용자가 입력하는 키워드가 비어있을 경우, 임의로 키워드를 설정해서 반영하면 돼.\n")
      .append("사용자가 입력할 키워드 분류는 장르, 배경, 테마, 사건, 너의 성격, 고유설정이야.\n")
      .append("제목은 기재하지 말고, 생성한 내용만 반환해줘.\n");

    String systemMsg = sb.toString();

    Message system = Message.builder().role("system").content(systemMsg).build();
    messages.add(system);
    Message user = Message.builder().role("user").content(messageContent).build();
    messages.add(user);

    ClovaRequestDTO request = ClovaRequestDTO.createWithApiKey(apiKey, messages);
    HttpHeaders headers = new HttpHeaders();
    headers.setAll(request.getHeaders());
    HttpEntity<ClovaRequestDTO> entity = new HttpEntity<>(request, headers);
    try {
      ResponseEntity<ClovaResponseDTO> response = restTemplate.exchange(
        apiUrl, HttpMethod.POST, entity, ClovaResponseDTO.class);
      
      Message resMessage = response.getBody().getResult().getMessage();
      String message = resMessage.getContent();
      StringBuilder sb2 = new StringBuilder();
      sb2.append(message);

      if(!categoryCode.equals("T000")){
        while(sb2.length() < 1800){
          resMessage.setRole("assistant");
          messages.add(resMessage);
          messages.add(Message.builder().role("user").content("화수 표시나 제목없이 지금까지의 내용을 유지하면서 자연스럽게 이어지는 내용을 써줘.").build());
          request = ClovaRequestDTO.createWithApiKey(apiKey, messages);
          HttpEntity<ClovaRequestDTO> repeatEntity = new HttpEntity<>(request, headers);
          ResponseEntity<ClovaResponseDTO> repeatRes = restTemplate.exchange(
            apiUrl, HttpMethod.POST, repeatEntity, ClovaResponseDTO.class);
          resMessage = repeatRes.getBody().getResult().getMessage();
          sb2.append(" " + repeatRes.getBody().getResult().getMessage().getContent());
        }
      }

      String plot = sb2.toString();
      String plotContent = plot.substring(0, plot.lastIndexOf(".") + 1);
      return plotContent;
    } catch(Exception e){
      throw new RuntimeException("CLOVA STUDIO 요청실패");
    }
  }

}

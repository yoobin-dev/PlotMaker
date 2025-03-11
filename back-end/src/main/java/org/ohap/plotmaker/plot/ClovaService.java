package org.ohap.plotmaker.plot;

import java.util.ArrayList;
import java.util.List;

import org.ohap.plotmaker.plot.ClovaRequestDTO.Message;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
public class ClovaService {

  @Value("${clova.apikey}") private String apiKey;
  private String apiUrl = "https://clovastudio.stream.ntruss.com/testapp/v1/chat-completions/HCX-003";
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
  public String requestClova2(String categoryCode, String messageContent){

    List<Message> messages = new ArrayList<>();
    String systemMsg = null;
    switch (categoryCode) {
      case "T000":
        systemMsg = "";
        break;
      
      case "T001":
        systemMsg = "";
        break;
      
      case "T002":
        systemMsg = "";
        break;
    }

    Message system = Message.builder().role("system").content(systemMsg).build();
    messages.add(system);
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

      if(!categoryCode.equals("T000")){
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

}

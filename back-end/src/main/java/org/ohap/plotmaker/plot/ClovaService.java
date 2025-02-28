package org.ohap.plotmaker.plot;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class ClovaService {
  
  @Value("${clova.apikey}") private String clovaApi;

  public String requestClova(String messageContent){
    
    return null;
  }

}

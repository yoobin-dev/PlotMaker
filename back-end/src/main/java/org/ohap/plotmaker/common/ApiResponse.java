package org.ohap.plotmaker.common;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ApiResponse<T> {
  
  private boolean isSuccess;
  private String message;
  private T data;
  private PagingInfo paging;

  @Builder.Default
  private LocalDateTime timestamp = LocalDateTime.now();

}

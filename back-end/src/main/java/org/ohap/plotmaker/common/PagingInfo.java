package org.ohap.plotmaker.common;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PagingInfo {
  
  private int currentPage;
  private int size;
  private int totalCount;
  private int totalPage;

}

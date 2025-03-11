package org.ohap.plotmaker.util;

import org.springframework.stereotype.Component;

import lombok.Getter;

@Getter
@Component
public class PageUtil {
  
  private int page;
	private int totalCount;
	private int size = 10;
	private int begin;
	private int pagePerBlock = 10;
	private int totalPage;
	private int beginPage;
	private int endPage;
	
	public void setPageUtil(int page, int totalCount, int size) {
		
		this.page = page;
		this.totalCount = totalCount;
		this.size = size;
		
		begin = (page - 1) * size;
		
		totalPage = totalCount / size;
		if(totalCount % size != 0) {
			totalPage ++;
		}
		
		beginPage = ((page - 1) / pagePerBlock) * pagePerBlock + 1;
		endPage = beginPage + pagePerBlock - 1;
		if(endPage > totalPage) endPage = totalPage;
		
	}

}

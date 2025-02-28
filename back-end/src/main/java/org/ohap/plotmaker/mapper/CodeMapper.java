package org.ohap.plotmaker.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.ohap.plotmaker.code.CodeDTO;

@Mapper
public interface CodeMapper {
  
  public List<CodeDTO> selectCodeList();
  public String selectCodeNameByCode(String code);

}

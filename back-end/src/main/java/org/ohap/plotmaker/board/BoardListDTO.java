package org.ohap.plotmaker.board;

<<<<<<< HEAD
=======
import io.micrometer.common.lang.Nullable;
>>>>>>> main
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BoardListDTO {
  
<<<<<<< HEAD
=======
  private String socialId;
>>>>>>> main
  private String categoryCode;
  private String page;
  private int begin;
  @Builder.Default
  private String size = "10";

<<<<<<< HEAD
=======
  @Nullable private String sortBy;
  @Nullable private String sortOrder;

>>>>>>> main
}

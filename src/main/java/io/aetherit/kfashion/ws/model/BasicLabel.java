package io.aetherit.kfashion.ws.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BasicLabel {

   private int color;
   private int colorCategoryNo;
   private int sleeveLength;
   private int sleeveLengthCategoryNo;
   private Long workNo;
   private int workStep;
   private String createdId;

}

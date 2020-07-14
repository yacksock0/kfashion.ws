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
   private int color1;
   private int color2;
   private int color3;
   private int colorCategoryNo;

   private int subColor;
   private int subColor1;
   private int subColor2;
   private int subColor3;

   private int sleeveLength;
   private int sleeveLength1;
   private int sleeveLength2;
   private int sleeveLength3;

   private int sleeveLengthCategoryNo;

   private Long workNo;
   private int workStep;
   private int labelNo;
   private int no;
   private String createdId;

}

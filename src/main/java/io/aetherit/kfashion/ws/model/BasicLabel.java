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



   private int color1;
   private int color2;
   private int color3;
   private int color4;
   private int colorCategoryNo1;
   private int colorCategoryNo2;
   private int colorCategoryNo3;
   private int colorCategoryNo4;

   private int subColor1;
   private int subColor2;
   private int subColor3;
   private int subColor4;
   private int subColorCategoryNo1;
   private int subColorCategoryNo2;
   private int subColorCategoryNo3;
   private int subColorCategoryNo4;


   private int sleeveLength1;
   private int sleeveLength2;
   private int sleeveLength4;
   private int sleeveLengthCategoryNo1;
   private int sleeveLengthCategoryNo2;
   private int sleeveLengthCategoryNo4;

   private Long workNo;
   private int workStep;
   private int labelNo1;
   private int labelNo2;
   private int labelNo3;
   private int labelNo4;
   private int no;
   private String createdId;

}

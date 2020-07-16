package io.aetherit.kfashion.ws.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HighReviewLabel {

    private String colorItemName;
    private String colorSubItemName;
    private String sleeveLengthItemName;
    private int color1;
    private int color2;
    private int color3;
    private int color4;
    private int colorCategoryNo;

    private int subColor1;
    private int subColor2;
    private int subColor3;
    private int subColor4;

    private int sleeveLength1;
    private int sleeveLength2;
    private int sleeveLength3;
    private int sleeveLength4;

    private int sleeveLengthCategoryNo;
}

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

    private String colorItemName1;
    private String colorItemName2;
    private String colorItemName3;
    private String colorItemName4;

    private String colorItemMemo1;
    private String colorItemMemo2;
    private String colorItemMemo3;
    private String colorItemMemo4;


    private String subColorItemName1;
    private String subColorItemName2;
    private String subColorItemName3;
    private String subColorItemName4;

    private String subColorItemMemo1;
    private String subColorItemMemo2;
    private String subColorItemMemo3;
    private String subColorItemMemo4;

    private String sleeveLengthItemName1;
    private String sleeveLengthItemName2;
    private String sleeveLengthItemName3;
    private String sleeveLengthItemName4;

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
    private int sleeveLength3;
    private int sleeveLength4;

    private int sleeveLengthCategoryNo1;
    private int sleeveLengthCategoryNo2;
    private int sleeveLengthCategoryNo3;
    private int sleeveLengthCategoryNo4;
}

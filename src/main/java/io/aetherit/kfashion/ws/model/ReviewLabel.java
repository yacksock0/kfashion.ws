package io.aetherit.kfashion.ws.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewLabel {
//
//    private String colorName;
//    private String colorSubName;
//    private String colorItemName;
//    private String colorSubItemName;
//
//    private String sleeveLengthName;
//    private String sleeveLengthItemName;

//    private String styleName;
//    private String styleSubName;
//    private String categoryName;
//    private String detailName;
//    private String printName;
//    private String textureName;
//    private String clothLengthName;
//    private String neckLineName;
//    private String karaName;
//    private String fitName;
    private int labelNo1;
    private int labelNo2;
    private int labelNo3;
    private int labelNo4;
    private int labelNo5;

    private int style;
    private int styleCategoryNo;
    private int styleSub;
    private int styleCategorySubNo;
    private int category1;
    private int category2;
    private int category3;
    private int category4;
    private int categoryCategoryNo1;
    private int categoryCategoryNo2;
    private int categoryCategoryNo3;
    private int categoryCategoryNo4;
    private List<Integer> detail1;
    private List<Integer> detail2;
    private List<Integer> detail3;
    private List<Integer> detail4;
    private List<Integer> detailCategoryNo1;
    private List<Integer> detailCategoryNo2;
    private List<Integer> detailCategoryNo3;
    private List<Integer> detailCategoryNo4;
    private int print1;
    private int print2;
    private int print3;
    private int print4;
    private int printCategoryNo1;
    private int printCategoryNo2;
    private int printCategoryNo3;
    private int printCategoryNo4;
    private int texture1;
    private int texture2;
    private int texture3;
    private int texture4;
    private int textureCategoryNo1;
    private int textureCategoryNo2;
    private int textureCategoryNo3;
    private int textureCategoryNo4;
    private int clothLength1;
    private int clothLength2;
    private int clothLength3;
    private int clothLength4;
    private int clothLengthCategoryNo1;
    private int clothLengthCategoryNo2;
    private int clothLengthCategoryNo3;
    private int clothLengthCategoryNo4;
    private int neckLine1;
    private int neckLine2;
    private int neckLine4;
    private int neckLineCategoryNo1;
    private int neckLineCategoryNo2;
    private int neckLineCategoryNo4;
    private int kara1;
    private int kara2;
    private int kara4;
    private int karaCategoryNo1;
    private int karaCategoryNo2;
    private int karaCategoryNo4;
    private int fit1;
    private int fit2;
    private int fit3;
    private int fit4;
    private int fitCategoryNo1;
    private int fitCategoryNo2;
    private int fitCategoryNo3;
    private int fitCategoryNo4;

    private String styleItemName;
    private String styleSubItemName;
    private String categoryItemName1;
    private String categoryItemName2;
    private String categoryItemName3;
    private String categoryItemName4;
    private List<String> detailItemName1;
    private List<String> detailItemName2;
    private List<String> detailItemName3;
    private List<String> detailItemName4;
    private String printItemName1;
    private String printItemName2;
    private String printItemName3;
    private String printItemName4;
    private String textureItemName1;
    private String textureItemName2;
    private String textureItemName3;
    private String textureItemName4;
    private String clothLengthItemName1;
    private String clothLengthItemName2;
    private String clothLengthItemName3;
    private String clothLengthItemName4;
    private String neckLineItemName1;
    private String neckLineItemName2;
    private String neckLineItemName4;
    private String karaItemName1;
    private String karaItemName2;
    private String karaItemName4;
    private String fitItemName1;
    private String fitItemName2;
    private String fitItemName3;
    private String fitItemName4;
}

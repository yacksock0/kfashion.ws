package io.aetherit.kfashion.ws.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    private int style;
    private int styleCategoryNo;
    private int styleSub;
    private int styleCategorySubNo;
    private int category1;
    private int category2;
    private int category3;
    private int category4;
    private int categoryCategoryNo;
    private int detail1;
    private int detail2;
    private int detail3;
    private int detail4;
    private int detailCategoryNo;
    private int print1;
    private int print2;
    private int print3;
    private int print4;
    private int printCategoryNo;
    private int texture1;
    private int texture2;
    private int texture3;
    private int texture4;
    private int textureCategoryNo;
    private int clothLength1;
    private int clothLength2;
    private int clothLength3;
    private int clothLength4;
    private int clothLengthCategoryNo;
    private int neckLine1;
    private int neckLine2;
    private int neckLine3;
    private int neckLine4;
    private int neckLineCategoryNo;
    private int kara1;
    private int kara2;
    private int kara3;
    private int kara4;
    private int karaCategoryNo;
    private int fit1;
    private int fit2;
    private int fit3;
    private int fit4;
    private int fitCategoryNo;

    private String styleItemName;
    private String styleSubItemName;
    private String categoryItemName;
    private String detailItemName;
    private String printItemName;
    private String textureItemName;
    private String clothLengthItemName;
    private String neckLineItemName;
    private String karaItemName;
    private String fitItemName;

}

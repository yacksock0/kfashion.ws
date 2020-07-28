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
public class ProfessionalLabel {

    private Long workNo;
    private int workStep;
    private String createdId;
    private int labelNo5;
    private int labelNo1;
    private int labelNo2;
    private int labelNo3;
    private int labelNo4;
    private int no;
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
    private List<Integer> print1;
    private List<Integer> print2;
    private List<Integer> print3;
    private List<Integer> print4;
    private List<Integer> printCategoryNo1;
    private List<Integer> printCategoryNo2;
    private List<Integer> printCategoryNo3;
    private List<Integer> printCategoryNo4;
    private List<Integer> texture1;
    private List<Integer> texture2;
    private List<Integer> texture3;
    private List<Integer> texture4;
    private List<Integer> textureCategoryNo1;
    private List<Integer> textureCategoryNo2;
    private List<Integer> textureCategoryNo3;
    private List<Integer> textureCategoryNo4;
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

}

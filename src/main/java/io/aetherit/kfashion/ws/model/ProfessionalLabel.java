package io.aetherit.kfashion.ws.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfessionalLabel {

    private Long workNo;
    private int workStep;
    private String createdId;
    private int style;
    private int styleCategoryNo;
    private int styleSub;
    private int styleCategorySubNo;
    private int category;
    private int categoryCategoryNo;
    private int detail;
    private int detailCategoryNo;
    private int print;
    private int printCategoryNo;
    private int texture;
    private int textureCategoryNo;
    private int clothLength;
    private int clothLengthCategoryNo;
    private int neckLine;
    private int neckLineCategoryNo;
    private int kara;
    private int karaCategoryNo;
    private int fit;
    private int fitCategoryNo;
    private int safe;
    private int safeCategoryNo;
    private int silhouette;
    private int silhouetteCategoryNo;

}

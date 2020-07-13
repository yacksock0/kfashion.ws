package io.aetherit.kfashion.ws.repository.mapper;

import io.aetherit.kfashion.ws.model.KfashionCategoryItem;
import java.util.List;

public interface KfashionCategoryItemMapper {
    List<KfashionCategoryItem> selectColorList();

    List<KfashionCategoryItem> selectSleeveLengthList();

    List<KfashionCategoryItem> selectStyleList();

    List<KfashionCategoryItem> selectCategoryList0();
    List<KfashionCategoryItem> selectCategoryList1();
    List<KfashionCategoryItem> selectCategoryList2();
    List<KfashionCategoryItem> selectCategoryList3();

    List<KfashionCategoryItem> selectDetailList();

    List<KfashionCategoryItem> selectPrintList();

    List<KfashionCategoryItem> selectTextureList();

    List<KfashionCategoryItem> selectLengthList0();
    List<KfashionCategoryItem> selectLengthList1();
    List<KfashionCategoryItem> selectLengthList2();
    List<KfashionCategoryItem> selectLengthList3();

    List<KfashionCategoryItem> selectNeckLineList();

    List<KfashionCategoryItem> selectKaraList();

    List<KfashionCategoryItem> selectFitList();

    List<KfashionCategoryItem> selectSafeList();

    List<KfashionCategoryItem> selectSilhouetteList();
}

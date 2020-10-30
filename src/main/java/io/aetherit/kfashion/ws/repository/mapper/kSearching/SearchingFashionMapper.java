package io.aetherit.kfashion.ws.repository.mapper.kSearching;

import io.aetherit.kfashion.ws.model.kSearching.SearchingCategory;
import io.aetherit.kfashion.ws.model.kSearching.SearchingStyle;

import java.util.List;

public interface SearchingFashionMapper {

    List<SearchingStyle> selectStyleList();

    List<SearchingStyle> selectColorList(int categoryType, int categoryNo);

    List<SearchingCategory> selectCategoryList();

    int selectCategoryNo(int categoryType);

    Long[] selectWorkNo(int styleType);

}

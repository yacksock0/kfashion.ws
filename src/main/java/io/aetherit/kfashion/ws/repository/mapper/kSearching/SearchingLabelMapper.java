package io.aetherit.kfashion.ws.repository.mapper.kSearching;

import io.aetherit.kfashion.ws.model.kSearching.SearchingCategory;
import io.aetherit.kfashion.ws.model.kSearching.SearchingLabel;
import io.aetherit.kfashion.ws.model.kSearching.SearchingStyle;

import java.util.List;

public interface SearchingLabelMapper {

    List<SearchingLabel> selectLabelList(int styleType);

    List<SearchingLabel> selectLabelListByWorkNo(List<Long> workNoList);

    List<SearchingLabel> selectLabelListBySearchInfo(int style, int category, int color);

}

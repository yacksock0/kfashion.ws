package io.aetherit.kfashion.ws.repository.kSearching;

import io.aetherit.kfashion.ws.model.kSearching.SearchingCategory;
import io.aetherit.kfashion.ws.model.kSearching.SearchingLabel;
import io.aetherit.kfashion.ws.model.kSearching.SearchingStyle;
import io.aetherit.kfashion.ws.repository.mapper.kSearching.SearchingFashionMapper;
import io.aetherit.kfashion.ws.repository.mapper.kSearching.SearchingLabelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SearchingLabelRepository {

    Logger logger = LoggerFactory.getLogger(SearchingLabelRepository.class);

    private SearchingLabelMapper mapper;

    @Autowired
    public SearchingLabelRepository(SearchingLabelMapper mapper) {
        this.mapper = mapper;
    }

    public List<SearchingLabel> selectLabelList(int styleType) {
        return mapper.selectLabelList(styleType);
    }

    public List<SearchingLabel> selectLabelListByWorkNo(List<Long> workNoList) {
        return mapper.selectLabelListByWorkNo(workNoList);
    }

    public List<SearchingLabel> selectLabelListBySearchInfo(int style, int category, int color) {
        return mapper.selectLabelListBySearchInfo(style, category, color);
    }
}

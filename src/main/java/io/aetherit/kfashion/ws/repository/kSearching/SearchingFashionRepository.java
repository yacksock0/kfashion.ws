package io.aetherit.kfashion.ws.repository.kSearching;

import io.aetherit.kfashion.ws.model.kSearching.SearchingCategory;
import io.aetherit.kfashion.ws.model.kSearching.SearchingStyle;
import io.aetherit.kfashion.ws.repository.mapper.kSearching.SearchingFashionMapper;
import io.aetherit.kfashion.ws.service.kSearching.SearchingFashionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SearchingFashionRepository {

    Logger logger = LoggerFactory.getLogger(SearchingFashionRepository.class);

    private SearchingFashionMapper mapper;

    @Autowired
    public SearchingFashionRepository(SearchingFashionMapper mapper) {
        this.mapper = mapper;
    }

    public List<SearchingStyle> selectStyleList() {
        return mapper.selectStyleList();
    }

    public List<SearchingStyle> selectColorList(int categoryType, int categoryNo) { return mapper.selectColorList(categoryType, categoryNo); }

    public List<SearchingCategory> selectCategoryList() { return mapper.selectCategoryList(); }

    public int selectCategoryNo(int categoryType) {
        return mapper.selectCategoryNo(categoryType);
    }

}

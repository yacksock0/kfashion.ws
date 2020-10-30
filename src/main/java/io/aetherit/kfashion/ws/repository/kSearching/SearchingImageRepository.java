package io.aetherit.kfashion.ws.repository.kSearching;

import io.aetherit.kfashion.ws.model.kSearching.SearchingImage;
import io.aetherit.kfashion.ws.model.kSearching.SearchingLabel;
import io.aetherit.kfashion.ws.repository.mapper.kSearching.SearchingImageMapper;
import io.aetherit.kfashion.ws.repository.mapper.kSearching.SearchingLabelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SearchingImageRepository {

    Logger logger = LoggerFactory.getLogger(SearchingImageRepository.class);

    private SearchingImageMapper mapper;

    @Autowired
    public SearchingImageRepository(SearchingImageMapper mapper) {
        this.mapper = mapper;
    }

    public List<SearchingImage> selectImageList(int style, int category, int color, int startPage, int endPage, int rowsPerPage) {
        return mapper.selectImageList(style, category, color, startPage, endPage, rowsPerPage);
    }

    public Long selectImageListTotalCount(int style, int category, int color) {
        return mapper.selectImageListTotalCount(style, category, color);
    }
}

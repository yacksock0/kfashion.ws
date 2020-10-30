package io.aetherit.kfashion.ws.service.kSearching;

import io.aetherit.kfashion.ws.model.kSearching.SearchingImage;
import io.aetherit.kfashion.ws.model.kSearching.SearchingLabel;
import io.aetherit.kfashion.ws.repository.kSearching.SearchingImageRepository;
import io.aetherit.kfashion.ws.repository.kSearching.SearchingLabelRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class SearchingImageService {
    Logger logger = LoggerFactory.getLogger(SearchingImageService.class);

    private SearchingImageRepository repository;

    @Autowired
    public SearchingImageService(SearchingImageRepository repository) {
        this.repository = repository;
    }

    public List<SearchingImage>  selectSearchingImageList(int style, int category, int color, int startPage, int endPage, int rowsPerPage) throws Exception {
        logger.trace(" selectSearchingImageList Params style {} ", style);

        logger.trace(" selectSearchingImageList Params category {} ", category);

        logger.trace(" selectSearchingImageList Params color {} ", color);

        logger.trace(" selectSearchingImageList Params startPage {} ", startPage);

        logger.trace(" selectSearchingImageList Params endPage {} ", endPage);

        logger.trace(" selectSearchingImageList Params rowsPerPage {} ", rowsPerPage);
//        List<Long> checkWorkNo = new ArrayList<>();
          List<SearchingImage> searchingImageList = new ArrayList<>();
//        for(SearchingLabel searchingLabel : labelList) {
//            checkWorkNo.add(searchingLabel.getWorkNo());
//        }
//        logger.debug( " selectSearchingImageList checkWorkNo {} ", checkWorkNo);
        try {
            searchingImageList = repository.selectImageList(style, category, color, startPage, endPage, rowsPerPage);
        } catch (Exception e) {
            logger.error(" selectSearchingImageList Error {} ", e);
            e.printStackTrace();
            throw new Exception(e);
        }

        logger.debug( " selectSearchingImageList searchingImageList {} ", searchingImageList);

        return searchingImageList;
    }

    public Long selectImageListTotalCount(int style, int category, int color) {
        return repository.selectImageListTotalCount(style, category, color);
    }

}

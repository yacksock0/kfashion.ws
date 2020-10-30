package io.aetherit.kfashion.ws.service.kSearching;

import io.aetherit.kfashion.ws.controller.kSearching.SearchingFashionController;
import io.aetherit.kfashion.ws.model.kSearching.SearchingCategory;
import io.aetherit.kfashion.ws.model.kSearching.SearchingImage;
import io.aetherit.kfashion.ws.model.kSearching.SearchingLabel;
import io.aetherit.kfashion.ws.model.kSearching.SearchingStyle;
import io.aetherit.kfashion.ws.repository.kSearching.SearchingFashionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class SearchingFashionService {
    Logger logger = LoggerFactory.getLogger(SearchingFashionService.class);

    private SearchingLabelService labelService;
    private SearchingImageService imageService;
    private SearchingFashionRepository repository;


    @Autowired
    public SearchingFashionService(SearchingFashionRepository repository,
                                   SearchingLabelService labelService,
                                   SearchingImageService imageService) {
        this.labelService = labelService;
        this.imageService = imageService;
        this.repository = repository;
    }

    public List<SearchingStyle> selectStyleList() throws Exception {
        List<SearchingStyle> styleList = new ArrayList<SearchingStyle>();
        try {
            styleList = repository.selectStyleList();
            return styleList;
        } catch(Exception e) {
            logger.error(" selectStyleList Error {} ", e);
            e.printStackTrace();
            throw new Exception(e);
        }
    }

    public List<SearchingStyle> selectColorList(int categoryType, int categoryNo) throws Exception {
        List<SearchingStyle> colorList = new ArrayList<>();
        try {
            colorList = repository.selectColorList(categoryType, categoryNo);
            return colorList;
        } catch(Exception e) {
            logger.error(" selectColorList Error {} ", e);
            e.printStackTrace();
            throw new Exception(e);
        }
    }

    public List<SearchingCategory> selectCategoryList() throws Exception {
        List<SearchingCategory> categoryList = new ArrayList<>();
        try {
            categoryList = repository.selectCategoryList();
            return categoryList;
        } catch(Exception e) {
            logger.error(" selectCategoryList Error {} ", e);
            e.printStackTrace();
            throw new Exception(e);
        }
    }

    public int selectCategoryNo(int categoryType) throws Exception {
        return repository.selectCategoryNo(categoryType);
    }

    public List<SearchingImage> selectImageList(int styleType, int categoryType, int colorType, int pageNum, int rowsPerPage) throws Exception {

        logger.trace(" getTagSearchResult Params styleType {} ", styleType);

        logger.trace(" getTagSearchResult Params categoryType {} ", categoryType);

        logger.trace(" getTagSearchResult Params colorType {} ", colorType);

        logger.trace(" getTagSearchResult Params pageNum {} ", pageNum);

        logger.trace(" getTagSearchResult Params rowsPerPage {} ", rowsPerPage);

        List<SearchingImage> imageList = new ArrayList<>();
        List<Long> workNoList = new ArrayList<>();
        List<SearchingLabel> labelList = new ArrayList<>();

//        try {
//            labelList = labelService.selectLabelList(styleType);
//            logger.debug( " getTagSearchResult labelList {} ", labelList);
//            for(SearchingLabel searchingLabel : labelList) {
//                workNoList.add(searchingLabel.getWorkNo());
//            }
//            logger.debug( " getTagSearchResult workNoList {} ", workNoList);
//        } catch (Exception e) {
//            logger.error(" getLabelList Error {} ", e);
//            e.printStackTrace();
//            throw new Exception(e);
//        }
//
//        try {
//            labelList = labelService.selectLabelListByWorkNo(workNoList);
//            logger.debug( " selectLabelList(workNoList) labelList {} ", labelList);
//        } catch(Exception e) {
//            logger.error(" selectLabelList(workNoList) Error {} ", e);
//            e.printStackTrace();
//            throw new Exception(e);
//        }
//
//        logger.trace( " finish filterByWorkNo labelList {} ", labelList);
//
//
//        if(categoryType != 0) {
//            try {
//                labelList = labelService.filterLabelListByCategory(labelList, categoryType);
//                logger.debug( " getTagSearchResult filterLabelListByCategory {} ", labelList);
//            } catch (Exception e) {
//                logger.error(" filterLabelListByCategory Error {} ", e);
//                e.printStackTrace();
//                throw new Exception(e);
//            }
//        }
//
//        logger.trace( " finish filterByCategory labelList {} ", labelList);
//
//        if(colorType != 0) {
//            try {
//                labelList = labelService.filterLabelListByColor(labelList, colorType);
//                logger.debug( " getTagSearchResult filterLabelListByCategory {} ", labelList);
//            } catch (Exception e) {
//                logger.error(" filterLabelListByColor Error {} ", e);
//                e.printStackTrace();
//                throw new Exception(e);
//            }
//        }
//
//        try {
//            labelList = labelService.selectLabelListBySearchInfo(styleType, categoryType, colorType);
//        } catch (Exception e) {
//            logger.error(" labelService.selectLabelListBySearchInfo Error {} ", e);
//            e.printStackTrace();
//            throw new Exception(e);
//        }
//

        //logger.trace( " finish filterByColor labelList {} ", labelList);
        int startPage = pageNum * rowsPerPage;
        int endPage = (pageNum * rowsPerPage)+rowsPerPage;
            try {
                imageList = imageService.selectSearchingImageList(styleType, categoryType, colorType, startPage, endPage, rowsPerPage);
            } catch (Exception e) {
                logger.error(" selectSearchingImageList Error {} ", e);
                e.printStackTrace();
                throw new Exception(e);
            }

            logger.debug( " selectImageList imageList {} ", imageList);

            return imageList;
        }

        public Long selectTagSearchResultTotalCount(int style, int category, int color) throws Exception {
            Long totalCount = null;
            try {
                    totalCount = imageService.selectImageListTotalCount(style, category, color);

            }catch (Exception e) {
                logger.error(" selectTagSearchResultTotalCount Error {} ", e);
                e.printStackTrace();
                throw new Exception(e);
            }

            logger.debug( " selectTagSearchResultTotalCount totalCount {} ", totalCount);


            return totalCount;
        }


}

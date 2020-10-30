package io.aetherit.kfashion.ws.service.kSearching;

import io.aetherit.kfashion.ws.model.kSearching.SearchingCategory;
import io.aetherit.kfashion.ws.model.kSearching.SearchingImage;
import io.aetherit.kfashion.ws.model.kSearching.SearchingLabel;
import io.aetherit.kfashion.ws.model.kSearching.SearchingStyle;
import io.aetherit.kfashion.ws.repository.kSearching.SearchingFashionRepository;
import io.aetherit.kfashion.ws.repository.kSearching.SearchingLabelRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class SearchingLabelService {
    Logger logger = LoggerFactory.getLogger(SearchingLabelService.class);

    //private SearchingFashionRepository repository;
    private SearchingLabelRepository repository;

    @Autowired
    public SearchingLabelService(SearchingLabelRepository repository) {
        this.repository = repository;
    }

    public List<SearchingLabel> selectLabelWorkNoList(int styleType) throws Exception {
        logger.trace(" selectLabelList styleType {} ", styleType);

        return repository.selectLabelList(styleType);
    }

    public List<SearchingLabel> selectLabelListByWorkNo(List<Long> workNoList) throws Exception {
        logger.trace(" selectLabelList styleType {} ", workNoList);

        return repository.selectLabelListByWorkNo(workNoList);
    }

    public List<SearchingLabel> filterLabelListByCategory(List<SearchingLabel> labelList,  int categoryType) throws Exception {
        logger.trace("filterLabelListByCategory categoryType {} ", categoryType);
        List<SearchingLabel> filterList = new ArrayList<>();
        for(SearchingLabel searchingLabel : labelList) {
            logger.debug("filterLabelListByCategory searchingLabel {} ", searchingLabel);
            if(categoryType == 0) {
                filterList = labelList;
            } else if (searchingLabel.getLabelNo() == categoryType) {
                filterList.add(searchingLabel);
            }
        }
        logger.debug("filterLabelListByCategory filterList {} ", filterList);
//        if(filterList.size() == 0) {
//            return labelList;
//        } else {
//            return filterList;
//        }
        return filterList;

    }

    public List<SearchingLabel> filterLabelListByColor(List<SearchingLabel> labelList,  int colorType) throws Exception {
        List<SearchingLabel> filterList = new ArrayList<>();
        for(SearchingLabel searchingLabel : labelList) {
            logger.debug("filterLabelListByColor {} ", searchingLabel);
            if(colorType == 0) {
                filterList = labelList;
            } else if (searchingLabel.getLabelNo() == colorType) {
                filterList.add(searchingLabel);
            }
        }
//        if(filterList.size() == 0) {
//            return labelList;
//        } else {
//            return filterList;
//        }
        return filterList;
    }

    public List<SearchingLabel> selectLabelListBySearchInfo(int styleType, int categoryType, int colorType) throws Exception {
        logger.trace(" getTagSearchResult Params styleType {} ", styleType);

        logger.trace(" getTagSearchResult Params categoryType {} ", categoryType);

        logger.trace(" getTagSearchResult Params colorType {} ", colorType);

        List<SearchingLabel> filterList = new ArrayList<>();
        try {
            filterList = repository.selectLabelListBySearchInfo(styleType, categoryType, colorType);
        } catch(Exception e) {
            logger.error(" selectLabelListBySearchInfo Error {} ", e);
            e.printStackTrace();
            throw new Exception(e);
        }

        return filterList;
    }

}

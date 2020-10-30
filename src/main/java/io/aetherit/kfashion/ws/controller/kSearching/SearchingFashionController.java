package io.aetherit.kfashion.ws.controller.kSearching;

import io.aetherit.kfashion.ws.model.kSearching.*;
import io.aetherit.kfashion.ws.service.kSearching.SearchingFashionService;
import io.aetherit.kfashion.ws.service.kSearching.SearchingLabelService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Controller
@RequestMapping("/api/v1/kSearching/searchingFashion")
public class SearchingFashionController {

    Logger logger = LoggerFactory.getLogger(SearchingFashionController.class);

    private SearchingFashionService searchingFashionService;
    private SearchingLabelService searchingLabelService;

    @Autowired
    public SearchingFashionController (SearchingFashionService searchingFashionService, SearchingLabelService searchingLabelService) {
        this.searchingFashionService = searchingFashionService;
        this.searchingLabelService = searchingLabelService;
    }

    @GetMapping("/getTypes")
    public ResponseEntity<?> getCategory(HttpServletRequest httpRequest, HttpSession session) throws Exception {
        logger.debug(" getCategory {}", httpRequest.getRequestURL());
        List<SearchingCategory> categoryList = searchingFashionService.selectCategoryList();
        logger.debug(" test categoryList {} ", categoryList);
        return new ResponseEntity<>(categoryList, HttpStatus.OK);
    }

    @GetMapping("/getStyleList")
    public ResponseEntity<?> getStyleList(HttpServletRequest httpRequest, HttpSession session) throws Exception {
        logger.debug(" getStyleList {}", httpRequest.getRequestURL());
        List<SearchingStyle> styleList = searchingFashionService.selectStyleList();
        logger.debug(" test styleList {} ", styleList);
        return new ResponseEntity<>(styleList, HttpStatus.OK);
    }

    @GetMapping("/getColorList")
    public ResponseEntity<?> getColorList(@RequestParam int categoryType, HttpServletRequest httpRequest, HttpSession session) throws Exception {
        logger.debug(" getColorList {} ", httpRequest.getRequestURL());
        int categoryNo = searchingFashionService.selectCategoryNo(categoryType);
        List<SearchingStyle> colorList = searchingFashionService.selectColorList(categoryType, categoryNo);
        logger.debug(" test colorList {} ", colorList);
        return new ResponseEntity<>(colorList, HttpStatus.OK);
    }

    /**
     * 태그검색
     *
     * @param authorityNo
     * @param searchCategory 옷 종류
     * @param searchCategoryCode 옷종류 코드
     * @param searchStyle 검색스타일
     * @param searchColor 검색색상
     * @param searchColorCode 검색색상코드
     * @return ResponseEntity
     * @throws
     */
    @GetMapping("/getTagSearchResult")
    public ResponseEntity<?> getTagSearchResult( //@RequestBody SearchingInfo searchInfo,
                                                @RequestParam(value = "style") String style,
                                                @RequestParam(value = "styleType") int styleType,
                                                @RequestParam(value = "category") String category,
                                                @RequestParam(value = "categoryType") int categoryType,
                                                @RequestParam(value = "color") String color,
                                                @RequestParam(value = "colorType") int colorType,
                                                @RequestParam(value = "pageNum") int pageNum,
                                                @RequestParam(value = "rowsPerPage") int rowsPerPage,
                                                HttpServletRequest httpRequest, HttpSession session) throws Exception {
        //logger.trace(" getTagSearchResult Params searchInfo {} ", searchInfo);

        logger.trace(" getTagSearchResult Params style {} ", style);
        logger.trace(" getTagSearchResult Params styleType {} ", styleType);
        logger.trace(" getTagSearchResult Params category {} ", category);
        logger.trace(" getTagSearchResult Params categoryType {} ", categoryType);
        logger.trace(" getTagSearchResult Params color {} ", color);
        logger.trace(" getTagSearchResult Params colorType {} ", colorType);
        logger.trace(" getTagSearchResult Params colorType {} ", pageNum);
        logger.trace(" getTagSearchResult Params colorType {} ", rowsPerPage);
        String result = "none";
        List<SearchingImage> ImageList = searchingFashionService.selectImageList(styleType, categoryType, colorType, pageNum, rowsPerPage);
//        List<SearchingImage> searchingImageList = searchingFashionService.selectSearchImage(searchStyle, searchStyleType, searchCategory, searchCategoryType, searchColor, searchCategoryType);
//        if(searchCategory != null && searchCategory != "") {
//            labelList = searchingLabelService.selectLabelListByCategory(labelList, searchCategoryType);
//        }
        logger.debug("getTagSearchResult {} ", ImageList);

        return new ResponseEntity<>(ImageList, HttpStatus.OK);
    }

    @GetMapping("/getTagSearchResultTotalCount")
    public ResponseEntity<Long> getTagSearchResultTotalCount(@RequestParam(value = "style") String style,
                                             @RequestParam(value = "styleType") int styleType,
                                             @RequestParam(value = "category") String category,
                                             @RequestParam(value = "categoryType") int categoryType,
                                             @RequestParam(value = "color") String color,
                                             @RequestParam(value = "colorType") int colorType,
                                             HttpServletRequest httpRequest, HttpSession session) throws Exception {
        logger.trace(" getTagSearchResultTotalCount Params style {} ", style);
        logger.trace(" getTagSearchResultTotalCount Params styleType {} ", styleType);
        logger.trace(" getTagSearchResultTotalCount Params category {} ", category);
        logger.trace(" getTagSearchResultTotalCount Params categoryType {} ", categoryType);
        logger.trace(" getTagSearchResultTotalCount Params color {} ", color);
        logger.trace(" getTagSearchResultTotalCount Params colorType {} ", colorType);
        Long totalCount = searchingFashionService.selectTagSearchResultTotalCount(styleType, categoryType, colorType);
        logger.debug(" getTagSearchResultTotalCount {} ", totalCount);
        return new ResponseEntity<Long>(totalCount, HttpStatus.OK);
    }

}

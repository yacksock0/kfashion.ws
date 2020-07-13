package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.model.KfashionCategoryItem;
import io.aetherit.kfashion.ws.service.KfashionCategoryItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/v1/kfashion/category/item")
public class KfashionCategoryItemController {

    private KfashionCategoryItemService kfashionCategoryItemService;

    @Autowired
    public KfashionCategoryItemController(KfashionCategoryItemService kfashionCategoryItemService) {
        this.kfashionCategoryItemService = kfashionCategoryItemService;

    }

        /**
         * 일반인 레이블러 색상 속성
         * @param httpRequest
         * @return ResponseEntity
         * @throws
         */
        @GetMapping (value = "/basic/color")
        public ResponseEntity<Object> colorList(HttpServletRequest httpRequest) {
            HashMap<String, Object> resultMap = new HashMap<String, Object>();
            List<KfashionCategoryItem> colorList = kfashionCategoryItemService.selectColorList();
            resultMap.put("colorList", colorList);
            return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
        }

        /**
         * 일반인 레이블러 소매길이 속성
         * @param httpRequest
         * @return ResponseEntity
         * @throws
         */
        @GetMapping (value = "/basic/sleeve")
        public ResponseEntity<Object> sleeveLengthList(HttpServletRequest httpRequest) {
            HashMap<String, Object> resultMap = new HashMap<String, Object>();
            List<KfashionCategoryItem> sleeveList = kfashionCategoryItemService.selectSleeveLengthList();
            resultMap.put("sleeveList", sleeveList);
            return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
        }

        /**
         * 전문가 레이블러 스타일 속성
         * @param httpRequest
         * @return ResponseEntity
         * @throws
         */
        @GetMapping(value = "/professional/style")
        public ResponseEntity<Object> styleList(HttpServletRequest httpRequest) {
            HashMap<String, Object> resultMap = new HashMap<String, Object>();
            List<KfashionCategoryItem> styleList = kfashionCategoryItemService.selectStyleList();
            resultMap.put("styleList", styleList);
            return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
        }

        /**
         * 전문가 레이블러 카테고리 속성
         * @param httpRequest
         * @return ResponseEntity
         * @throws
         */
        @GetMapping(value = "/professional/category")
        public ResponseEntity<Object> categoryList(HttpServletRequest httpRequest) {
            HashMap<String, Object> resultMap = new HashMap<String, Object>();
            List<KfashionCategoryItem> categoryList0 = kfashionCategoryItemService.selectCategoryList0();
            List<KfashionCategoryItem> categoryList1 = kfashionCategoryItemService.selectCategoryList1();
            List<KfashionCategoryItem> categoryList2 = kfashionCategoryItemService.selectCategoryList2();
            List<KfashionCategoryItem> categoryList3 = kfashionCategoryItemService.selectCategoryList3();
            resultMap.put("categoryList0", categoryList0);
            resultMap.put("categoryList1", categoryList1);
            resultMap.put("categoryList2", categoryList2);
            resultMap.put("categoryList3", categoryList3);
            return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
        }

        /**
         * 전문가 레이블러 디테일 속성
         * @param httpRequest
         * @return ResponseEntity
         * @throws
         */
        @GetMapping (value = "/professional/detail")
        public ResponseEntity<Object> detailList(HttpServletRequest httpRequest) {
            HashMap<String, Object> resultMap = new HashMap<String, Object>();
            List<KfashionCategoryItem> detailList = kfashionCategoryItemService.selectDetailList();
            resultMap.put("detailList", detailList);
            return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
        }

        /**
         * 전문가 레이블러 프린트 속성
         * @param httpRequest
         * @return ResponseEntity
         * @throws
         */
        @GetMapping (value = "/professional/print")
        public ResponseEntity<Object> printList(HttpServletRequest httpRequest) {
            HashMap<String, Object> resultMap = new HashMap<String, Object>();
            List<KfashionCategoryItem> printList = kfashionCategoryItemService.selectPrintList();
            resultMap.put("printList", printList);
            return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
        }

        /**
         * 전문가 레이블러 소재감 속성
         * @param httpRequest
         * @return ResponseEntity
         * @throws
         */
        @GetMapping (value = "/professional/texture")
        public ResponseEntity<Object> textureList(HttpServletRequest httpRequest) {
            HashMap<String, Object> resultMap = new HashMap<String, Object>();
            List<KfashionCategoryItem> textureList = kfashionCategoryItemService.selectTextureList();
            resultMap.put("textureList", textureList);
            return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
        }

        /**
         * 전문가 레이블러 기장 속성
         * @param httpRequest
         * @return ResponseEntity
         * @throws
         */
        @GetMapping (value = "/professional/length")
        public ResponseEntity<Object> lengthList(HttpServletRequest httpRequest) {
            HashMap<String, Object> resultMap = new HashMap<String, Object>();
            List<KfashionCategoryItem> lengthList = kfashionCategoryItemService.selectLengthList();
            resultMap.put("lengthList", lengthList);
            return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
        }

        /**
         * 전문가 레이블러 넥라인 속성
         * @param httpRequest
         * @return ResponseEntity
         * @throws
         */
        @GetMapping (value = "/professional/neckLine")
        public ResponseEntity<Object> neckLineList(HttpServletRequest httpRequest) {
            HashMap<String, Object> resultMap = new HashMap<String, Object>();
            List<KfashionCategoryItem> neckLineList = kfashionCategoryItemService.selectNeckLineList();
            resultMap.put("neckLineList", neckLineList);
            return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
        }

        /**
         * 전문가 레이블러 카라 속성
         * @param httpRequest
         * @return ResponseEntity
         * @throws
         */
        @GetMapping (value = "/professional/kara")
        public ResponseEntity<Object> karaList(HttpServletRequest httpRequest) {
            HashMap<String, Object> resultMap = new HashMap<String, Object>();
            List<KfashionCategoryItem> karaList = kfashionCategoryItemService.selectKaraList();
            resultMap.put("karaList", karaList);
            return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
        }

        /**
         * 전문가 레이블러 핏 속성
         * @param httpRequest
         * @return ResponseEntity
         * @throws
         */
        @GetMapping (value = "/professional/fit")
        public ResponseEntity<Object> fitList(HttpServletRequest httpRequest) {
            HashMap<String, Object> resultMap = new HashMap<String, Object>();
            List<KfashionCategoryItem> fitList = kfashionCategoryItemService.selectFitList();
            resultMap.put("fitList", fitList);
            return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
        }

        /**
         * 전문가 레이블러 세이프 속성
         * @param httpRequest
         * @return ResponseEntity
         * @throws
         */
        @GetMapping (value = "/professional/safe")
        public ResponseEntity<Object> safeList(HttpServletRequest httpRequest) {
            HashMap<String, Object> resultMap = new HashMap<String, Object>();
            List<KfashionCategoryItem> safeList = kfashionCategoryItemService.selectSafeList();
            resultMap.put("safeList", safeList);
            return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
        }

        /**
         * 전문가 레이블러 실루엣 속성
         * @param httpRequest
         * @return ResponseEntity
         * @throws
         */
        @GetMapping (value = "/professional/silhouette")
        public ResponseEntity<Object> silhouetteList(HttpServletRequest httpRequest) {
            HashMap<String, Object> resultMap = new HashMap<String, Object>();
            List<KfashionCategoryItem> silhouetteList = kfashionCategoryItemService.selectSilhouetteList();
            resultMap.put("silhouetteList", silhouetteList);
            return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
        }


}

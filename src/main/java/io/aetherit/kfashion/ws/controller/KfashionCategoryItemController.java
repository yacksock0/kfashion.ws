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
            List<KfashionCategoryItem> colorList1 = kfashionCategoryItemService.selectColorList1();
            List<KfashionCategoryItem> colorList2 = kfashionCategoryItemService.selectColorList2();
            List<KfashionCategoryItem> colorList3 = kfashionCategoryItemService.selectColorList3();
            List<KfashionCategoryItem> colorList4 = kfashionCategoryItemService.selectColorList4();
            resultMap.put("colorList1", colorList1);
            resultMap.put("colorList2", colorList2);
            resultMap.put("colorList3", colorList3);
            resultMap.put("colorList4", colorList4);
            System.out.println("colorList1"+colorList1);
            System.out.println("colorList2"+colorList2);
            System.out.println("colorList3"+colorList3);
            System.out.println("colorList4"+colorList4);
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
            List<KfashionCategoryItem> sleeveList1 = kfashionCategoryItemService.selectSleeveLengthList1();
            List<KfashionCategoryItem> sleeveList2 = kfashionCategoryItemService.selectSleeveLengthList2();
            List<KfashionCategoryItem> sleeveList4 = kfashionCategoryItemService.selectSleeveLengthList4();
            resultMap.put("sleeveList1", sleeveList1);
            resultMap.put("sleeveList2", sleeveList2);
            resultMap.put("sleeveList4", sleeveList4);
            System.out.println("sleeveList1"+sleeveList1);
            System.out.println("sleeveList2"+sleeveList2);
            System.out.println("sleeveList4"+sleeveList4);
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
            List<KfashionCategoryItem> categoryList1 = kfashionCategoryItemService.selectCategoryList1();
            List<KfashionCategoryItem> categoryList2 = kfashionCategoryItemService.selectCategoryList2();
            List<KfashionCategoryItem> categoryList3 = kfashionCategoryItemService.selectCategoryList3();
            List<KfashionCategoryItem> categoryList4 = kfashionCategoryItemService.selectCategoryList4();
            resultMap.put("categoryList1", categoryList1);
            resultMap.put("categoryList2", categoryList2);
            resultMap.put("categoryList3", categoryList3);
            resultMap.put("categoryList4", categoryList4);
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
            List<KfashionCategoryItem> detailList1 = kfashionCategoryItemService.selectDetailList1();
            List<KfashionCategoryItem> detailList2 = kfashionCategoryItemService.selectDetailList2();
            List<KfashionCategoryItem> detailList3 = kfashionCategoryItemService.selectDetailList3();
            List<KfashionCategoryItem> detailList4 = kfashionCategoryItemService.selectDetailList4();
            resultMap.put("detailList1", detailList1);
            resultMap.put("detailList2", detailList2);
            resultMap.put("detailList3", detailList3);
            resultMap.put("detailList4", detailList4);
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
            List<KfashionCategoryItem> printList1 = kfashionCategoryItemService.selectPrintList1();
            List<KfashionCategoryItem> printList2 = kfashionCategoryItemService.selectPrintList2();
            List<KfashionCategoryItem> printList3 = kfashionCategoryItemService.selectPrintList3();
            List<KfashionCategoryItem> printList4 = kfashionCategoryItemService.selectPrintList4();
            resultMap.put("printList1", printList1);
            resultMap.put("printList2", printList2);
            resultMap.put("printList3", printList3);
            resultMap.put("printList4", printList4);
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
            List<KfashionCategoryItem> textureList1 = kfashionCategoryItemService.selectTextureList1();
            List<KfashionCategoryItem> textureList2 = kfashionCategoryItemService.selectTextureList2();
            List<KfashionCategoryItem> textureList3 = kfashionCategoryItemService.selectTextureList3();
            List<KfashionCategoryItem> textureList4 = kfashionCategoryItemService.selectTextureList4();
            resultMap.put("textureList1", textureList1);
            resultMap.put("textureList2", textureList2);
            resultMap.put("textureList3", textureList3);
            resultMap.put("textureList4", textureList4);
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
            List<KfashionCategoryItem> lengthList1 = kfashionCategoryItemService.selectLengthList1();
            List<KfashionCategoryItem> lengthList2 = kfashionCategoryItemService.selectLengthList2();
            List<KfashionCategoryItem> lengthList3 = kfashionCategoryItemService.selectLengthList3();
            List<KfashionCategoryItem> lengthList4 = kfashionCategoryItemService.selectLengthList4();
            resultMap.put("lengthList1", lengthList1);
            resultMap.put("lengthList2", lengthList2);
            resultMap.put("lengthList3", lengthList3);
            resultMap.put("lengthList4", lengthList4);
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
            List<KfashionCategoryItem> neckLineList1 = kfashionCategoryItemService.selectNeckLineList1();
            List<KfashionCategoryItem> neckLineList2 = kfashionCategoryItemService.selectNeckLineList2();
            List<KfashionCategoryItem> neckLineList4 = kfashionCategoryItemService.selectNeckLineList4();
            resultMap.put("neckLineList1", neckLineList1);
            resultMap.put("neckLineList2", neckLineList2);
            resultMap.put("neckLineList4", neckLineList4);
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
            List<KfashionCategoryItem> karaList1 = kfashionCategoryItemService.selectKaraList1();
            List<KfashionCategoryItem> karaList2 = kfashionCategoryItemService.selectKaraList2();
            List<KfashionCategoryItem> karaList4 = kfashionCategoryItemService.selectKaraList4();
            resultMap.put("karaList1", karaList1);
            resultMap.put("karaList2", karaList2);
            resultMap.put("karaList4", karaList4);
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
            List<KfashionCategoryItem> fitList1 = kfashionCategoryItemService.selectFitList1();
            List<KfashionCategoryItem> fitList2 = kfashionCategoryItemService.selectFitList2();
            List<KfashionCategoryItem> fitList3 = kfashionCategoryItemService.selectFitList3();
            List<KfashionCategoryItem> fitList4 = kfashionCategoryItemService.selectFitList4();
            resultMap.put("fitList1", fitList1);
            resultMap.put("fitList2", fitList2);
            resultMap.put("fitList3", fitList3);
            resultMap.put("fitList4", fitList4);
            return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
        }

}

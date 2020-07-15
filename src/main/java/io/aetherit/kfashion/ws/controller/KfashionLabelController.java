package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.model.*;
import io.aetherit.kfashion.ws.service.KfashionImageLocationPolygonPointService;
import io.aetherit.kfashion.ws.service.KfashionLabelService;
import io.aetherit.kfashion.ws.service.KfashionWorkHistoryService;
import io.aetherit.kfashion.ws.service.KfashionWorkService;
import org.apache.ibatis.annotations.Case;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/v1/kfashion/label")
public class KfashionLabelController {

        private KfashionLabelService kfashionLabelService;
        private KfashionWorkHistoryService kfashionWorkHistoryService;
        private KfashionWorkService kfashionWorkService;
        private KfashionImageLocationPolygonPointService kfashionImageLocationPolygonPointService;

        @Autowired
        public KfashionLabelController(KfashionLabelService kfashionLabelService,
                                       KfashionWorkHistoryService kfashionWorkHistoryService,
                                       KfashionWorkService kfashionWorkService,
                                       KfashionImageLocationPolygonPointService kfashionImageLocationPolygonPointService) {
            this.kfashionLabelService = kfashionLabelService;
            this.kfashionWorkHistoryService = kfashionWorkHistoryService;
            this.kfashionWorkService = kfashionWorkService;
            this.kfashionImageLocationPolygonPointService = kfashionImageLocationPolygonPointService;
        }

        /**
         * 기본라벨 인서트
         * @param httpServletRequest
         * @param basicLabel
         * @return String
         * @throws Exception
         */

        @PostMapping(value = "/basicLabel")
        public ResponseEntity<Object> basicLabel(HttpServletRequest httpServletRequest,
                                                 @RequestBody BasicLabel basicLabel) throws Exception{
                try {

                        System.out.println(basicLabel);
                        KfashionWork work = new KfashionWork();
                        work.setNo(basicLabel.getWorkNo());
                        work.setWorkState(basicLabel.getWorkStep());
                        kfashionWorkService.updateWork(work);

                        KfashionWorkHistory workHistory = new KfashionWorkHistory();
                        workHistory.setWorkNo(basicLabel.getWorkNo());
                        workHistory.setWorkStep(basicLabel.getWorkStep());
                        workHistory.setCreatedId(basicLabel.getCreatedId());
                        kfashionWorkHistoryService.insertWorkHistory(workHistory);

                        if(basicLabel.getLabelNo1() == 1) {
                                System.out.println("case1실행한다");
                                KfashionLabel basic = new KfashionLabel();
                                basic.setWorkNo(basicLabel.getWorkNo());
                                basic.setWorkStep(basicLabel.getWorkStep());
                                basic.setLabelNo(1);
                                basic.setNo(1);
                                basic.setCategoryNo(basicLabel.getColorCategoryNo());
                                basic.setCategoryItemNo(basicLabel.getColor());
                                basic.setCreatedId(basicLabel.getCreatedId());
                                kfashionLabelService.insertBasicLabel(basic);
                                if (basicLabel.getSubColor() != 0) {
                                        basic.setNo(2);
                                        basic.setCategoryNo(basicLabel.getColorCategoryNo());
                                        basic.setCategoryItemNo(basicLabel.getSubColor());
                                        kfashionLabelService.insertBasicLabel(basic);
                                }
                                basic.setNo(3);
                                basic.setCategoryNo(basicLabel.getSleeveLengthCategoryNo());
                                basic.setCategoryItemNo(basicLabel.getSleeveLength());
                                kfashionLabelService.insertBasicLabel(basic);
                        }
                        if(basicLabel.getLabelNo2() == 2) {
                                System.out.println("case2실행한다");
                                KfashionLabel basic1 = new KfashionLabel();
                                basic1.setWorkNo(basicLabel.getWorkNo());
                                basic1.setWorkStep(basicLabel.getWorkStep());
                                basic1.setLabelNo(2);
                                basic1.setNo(1);
                                basic1.setCategoryNo(basicLabel.getColorCategoryNo());
                                basic1.setCategoryItemNo(basicLabel.getColor1());
                                basic1.setCreatedId(basicLabel.getCreatedId());
                                kfashionLabelService.insertBasicLabel(basic1);
                                if (basicLabel.getSubColor1() != 0) {
                                        basic1.setNo(2);
                                        basic1.setCategoryNo(basicLabel.getColorCategoryNo());
                                        basic1.setCategoryItemNo(basicLabel.getSubColor1());
                                        kfashionLabelService.insertBasicLabel(basic1);
                                }
                                basic1.setNo(3);
                                basic1.setCategoryNo(basicLabel.getSleeveLengthCategoryNo());
                                basic1.setCategoryItemNo(basicLabel.getSleeveLength1());
                                kfashionLabelService.insertBasicLabel(basic1);
                        }
                        if(basicLabel.getLabelNo3() == 3) {
                                System.out.println("case3실행한다");
                                KfashionLabel basic2 = new KfashionLabel();
                                basic2.setWorkNo(basicLabel.getWorkNo());
                                basic2.setWorkStep(basicLabel.getWorkStep());
                                basic2.setLabelNo(3);
                                basic2.setNo(1);
                                basic2.setCategoryNo(basicLabel.getColorCategoryNo());
                                basic2.setCategoryItemNo(basicLabel.getColor2());
                                basic2.setCreatedId(basicLabel.getCreatedId());
                                kfashionLabelService.insertBasicLabel(basic2);
                                if (basicLabel.getSubColor2() != 0) {
                                        basic2.setNo(2);
                                        basic2.setCategoryNo(basicLabel.getColorCategoryNo());
                                        basic2.setCategoryItemNo(basicLabel.getSubColor2());
                                        kfashionLabelService.insertBasicLabel(basic2);
                                }
                                basic2.setNo(3);
                                basic2.setCategoryNo(basicLabel.getSleeveLengthCategoryNo());
                                basic2.setCategoryItemNo(basicLabel.getSleeveLength2());
                                kfashionLabelService.insertBasicLabel(basic2);
                        }
                        if(basicLabel.getLabelNo4() == 4) {
                                System.out.println("case4실행한다");
                                KfashionLabel basic3 = new KfashionLabel();
                                basic3.setWorkNo(basicLabel.getWorkNo());
                                basic3.setWorkStep(basicLabel.getWorkStep());
                                basic3.setLabelNo(4);
                                basic3.setNo(1);
                                basic3.setCategoryNo(basicLabel.getColorCategoryNo());
                                basic3.setCategoryItemNo(basicLabel.getColor3());
                                basic3.setCreatedId(basicLabel.getCreatedId());
                                kfashionLabelService.insertBasicLabel(basic3);
                                if (basicLabel.getSubColor3() != 0) {
                                        basic3.setNo(2);
                                        basic3.setCategoryNo(basicLabel.getColorCategoryNo());
                                        basic3.setCategoryItemNo(basicLabel.getSubColor3());
                                        kfashionLabelService.insertBasicLabel(basic3);
                                }
                                basic3.setNo(3);
                                basic3.setCategoryNo(basicLabel.getSleeveLengthCategoryNo());
                                basic3.setCategoryItemNo(basicLabel.getSleeveLength3());
                                kfashionLabelService.insertBasicLabel(basic3);
                        }
                }catch (Exception e) {
                        e.printStackTrace();
                }
                return new ResponseEntity<Object>(HttpStatus.OK);
        }

        /**
         * 전문가라벨 인서트
         * @param httpServletRequest
         * @param professionalLabel
         * @return String
         * @throws Exception
         */


        @PostMapping(value = "/professionalLabel")
        public ResponseEntity<Object> professionalLabel(HttpServletRequest httpServletRequest,
                                      @RequestBody ProfessionalLabel professionalLabel) throws Exception {
                KfashionWork work = new KfashionWork();
                work.setNo(professionalLabel.getWorkNo());
                work.setWorkState(professionalLabel.getWorkStep());
                kfashionWorkService.updateWork(work);

                KfashionWorkHistory workHistory = new KfashionWorkHistory();
                workHistory.setWorkNo(professionalLabel.getWorkNo());
                workHistory.setWorkStep(professionalLabel.getWorkStep());
                workHistory.setCreatedId(professionalLabel.getCreatedId());
                kfashionWorkHistoryService.insertWorkHistory(workHistory);

                if(professionalLabel.getLabelNo1() == 1) {
                        KfashionLabel professional = new KfashionLabel();
                        professional.setWorkNo(professionalLabel.getWorkNo());
                        professional.setWorkStep(professionalLabel.getWorkStep());
                        professional.setLabelNo(professionalLabel.getLabelNo1());
                        professional.setNo(1);
                        professional.setCategoryNo(professionalLabel.getStyleCategoryNo());
                        professional.setCategoryItemNo(professionalLabel.getStyle());
                        professional.setCreatedId(professionalLabel.getCreatedId());
                        kfashionLabelService.insertProfessionalLabel(professional);

                        professional.setNo(2);
                        professional.setCategoryNo(professionalLabel.getStyleCategorySubNo());
                        professional.setCategoryItemNo(professionalLabel.getStyleSub());
                        kfashionLabelService.insertProfessionalLabel(professional);

                        professional.setNo(3);
                        professional.setCategoryNo(professionalLabel.getCategoryCategoryNo());
                        professional.setCategoryItemNo(professionalLabel.getCategory());
                        kfashionLabelService.insertProfessionalLabel(professional);

                        professional.setNo(4);
                        professional.setCategoryNo(professionalLabel.getDetailCategoryNo());
                        professional.setCategoryItemNo(professionalLabel.getDetail());
                        kfashionLabelService.insertProfessionalLabel(professional);

                        professional.setNo(5);
                        professional.setCategoryNo(professionalLabel.getPrintCategoryNo());
                        professional.setCategoryItemNo(professionalLabel.getPrint());
                        kfashionLabelService.insertProfessionalLabel(professional);

                        professional.setNo(6);
                        professional.setCategoryNo(professionalLabel.getTextureCategoryNo());
                        professional.setCategoryItemNo(professionalLabel.getTexture());
                        kfashionLabelService.insertProfessionalLabel(professional);

                        professional.setNo(7);
                        professional.setCategoryNo(professionalLabel.getClothLengthCategoryNo());
                        professional.setCategoryItemNo(professionalLabel.getClothLength());
                        kfashionLabelService.insertProfessionalLabel(professional);

                        professional.setNo(8);
                        professional.setCategoryNo(professionalLabel.getNeckLineCategoryNo());
                        professional.setCategoryItemNo(professionalLabel.getNeckLine());
                        kfashionLabelService.insertProfessionalLabel(professional);

                        professional.setNo(9);
                        professional.setCategoryNo(professionalLabel.getKaraCategoryNo());
                        professional.setCategoryItemNo(professionalLabel.getKara());
                        kfashionLabelService.insertProfessionalLabel(professional);

                        professional.setNo(10);
                        professional.setCategoryNo(professionalLabel.getFitCategoryNo());
                        professional.setCategoryItemNo(professionalLabel.getFit());
                        kfashionLabelService.insertProfessionalLabel(professional);
                }
                if(professionalLabel.getLabelNo2() == 2) {
                        KfashionLabel professional1 = new KfashionLabel();
                        professional1.setWorkNo(professionalLabel.getWorkNo());
                        professional1.setWorkStep(professionalLabel.getWorkStep());
                        professional1.setLabelNo(professionalLabel.getLabelNo2());
                        professional1.setNo(1);
                        professional1.setCategoryNo(professionalLabel.getStyleCategoryNo());
                        professional1.setCategoryItemNo(professionalLabel.getStyle());
                        professional1.setCreatedId(professionalLabel.getCreatedId());
                        kfashionLabelService.insertProfessionalLabel(professional1);

                        professional1.setNo(2);
                        professional1.setCategoryNo(professionalLabel.getStyleCategorySubNo());
                        professional1.setCategoryItemNo(professionalLabel.getStyleSub());
                        kfashionLabelService.insertProfessionalLabel(professional1);

                        professional1.setNo(3);
                        professional1.setCategoryNo(professionalLabel.getCategoryCategoryNo());
                        professional1.setCategoryItemNo(professionalLabel.getCategory1());
                        kfashionLabelService.insertProfessionalLabel(professional1);

                        professional1.setNo(4);
                        professional1.setCategoryNo(professionalLabel.getDetailCategoryNo());
                        professional1.setCategoryItemNo(professionalLabel.getDetail1());
                        kfashionLabelService.insertProfessionalLabel(professional1);

                        professional1.setNo(5);
                        professional1.setCategoryNo(professionalLabel.getPrintCategoryNo());
                        professional1.setCategoryItemNo(professionalLabel.getPrint1());
                        kfashionLabelService.insertProfessionalLabel(professional1);

                        professional1.setNo(6);
                        professional1.setCategoryNo(professionalLabel.getTextureCategoryNo());
                        professional1.setCategoryItemNo(professionalLabel.getTexture1());
                        kfashionLabelService.insertProfessionalLabel(professional1);

                        professional1.setNo(7);
                        professional1.setCategoryNo(professionalLabel.getClothLengthCategoryNo());
                        professional1.setCategoryItemNo(professionalLabel.getClothLength1());
                        kfashionLabelService.insertProfessionalLabel(professional1);

                        professional1.setNo(8);
                        professional1.setCategoryNo(professionalLabel.getNeckLineCategoryNo());
                        professional1.setCategoryItemNo(professionalLabel.getNeckLine1());
                        kfashionLabelService.insertProfessionalLabel(professional1);

                        professional1.setNo(9);
                        professional1.setCategoryNo(professionalLabel.getKaraCategoryNo());
                        professional1.setCategoryItemNo(professionalLabel.getKara1());
                        kfashionLabelService.insertProfessionalLabel(professional1);

                        professional1.setNo(10);
                        professional1.setCategoryNo(professionalLabel.getFitCategoryNo());
                        professional1.setCategoryItemNo(professionalLabel.getFit1());
                        kfashionLabelService.insertProfessionalLabel(professional1);
                }
                if(professionalLabel.getLabelNo3() == 3) {
                        KfashionLabel professional2 = new KfashionLabel();
                        professional2.setWorkNo(professionalLabel.getWorkNo());
                        professional2.setWorkStep(professionalLabel.getWorkStep());
                        professional2.setLabelNo(professionalLabel.getLabelNo3());
                        professional2.setNo(1);
                        professional2.setCategoryNo(professionalLabel.getStyleCategoryNo());
                        professional2.setCategoryItemNo(professionalLabel.getStyle());
                        professional2.setCreatedId(professionalLabel.getCreatedId());
                        kfashionLabelService.insertProfessionalLabel(professional2);

                        professional2.setNo(2);
                        professional2.setCategoryNo(professionalLabel.getStyleCategorySubNo());
                        professional2.setCategoryItemNo(professionalLabel.getStyleSub());
                        kfashionLabelService.insertProfessionalLabel(professional2);

                        professional2.setNo(3);
                        professional2.setCategoryNo(professionalLabel.getCategoryCategoryNo());
                        professional2.setCategoryItemNo(professionalLabel.getCategory2());
                        kfashionLabelService.insertProfessionalLabel(professional2);

                        professional2.setNo(4);
                        professional2.setCategoryNo(professionalLabel.getDetailCategoryNo());
                        professional2.setCategoryItemNo(professionalLabel.getDetail2());
                        kfashionLabelService.insertProfessionalLabel(professional2);

                        professional2.setNo(5);
                        professional2.setCategoryNo(professionalLabel.getPrintCategoryNo());
                        professional2.setCategoryItemNo(professionalLabel.getPrint2());
                        kfashionLabelService.insertProfessionalLabel(professional2);

                        professional2.setNo(6);
                        professional2.setCategoryNo(professionalLabel.getTextureCategoryNo());
                        professional2.setCategoryItemNo(professionalLabel.getTexture2());
                        kfashionLabelService.insertProfessionalLabel(professional2);

                        professional2.setNo(7);
                        professional2.setCategoryNo(professionalLabel.getClothLengthCategoryNo());
                        professional2.setCategoryItemNo(professionalLabel.getClothLength2());
                        kfashionLabelService.insertProfessionalLabel(professional2);

                        professional2.setNo(8);
                        professional2.setCategoryNo(professionalLabel.getNeckLineCategoryNo());
                        professional2.setCategoryItemNo(professionalLabel.getNeckLine2());
                        kfashionLabelService.insertProfessionalLabel(professional2);

                        professional2.setNo(9);
                        professional2.setCategoryNo(professionalLabel.getKaraCategoryNo());
                        professional2.setCategoryItemNo(professionalLabel.getKara2());
                        kfashionLabelService.insertProfessionalLabel(professional2);

                        professional2.setNo(10);
                        professional2.setCategoryNo(professionalLabel.getFitCategoryNo());
                        professional2.setCategoryItemNo(professionalLabel.getFit2());
                        kfashionLabelService.insertProfessionalLabel(professional2);
                }
                if(professionalLabel.getLabelNo4() == 4) {
                        KfashionLabel professional3 = new KfashionLabel();
                        professional3.setWorkNo(professionalLabel.getWorkNo());
                        professional3.setWorkStep(professionalLabel.getWorkStep());
                        professional3.setLabelNo(professionalLabel.getLabelNo4());
                        professional3.setNo(1);
                        professional3.setCategoryNo(professionalLabel.getStyleCategoryNo());
                        professional3.setCategoryItemNo(professionalLabel.getStyle());
                        professional3.setCreatedId(professionalLabel.getCreatedId());
                        kfashionLabelService.insertProfessionalLabel(professional3);

                        professional3.setNo(2);
                        professional3.setCategoryNo(professionalLabel.getStyleCategorySubNo());
                        professional3.setCategoryItemNo(professionalLabel.getStyleSub());
                        kfashionLabelService.insertProfessionalLabel(professional3);

                        professional3.setNo(3);
                        professional3.setCategoryNo(professionalLabel.getCategoryCategoryNo());
                        professional3.setCategoryItemNo(professionalLabel.getCategory3());
                        kfashionLabelService.insertProfessionalLabel(professional3);

                        professional3.setNo(4);
                        professional3.setCategoryNo(professionalLabel.getDetailCategoryNo());
                        professional3.setCategoryItemNo(professionalLabel.getDetail3());
                        kfashionLabelService.insertProfessionalLabel(professional3);

                        professional3.setNo(5);
                        professional3.setCategoryNo(professionalLabel.getPrintCategoryNo());
                        professional3.setCategoryItemNo(professionalLabel.getPrint3());
                        kfashionLabelService.insertProfessionalLabel(professional3);

                        professional3.setNo(6);
                        professional3.setCategoryNo(professionalLabel.getTextureCategoryNo());
                        professional3.setCategoryItemNo(professionalLabel.getTexture3());
                        kfashionLabelService.insertProfessionalLabel(professional3);

                        professional3.setNo(7);
                        professional3.setCategoryNo(professionalLabel.getClothLengthCategoryNo());
                        professional3.setCategoryItemNo(professionalLabel.getClothLength3());
                        kfashionLabelService.insertProfessionalLabel(professional3);

                        professional3.setNo(8);
                        professional3.setCategoryNo(professionalLabel.getNeckLineCategoryNo());
                        professional3.setCategoryItemNo(professionalLabel.getNeckLine3());
                        kfashionLabelService.insertProfessionalLabel(professional3);

                        professional3.setNo(9);
                        professional3.setCategoryNo(professionalLabel.getKaraCategoryNo());
                        professional3.setCategoryItemNo(professionalLabel.getKara3());
                        kfashionLabelService.insertProfessionalLabel(professional3);

                        professional3.setNo(10);
                        professional3.setCategoryNo(professionalLabel.getFitCategoryNo());
                        professional3.setCategoryItemNo(professionalLabel.getFit3());
                        kfashionLabelService.insertProfessionalLabel(professional3);
                }
                return new ResponseEntity<Object>("success", HttpStatus.OK);
        }

        @GetMapping(value="/basicLabelList")
        public ResponseEntity<Object> basicLabelList(HttpServletRequest httpRequest,
                                                  @RequestParam(value="createdId")String createdId) {
                HashMap<String, Object> resultMap = new HashMap<String, Object>();
                List<KfashionLabel> basicLabelList = kfashionLabelService.selectBasicLabelList(createdId);
                resultMap.put("basicLabelList", basicLabelList);
                System.out.println(basicLabelList);
                return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
        }

        @GetMapping(value="/reviewLabelList")
        public ResponseEntity<Object> reviewLabelList(HttpServletRequest httpRequest,
                                                     @RequestParam(value="workNo")Long workNo) {
                HashMap<String, Object> resultMap = new HashMap<String, Object>();
                int[] labelNo = kfashionLabelService.selectLabelList(workNo);
                int labelNo1=0;
                int labelNo2=0;
                int labelNo3=0;
                int labelNo4=0;

                for(int i=0; i < labelNo.length; i++) {
                        if(labelNo[i] == 1) {
                                labelNo1 = 1;
                        }
                        if(labelNo[i] == 2) {
                                labelNo2 = 2;
                        }
                        if(labelNo[i] == 3) {
                                labelNo3 = 3;
                        }
                        if(labelNo[i] == 4) {
                                labelNo4 = 4;
                        }
                }
                if(labelNo1 == 1) {
                List<KfashionLabel> outerReviewLabelList = kfashionLabelService.selectOuterReviewLabelList(workNo);
                        ReviewLabel outerReviewLabel =  ReviewLabel.builder()
                                .styleItemName(outerReviewLabelList.get(0).getCategoryItemName())
                                .styleSubItemName(outerReviewLabelList.get(1).getCategoryItemName())
                                .categoryItemName(outerReviewLabelList.get(2).getCategoryItemName())
                                .detailItemName(outerReviewLabelList.get(3).getCategoryItemName())
                                .printItemName(outerReviewLabelList.get(4).getCategoryItemName())
                                .textureItemName(outerReviewLabelList.get(5).getCategoryItemName())
                                .clothLengthItemName(outerReviewLabelList.get(6).getCategoryItemName())
                                .neckLineItemName(outerReviewLabelList.get(7).getCategoryItemName())
                                .karaItemName(outerReviewLabelList.get(8).getCategoryItemName())
                                .fitItemName(outerReviewLabelList.get(9).getCategoryItemName())
                                .build();
                        resultMap.put("outerReviewLabel", outerReviewLabel);
                        System.out.println(outerReviewLabel);
                }
                if(labelNo2 == 2) {
                        List<KfashionLabel> topReviewLabelList = kfashionLabelService.selectTopReviewLabelList(workNo);
                                ReviewLabel topReviewLabel =  ReviewLabel.builder()
                                        .styleItemName(topReviewLabelList.get(0).getCategoryItemName())
                                        .styleSubItemName(topReviewLabelList.get(1).getCategoryItemName())
                                        .categoryItemName(topReviewLabelList.get(2).getCategoryItemName())
                                        .detailItemName(topReviewLabelList.get(3).getCategoryItemName())
                                        .printItemName(topReviewLabelList.get(4).getCategoryItemName())
                                        .textureItemName(topReviewLabelList.get(5).getCategoryItemName())
                                        .clothLengthItemName(topReviewLabelList.get(6).getCategoryItemName())
                                        .neckLineItemName(topReviewLabelList.get(7).getCategoryItemName())
                                        .karaItemName(topReviewLabelList.get(8).getCategoryItemName())
                                        .fitItemName(topReviewLabelList.get(9).getCategoryItemName())
                                        .build();
                                resultMap.put("topReviewLabel", topReviewLabel);
                                System.out.println(topReviewLabel);
                }
                if(labelNo3 == 3) {
                List<KfashionLabel> pantsReviewLabelList = kfashionLabelService.selectPantsReviewLabelList(workNo);
                        ReviewLabel pantsReviewLabel =  ReviewLabel.builder()
                                .styleItemName(pantsReviewLabelList.get(0).getCategoryItemName())
                                .styleSubItemName(pantsReviewLabelList.get(1).getCategoryItemName())
                                .categoryItemName(pantsReviewLabelList.get(2).getCategoryItemName())
                                .detailItemName(pantsReviewLabelList.get(3).getCategoryItemName())
                                .printItemName(pantsReviewLabelList.get(4).getCategoryItemName())
                                .textureItemName(pantsReviewLabelList.get(5).getCategoryItemName())
                                .clothLengthItemName(pantsReviewLabelList.get(6).getCategoryItemName())
                                .neckLineItemName(pantsReviewLabelList.get(7).getCategoryItemName())
                                .karaItemName(pantsReviewLabelList.get(8).getCategoryItemName())
                                .fitItemName(pantsReviewLabelList.get(9).getCategoryItemName())
                                .build();
                        resultMap.put("pantsReviewLabel", pantsReviewLabel);
                        System.out.println(pantsReviewLabel);
                }
                if(labelNo4 == 4) {
                List<KfashionLabel> onePieceReviewLabelList = kfashionLabelService.selectOnePieceReviewLabelList(workNo);
                        ReviewLabel onePieceReviewLabel =  ReviewLabel.builder()
                                .styleItemName(onePieceReviewLabelList.get(0).getCategoryItemName())
                                .styleSubItemName(onePieceReviewLabelList.get(1).getCategoryItemName())
                                .categoryItemName(onePieceReviewLabelList.get(2).getCategoryItemName())
                                .detailItemName(onePieceReviewLabelList.get(3).getCategoryItemName())
                                .printItemName(onePieceReviewLabelList.get(4).getCategoryItemName())
                                .textureItemName(onePieceReviewLabelList.get(5).getCategoryItemName())
                                .clothLengthItemName(onePieceReviewLabelList.get(6).getCategoryItemName())
                                .neckLineItemName(onePieceReviewLabelList.get(7).getCategoryItemName())
                                .karaItemName(onePieceReviewLabelList.get(8).getCategoryItemName())
                                .fitItemName(onePieceReviewLabelList.get(9).getCategoryItemName())
                                .build();
                        resultMap.put("onePieceReviewLabel", onePieceReviewLabel);
                        System.out.println(onePieceReviewLabel);
                }
                return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
        }



}

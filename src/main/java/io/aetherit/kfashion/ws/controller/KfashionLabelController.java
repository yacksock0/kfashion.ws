package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.model.*;
import io.aetherit.kfashion.ws.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/kfashion/label")
public class KfashionLabelController {

        private KfashionCommentService kfashionCommentService;
        private KfashionLabelService kfashionLabelService;
        private KfashionWorkHistoryService kfashionWorkHistoryService;
        private KfashionWorkService kfashionWorkService;
        private KfashionImageLocationPolygonPointService kfashionImageLocationPolygonPointService;

        @Autowired
        public KfashionLabelController(KfashionLabelService kfashionLabelService,
                                       KfashionWorkHistoryService kfashionWorkHistoryService,
                                       KfashionWorkService kfashionWorkService,
                                       KfashionImageLocationPolygonPointService kfashionImageLocationPolygonPointService,
                                       KfashionCommentService kfashionCommentService) {
                this.kfashionLabelService = kfashionLabelService;
                this.kfashionWorkHistoryService = kfashionWorkHistoryService;
                this.kfashionWorkService = kfashionWorkService;
                this.kfashionImageLocationPolygonPointService = kfashionImageLocationPolygonPointService;
                this.kfashionCommentService = kfashionCommentService;
        }

        /**
         * 기본라벨 인서트
         * @param httpServletRequest
         * @param basicLabel
         * @return ResponseEntity
         * @throws Exception
         */

        @PostMapping(value = "/basicLabel")
        public ResponseEntity<Object> basicLabel(HttpServletRequest httpServletRequest,
                                                 @RequestBody BasicLabel basicLabel) throws Exception{
                System.out.println("basicLabelbasicLabelbasicLabelbasicLabel 받아라 이얏~"+basicLabel);

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
                        KfashionLabel basic1 = new KfashionLabel();
                        basic1.setWorkNo(basicLabel.getWorkNo());
                        basic1.setWorkStep(basicLabel.getWorkStep());
                        basic1.setLabelNo(1);
                        basic1.setNo(1);
                        basic1.setCategoryNo(basicLabel.getColorCategoryNo1());
                        basic1.setCategoryItemNo(basicLabel.getColor1());
                        basic1.setCreatedId(basicLabel.getCreatedId());
                        kfashionLabelService.insertBasicLabel(basic1);
                        if (basicLabel.getSubColor1() != 0) {
                                basic1.setNo(2);
                                basic1.setCategoryNo(basicLabel.getSubColorCategoryNo1());
                                basic1.setCategoryItemNo(basicLabel.getSubColor1());
                                kfashionLabelService.insertBasicLabel(basic1);
                        }
                        basic1.setNo(3);
                        basic1.setCategoryNo(basicLabel.getSleeveLengthCategoryNo1());
                        basic1.setCategoryItemNo(basicLabel.getSleeveLength1());
                        kfashionLabelService.insertBasicLabel(basic1);
                }
                if(basicLabel.getLabelNo2() == 2) {
                        System.out.println("case2실행한다");
                        KfashionLabel basic2 = new KfashionLabel();
                        basic2.setWorkNo(basicLabel.getWorkNo());
                        basic2.setWorkStep(basicLabel.getWorkStep());
                        basic2.setLabelNo(2);
                        basic2.setNo(1);
                        basic2.setCategoryNo(basicLabel.getColorCategoryNo2());
                        basic2.setCategoryItemNo(basicLabel.getColor2());
                        basic2.setCreatedId(basicLabel.getCreatedId());
                        kfashionLabelService.insertBasicLabel(basic2);
                        if (basicLabel.getSubColor2() != 0) {
                                basic2.setNo(2);
                                basic2.setCategoryNo(basicLabel.getSubColorCategoryNo2());
                                basic2.setCategoryItemNo(basicLabel.getSubColor2());
                                kfashionLabelService.insertBasicLabel(basic2);
                        }
                        basic2.setNo(3);
                        basic2.setCategoryNo(basicLabel.getSleeveLengthCategoryNo2());
                        basic2.setCategoryItemNo(basicLabel.getSleeveLength2());
                        kfashionLabelService.insertBasicLabel(basic2);
                }
                if(basicLabel.getLabelNo3() == 3) {
                        System.out.println("case3실행한다");
                        KfashionLabel basic3 = new KfashionLabel();
                        basic3.setWorkNo(basicLabel.getWorkNo());
                        basic3.setWorkStep(basicLabel.getWorkStep());
                        basic3.setLabelNo(3);
                        basic3.setNo(1);
                        basic3.setCategoryNo(basicLabel.getColorCategoryNo3());
                        basic3.setCategoryItemNo(basicLabel.getColor3());
                        basic3.setCreatedId(basicLabel.getCreatedId());
                        kfashionLabelService.insertBasicLabel(basic3);
                        if (basicLabel.getSubColor3() != 0) {
                                basic3.setNo(2);
                                basic3.setCategoryNo(basicLabel.getSubColorCategoryNo3());
                                basic3.setCategoryItemNo(basicLabel.getSubColor3());
                                kfashionLabelService.insertBasicLabel(basic3);
                        }
                }
                if(basicLabel.getLabelNo4() == 4) {
                        System.out.println("case4실행한다");
                        KfashionLabel basic4 = new KfashionLabel();
                        basic4.setWorkNo(basicLabel.getWorkNo());
                        basic4.setWorkStep(basicLabel.getWorkStep());
                        basic4.setLabelNo(4);
                        basic4.setNo(1);
                        basic4.setCategoryNo(basicLabel.getColorCategoryNo4());
                        basic4.setCategoryItemNo(basicLabel.getColor4());
                        basic4.setCreatedId(basicLabel.getCreatedId());
                        kfashionLabelService.insertBasicLabel(basic4);
                        if (basicLabel.getSubColor4() != 0) {
                                basic4.setNo(2);
                                basic4.setCategoryNo(basicLabel.getSubColorCategoryNo4());
                                basic4.setCategoryItemNo(basicLabel.getSubColor4());
                                kfashionLabelService.insertBasicLabel(basic4);
                        }
                        basic4.setNo(3);
                        basic4.setCategoryNo(basicLabel.getSleeveLengthCategoryNo4());
                        basic4.setCategoryItemNo(basicLabel.getSleeveLength4());
                        kfashionLabelService.insertBasicLabel(basic4);
                }
                return new ResponseEntity<Object>("success",HttpStatus.OK);
        }

        /**
         * 전문가라벨 인서트
         * @param httpServletRequest
         * @param professionalLabel
         * @return ResponseEntity
         * @throws Exception
         */

        @PostMapping(value = "/professionalLabel")
        public ResponseEntity<Object> professionalLabel(HttpServletRequest httpServletRequest,
                                                        @RequestBody ProfessionalLabel professionalLabel) throws Exception {

                System.out.println("111111 : " +professionalLabel.getLabelNo1());
                System.out.println("222222 : " +professionalLabel.getLabelNo2());
                System.out.println("333333 : " +professionalLabel.getLabelNo3());
                System.out.println("444444 : " +professionalLabel.getLabelNo4());
                System.out.println("555555 : " +professionalLabel.getLabelNo5());
                System.out.println("getWorkNo : " +professionalLabel.getWorkNo());
                KfashionWork work = new KfashionWork();
                work.setNo(professionalLabel.getWorkNo());
                work.setWorkState(professionalLabel.getWorkStep());
                kfashionWorkService.updateWork(work);

                KfashionWorkHistory workHistory = new KfashionWorkHistory();
                workHistory.setWorkNo(professionalLabel.getWorkNo());
                workHistory.setWorkStep(professionalLabel.getWorkStep());
                workHistory.setCreatedId(professionalLabel.getCreatedId());
                kfashionWorkHistoryService.insertWorkHistory(workHistory);

                if(professionalLabel.getLabelNo5() == 5){
                        KfashionLabel professional5 = new KfashionLabel();
                        professional5.setWorkNo(professionalLabel.getWorkNo());
                        professional5.setWorkStep(professionalLabel.getWorkStep());
                        professional5.setLabelNo(professionalLabel.getLabelNo5());
                        if(professionalLabel.getStyleCategoryNo() != 0) {
                        professional5.setCategoryNo(professionalLabel.getStyleCategoryNo());
                        professional5.setCategoryItemNo(professionalLabel.getStyle());
                        professional5.setCreatedId(professionalLabel.getCreatedId());
                        kfashionLabelService.insertProfessionalLabel(professional5);
                         }
                        if(professionalLabel.getStyleSub() != 0) {
                                professional5.setCategoryNo(professionalLabel.getStyleCategorySubNo());
                                professional5.setCategoryItemNo(professionalLabel.getStyleSub());
                                kfashionLabelService.insertProfessionalLabel(professional5);
                        }
                }



                if(professionalLabel.getLabelNo1() == 1) {
                        KfashionLabel professional1 = new KfashionLabel();
                        professional1.setCreatedId(professionalLabel.getCreatedId());
                        professional1.setWorkNo(professionalLabel.getWorkNo());
                        professional1.setWorkStep(professionalLabel.getWorkStep());
                        professional1.setLabelNo(professionalLabel.getLabelNo1());

                        if(professionalLabel.getCategoryCategoryNo1() !=0) {
                                professional1.setCategoryNo(professionalLabel.getCategoryCategoryNo1());
                                professional1.setCategoryItemNo(professionalLabel.getCategory1());
                                kfashionLabelService.insertProfessionalLabel(professional1);
                        }

                        if(professionalLabel.getDetailCategoryNo1().size() >0) {
                                for(int i = 0 ; i<professionalLabel.getDetail1().size() ; i ++){
                                        professional1.setCategoryNo(professionalLabel.getDetailCategoryNo1().get(i));
                                        professional1.setCategoryItemNo(professionalLabel.getDetail1().get(i));
                                        kfashionLabelService.insertProfessionalLabel(professional1);
                                }
                        }


                        if(professionalLabel.getDetailCategoryNo1().size() >0) {
                                for (int i = 0; i < professionalLabel.getDetail1().size(); i++) {
                                        System.out.println("getDetailCategoryNo1 : " +professionalLabel.getDetailCategoryNo1().get(i));
                                        System.out.println("getDetail1 : " +professionalLabel.getDetail1().get(i));
                                }
                        }
                        if(professionalLabel.getPrintCategoryNo1().size() > 0) {
                                for (int i = 0; i < professionalLabel.getPrint1().size(); i++) {
                                        professional1.setCategoryNo(professionalLabel.getPrintCategoryNo1().get(i));
                                        professional1.setCategoryItemNo(professionalLabel.getPrint1().get(i));
                                        kfashionLabelService.insertProfessionalLabel(professional1);
                                }
                        }
                        if(professionalLabel.getTextureCategoryNo1().size() > 0) {
                                for (int i = 0; i < professionalLabel.getTexture1().size(); i++) {
                                        professional1.setCategoryNo(professionalLabel.getTextureCategoryNo1().get(i));
                                        professional1.setCategoryItemNo(professionalLabel.getTexture1().get(i));
                                        kfashionLabelService.insertProfessionalLabel(professional1);
                                }
                        }
                        if(professionalLabel.getClothLengthCategoryNo1() !=0) {
                                professional1.setCategoryNo(professionalLabel.getClothLengthCategoryNo1());
                                professional1.setCategoryItemNo(professionalLabel.getClothLength1());
                                kfashionLabelService.insertProfessionalLabel(professional1);
                        }
                        if(professionalLabel.getNeckLineCategoryNo1() !=0) {
                                professional1.setCategoryNo(professionalLabel.getNeckLineCategoryNo1());
                                professional1.setCategoryItemNo(professionalLabel.getNeckLine1());
                                kfashionLabelService.insertProfessionalLabel(professional1);
                        }
                        if(professionalLabel.getKaraCategoryNo1() !=0) {
                                professional1.setCategoryNo(professionalLabel.getKaraCategoryNo1());
                                professional1.setCategoryItemNo(professionalLabel.getKara1());
                                kfashionLabelService.insertProfessionalLabel(professional1);
                        }
                        if(professionalLabel.getFitCategoryNo1() !=0) {
                                professional1.setCategoryNo(professionalLabel.getFitCategoryNo1());
                                professional1.setCategoryItemNo(professionalLabel.getFit1());
                                kfashionLabelService.insertProfessionalLabel(professional1);
                        }
                }
                if(professionalLabel.getLabelNo2() == 2) {
                        KfashionLabel professional2 = new KfashionLabel();
                        professional2.setCreatedId(professionalLabel.getCreatedId());
                        professional2.setWorkNo(professionalLabel.getWorkNo());
                        professional2.setWorkStep(professionalLabel.getWorkStep());
                        professional2.setLabelNo(professionalLabel.getLabelNo2());

                        if(professionalLabel.getCategoryCategoryNo2() !=0) {
                                professional2.setCategoryNo(professionalLabel.getCategoryCategoryNo2());
                                professional2.setCategoryItemNo(professionalLabel.getCategory2());
                                kfashionLabelService.insertProfessionalLabel(professional2);

                        } if(professionalLabel.getDetailCategoryNo2().size() > 0) {
                                for(int i = 0 ; i<professionalLabel.getDetail2().size() ; i ++) {
                                        professional2.setCategoryNo(professionalLabel.getDetailCategoryNo2().get(i));
                                        professional2.setCategoryItemNo(professionalLabel.getDetail2().get(i));
                                        kfashionLabelService.insertProfessionalLabel(professional2);
                                }
                        }


                        if(professionalLabel.getPrintCategoryNo2().size() > 0) {
                                for (int i = 0; i < professionalLabel.getPrint2().size(); i++) {
                                        professional2.setCategoryNo(professionalLabel.getPrintCategoryNo2().get(i));
                                        professional2.setCategoryItemNo(professionalLabel.getPrint2().get(i));
                                        kfashionLabelService.insertProfessionalLabel(professional2);
                                }
                        }
                        if(professionalLabel.getTextureCategoryNo2().size() > 0) {
                                for (int i = 0; i < professionalLabel.getTexture2().size(); i++) {
                                        professional2.setCategoryNo(professionalLabel.getTextureCategoryNo2().get(i));
                                        professional2.setCategoryItemNo(professionalLabel.getTexture2().get(i));
                                        kfashionLabelService.insertProfessionalLabel(professional2);
                                }
                        }
                        if(professionalLabel.getClothLengthCategoryNo2() !=0) {
                                professional2.setCategoryNo(professionalLabel.getClothLengthCategoryNo2());
                                professional2.setCategoryItemNo(professionalLabel.getClothLength2());
                                kfashionLabelService.insertProfessionalLabel(professional2);
                        }
                        if(professionalLabel.getNeckLineCategoryNo2() !=0) {
                                professional2.setCategoryNo(professionalLabel.getNeckLineCategoryNo2());
                                professional2.setCategoryItemNo(professionalLabel.getNeckLine2());
                                kfashionLabelService.insertProfessionalLabel(professional2);
                        }
                        if(professionalLabel.getKaraCategoryNo2() !=0) {
                                professional2.setCategoryNo(professionalLabel.getKaraCategoryNo2());
                                professional2.setCategoryItemNo(professionalLabel.getKara2());
                                kfashionLabelService.insertProfessionalLabel(professional2);
                        }
                        if(professionalLabel.getFitCategoryNo2() !=0) {
                                professional2.setCategoryNo(professionalLabel.getFitCategoryNo2());
                                professional2.setCategoryItemNo(professionalLabel.getFit2());
                                kfashionLabelService.insertProfessionalLabel(professional2);
                        }
                }
                if(professionalLabel.getLabelNo3() == 3) {
                        KfashionLabel professional3 = new KfashionLabel();
                        professional3.setCreatedId(professionalLabel.getCreatedId());
                        professional3.setWorkNo(professionalLabel.getWorkNo());
                        professional3.setWorkStep(professionalLabel.getWorkStep());
                        professional3.setLabelNo(professionalLabel.getLabelNo3());
                        if(professionalLabel.getCategoryCategoryNo3() !=0) {
                                professional3.setCategoryNo(professionalLabel.getCategoryCategoryNo3());
                                professional3.setCategoryItemNo(professionalLabel.getCategory3());
                                kfashionLabelService.insertProfessionalLabel(professional3);
                        }
                        if(professionalLabel.getDetailCategoryNo3().size() > 0) {
                                for(int i = 0 ; i<professionalLabel.getDetailCategoryNo3().size() ; i ++) {
                                        professional3.setCategoryNo(professionalLabel.getDetailCategoryNo3().get(i));
                                        professional3.setCategoryItemNo(professionalLabel.getDetail3().get(i));
                                        kfashionLabelService.insertProfessionalLabel(professional3);
                                }
                        }


                        if(professionalLabel.getPrintCategoryNo3().size() > 0) {
                                for (int i = 0; i < professionalLabel.getPrint3().size(); i++) {
                                        professional3.setCategoryNo(professionalLabel.getPrintCategoryNo3().get(i));
                                        professional3.setCategoryItemNo(professionalLabel.getPrint3().get(i));
                                        kfashionLabelService.insertProfessionalLabel(professional3);
                                }
                        }
                        if(professionalLabel.getTextureCategoryNo3().size() > 0) {
                                for (int i = 0; i < professionalLabel.getTexture3().size(); i++) {
                                        professional3.setCategoryNo(professionalLabel.getTextureCategoryNo3().get(i));
                                        professional3.setCategoryItemNo(professionalLabel.getTexture3().get(i));
                                        kfashionLabelService.insertProfessionalLabel(professional3);
                                }
                        }
                        if(professionalLabel.getClothLengthCategoryNo3() !=0) {
                                professional3.setCategoryNo(professionalLabel.getClothLengthCategoryNo3());
                                professional3.setCategoryItemNo(professionalLabel.getClothLength3());
                                kfashionLabelService.insertProfessionalLabel(professional3);
                        }
                        if(professionalLabel.getFitCategoryNo3() !=0) {
                                professional3.setCategoryNo(professionalLabel.getFitCategoryNo3());
                                professional3.setCategoryItemNo(professionalLabel.getFit3());
                                kfashionLabelService.insertProfessionalLabel(professional3);
                        }
                }
                if(professionalLabel.getLabelNo4() == 4) {
                        KfashionLabel professional4 = new KfashionLabel();
                        professional4.setCreatedId(professionalLabel.getCreatedId());
                        professional4.setWorkNo(professionalLabel.getWorkNo());
                        professional4.setWorkStep(professionalLabel.getWorkStep());
                        professional4.setLabelNo(professionalLabel.getLabelNo4());

                        if(professionalLabel.getCategoryCategoryNo4() !=0) {
                                professional4.setCategoryNo(professionalLabel.getCategoryCategoryNo4());
                                professional4.setCategoryItemNo(professionalLabel.getCategory4());
                                kfashionLabelService.insertProfessionalLabel(professional4);
                        }
                        if(professionalLabel.getDetailCategoryNo4().size() > 0) {
                                for(int i = 0 ; i<professionalLabel.getDetailCategoryNo3().size() ; i ++) {
                                        professional4.setCategoryNo(professionalLabel.getDetailCategoryNo4().get(i));
                                        professional4.setCategoryItemNo(professionalLabel.getDetail4().get(i));
                                        kfashionLabelService.insertProfessionalLabel(professional4);
                                }
                        }
                        if(professionalLabel.getPrintCategoryNo4().size() > 0) {
                                for (int i = 0; i < professionalLabel.getPrint4().size(); i++) {
                                        professional4.setCategoryNo(professionalLabel.getPrintCategoryNo4().get(i));
                                        professional4.setCategoryItemNo(professionalLabel.getPrint4().get(i));
                                        kfashionLabelService.insertProfessionalLabel(professional4);
                                }
                        }
                        if(professionalLabel.getTextureCategoryNo4().size() > 0) {
                                for (int i = 0; i < professionalLabel.getTexture4().size(); i++) {
                                        professional4.setCategoryNo(professionalLabel.getTextureCategoryNo4().get(i));
                                        professional4.setCategoryItemNo(professionalLabel.getTexture4().get(i));
                                        kfashionLabelService.insertProfessionalLabel(professional4);
                                }
                        }
                        if(professionalLabel.getClothLengthCategoryNo4() !=0) {
                                professional4.setCategoryNo(professionalLabel.getClothLengthCategoryNo4());
                                professional4.setCategoryItemNo(professionalLabel.getClothLength4());
                                kfashionLabelService.insertProfessionalLabel(professional4);
                        }
                        if(professionalLabel.getNeckLineCategoryNo4() !=0) {
                                professional4.setCategoryNo(professionalLabel.getNeckLineCategoryNo4());
                                professional4.setCategoryItemNo(professionalLabel.getNeckLine4());
                                kfashionLabelService.insertProfessionalLabel(professional4);
                        }
                        if(professionalLabel.getKaraCategoryNo4() !=0) {
                                professional4.setCategoryNo(professionalLabel.getKaraCategoryNo4());
                                professional4.setCategoryItemNo(professionalLabel.getKara4());
                                kfashionLabelService.insertProfessionalLabel(professional4);
                        }
                        if(professionalLabel.getFitCategoryNo4() !=0) {
                                professional4.setCategoryNo(professionalLabel.getFitCategoryNo4());
                                professional4.setCategoryItemNo(professionalLabel.getFit4());
                                kfashionLabelService.insertProfessionalLabel(professional4);
                        }
                }
                return new ResponseEntity<Object>("success", HttpStatus.OK);
        }


        /**
         * 기본 라벨 리스트
         * @param createdId
         * @return ResponseEntity
         * @throws Exception
         */
        @GetMapping(value="/basicLabelList")
        public ResponseEntity<Object> basicLabelList(HttpServletRequest httpRequest,
                                                     @RequestParam(value="createdId")String createdId) {
                HashMap<String, Object> resultMap = new HashMap<String, Object>();
                List<KfashionLabel> basicLabelList = kfashionLabelService.selectBasicLabelList(createdId);
                resultMap.put("basicLabelList", basicLabelList);
                System.out.println(basicLabelList);
                return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
        }

        /**
         * 전문가 라벨 리뷰리스트
         * @param workNo
         * @return ResponseEntity
         * @throws Exception
         */

        @GetMapping(value="/reviewLabelList")
        public ResponseEntity<Object> reviewLabelList(HttpServletRequest httpRequest,
                                                      @RequestParam(value="workNo")Long workNo) {


                HashMap<String, Object> resultMap = new HashMap<String, Object>();
                int[] labelNo = kfashionLabelService.selectLabelList(workNo);
                int labelNo1=0;
                int labelNo2=0;
                int labelNo3=0;
                int labelNo4=0;
                int labelNo5=0;

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
                        if(labelNo[i] == 5) {
                                labelNo5 = 5;
                        }

                }

                if(labelNo1 == 1) {
                        List<Integer> detailCategoryNo = new ArrayList<>();
                        List<Integer> detail = new ArrayList<>();
                        List<String>  detailItemName = new ArrayList<>();

                        List<Integer> printCategoryNo = new ArrayList<>();
                        List<Integer> print = new ArrayList<>();
                        List<String>  printItemName = new ArrayList<>();

                        List<Integer> textureCategoryNo = new ArrayList<>();
                        List<Integer> texture = new ArrayList<>();
                        List<String>  textureItemName = new ArrayList<>();

                        List<KfashionLabel> outerReviewLabelList = kfashionLabelService.selectOuterReviewLabelList(workNo);
                        System.out.println("outerReviewLabelList : " +outerReviewLabelList);
                        ReviewLabel outerReviewLabel = new ReviewLabel();


                        for(int i = 0 ; i<outerReviewLabelList.size() ; i++){
                                if(outerReviewLabelList.get(i).getCategoryName().equals("카테고리")){
                                        outerReviewLabel.setCategoryCategoryNo1(outerReviewLabelList.get(i).getCategoryNo());
                                        outerReviewLabel.setCategory1(outerReviewLabelList.get(i).getCategoryItemNo());
                                        outerReviewLabel.setCategoryItemName1(outerReviewLabelList.get(i).getCategoryItemName());
                                } else if(outerReviewLabelList.get(i).getCategoryName().equals("디테일")){

                                        detailCategoryNo.add(outerReviewLabelList.get(i).getCategoryNo());
                                        detail.add(outerReviewLabelList.get(i).getCategoryItemNo());
                                        detailItemName.add(outerReviewLabelList.get(i).getCategoryItemName());

                                        outerReviewLabel.setDetailCategoryNo1(detailCategoryNo);
                                        outerReviewLabel.setDetail1(detail);
                                        outerReviewLabel.setDetailItemName1(detailItemName);

                                } else if(outerReviewLabelList.get(i).getCategoryName().equals("프린트")){

                                        printCategoryNo.add(outerReviewLabelList.get(i).getCategoryNo());
                                        print.add(outerReviewLabelList.get(i).getCategoryItemNo());
                                        printItemName.add(outerReviewLabelList.get(i).getCategoryItemName());

                                        outerReviewLabel.setPrintCategoryNo1(printCategoryNo);
                                        outerReviewLabel.setPrint1(print);
                                        outerReviewLabel.setPrintItemName1(printItemName);

                                } else if(outerReviewLabelList.get(i).getCategoryName().equals("소재")){
                                        textureCategoryNo.add(outerReviewLabelList.get(i).getCategoryNo());
                                        texture.add(outerReviewLabelList.get(i).getCategoryItemNo());
                                        textureItemName.add(outerReviewLabelList.get(i).getCategoryItemName());

                                        outerReviewLabel.setTextureCategoryNo1(textureCategoryNo);
                                        outerReviewLabel.setTexture1(texture);
                                        outerReviewLabel.setTextureItemName1(textureItemName);

                                } else if(outerReviewLabelList.get(i).getCategoryName().equals("기장")){
                                        outerReviewLabel.setClothLengthCategoryNo1(outerReviewLabelList.get(i).getCategoryNo());
                                        outerReviewLabel.setClothLength1(outerReviewLabelList.get(i).getCategoryItemNo());
                                        outerReviewLabel.setClothLengthItemName1(outerReviewLabelList.get(i).getCategoryItemName());
                                } else if(outerReviewLabelList.get(i).getCategoryName().equals("넥라인")){
                                        outerReviewLabel.setNeckLineCategoryNo1(outerReviewLabelList.get(i).getCategoryNo());
                                        outerReviewLabel.setNeckLine1(outerReviewLabelList.get(i).getCategoryItemNo());
                                        outerReviewLabel.setNeckLineItemName1(outerReviewLabelList.get(i).getCategoryItemName());
                                } else if(outerReviewLabelList.get(i).getCategoryName().equals("옷깃")){
                                        outerReviewLabel.setKaraCategoryNo1(outerReviewLabelList.get(i).getCategoryNo());
                                        outerReviewLabel.setKara1(outerReviewLabelList.get(i).getCategoryItemNo());
                                        outerReviewLabel.setKaraItemName1(outerReviewLabelList.get(i).getCategoryItemName());
                                } else if(outerReviewLabelList.get(i).getCategoryName().equals("핏")){
                                        outerReviewLabel.setFitCategoryNo1(outerReviewLabelList.get(i).getCategoryNo());
                                        outerReviewLabel.setFit1(outerReviewLabelList.get(i).getCategoryItemNo());
                                        outerReviewLabel.setFitItemName1(outerReviewLabelList.get(i).getCategoryItemName());
                                }
                        }
                        resultMap.put("outerReviewLabel", outerReviewLabel);
                        System.out.println(outerReviewLabel);
                }
                if(labelNo2 == 2) {
                        List<Integer> detailCategoryNo = new ArrayList<>();
                        List<Integer> detail = new ArrayList<>();
                        List<String> detailItemName = new ArrayList<>();

                        List<Integer> printCategoryNo = new ArrayList<>();
                        List<Integer> print = new ArrayList<>();
                        List<String>  printItemName = new ArrayList<>();

                        List<Integer> textureCategoryNo = new ArrayList<>();
                        List<Integer> texture = new ArrayList<>();
                        List<String>  textureItemName = new ArrayList<>();

                        List<KfashionLabel> topReviewLabelList = kfashionLabelService.selectTopReviewLabelList(workNo);
                        ReviewLabel topReviewLabel = new ReviewLabel();
                        for(int i = 0 ; i<topReviewLabelList.size() ; i++){
                                if(topReviewLabelList.get(i).getCategoryName().equals("카테고리")){
                                        topReviewLabel.setCategoryCategoryNo2(topReviewLabelList.get(i).getCategoryNo());
                                        topReviewLabel.setCategory2(topReviewLabelList.get(i).getCategoryItemNo());
                                        topReviewLabel.setCategoryItemName2(topReviewLabelList.get(i).getCategoryItemName());
                                } else if(topReviewLabelList.get(i).getCategoryName().equals("디테일")){

                                        detailCategoryNo.add(topReviewLabelList.get(i).getCategoryNo());
                                        detail.add(topReviewLabelList.get(i).getCategoryItemNo());
                                        detailItemName.add(topReviewLabelList.get(i).getCategoryItemName());

                                        topReviewLabel.setDetailCategoryNo2(detailCategoryNo);
                                        topReviewLabel.setDetail2(detail);
                                        topReviewLabel.setDetailItemName2(detailItemName);

                                } else if(topReviewLabelList.get(i).getCategoryName().equals("프린트")){

                                        printCategoryNo.add(topReviewLabelList.get(i).getCategoryNo());
                                        print.add(topReviewLabelList.get(i).getCategoryItemNo());
                                        printItemName.add(topReviewLabelList.get(i).getCategoryItemName());

                                        topReviewLabel.setPrintCategoryNo2(printCategoryNo);
                                        topReviewLabel.setPrint2(print);
                                        topReviewLabel.setPrintItemName2(printItemName);

                                } else if(topReviewLabelList.get(i).getCategoryName().equals("소재")){
                                        textureCategoryNo.add(topReviewLabelList.get(i).getCategoryNo());
                                        texture.add(topReviewLabelList.get(i).getCategoryItemNo());
                                        textureItemName.add(topReviewLabelList.get(i).getCategoryItemName());

                                        topReviewLabel.setTextureCategoryNo2(textureCategoryNo);
                                        topReviewLabel.setTexture2(texture);
                                        topReviewLabel.setTextureItemName2(textureItemName);

                                } else if(topReviewLabelList.get(i).getCategoryName().equals("기장(상의)")){
                                        topReviewLabel.setClothLengthCategoryNo2(topReviewLabelList.get(i).getCategoryNo());
                                        topReviewLabel.setClothLength2(topReviewLabelList.get(i).getCategoryItemNo());
                                        topReviewLabel.setClothLengthItemName2(topReviewLabelList.get(i).getCategoryItemName());
                                } else if(topReviewLabelList.get(i).getCategoryName().equals("넥라인")){
                                        topReviewLabel.setNeckLineCategoryNo2(topReviewLabelList.get(i).getCategoryNo());
                                        topReviewLabel.setNeckLine2(topReviewLabelList.get(i).getCategoryItemNo());
                                        topReviewLabel.setNeckLineItemName2(topReviewLabelList.get(i).getCategoryItemName());
                                } else if(topReviewLabelList.get(i).getCategoryName().equals("옷깃")){
                                        topReviewLabel.setKaraCategoryNo2(topReviewLabelList.get(i).getCategoryNo());
                                        topReviewLabel.setKara2(topReviewLabelList.get(i).getCategoryItemNo());
                                        topReviewLabel.setKaraItemName2(topReviewLabelList.get(i).getCategoryItemName());
                                } else if(topReviewLabelList.get(i).getCategoryName().equals("핏")){
                                        topReviewLabel.setFitCategoryNo2(topReviewLabelList.get(i).getCategoryNo());
                                        topReviewLabel.setFit2(topReviewLabelList.get(i).getCategoryItemNo());
                                        topReviewLabel.setFitItemName2(topReviewLabelList.get(i).getCategoryItemName());
                                }
                        }
                        resultMap.put("topReviewLabel", topReviewLabel);
                        System.out.println(topReviewLabel);
                }
                if(labelNo3 == 3) {
                        List<Integer> detailCategoryNo = new ArrayList<>();
                        List<Integer> detail = new ArrayList<>();
                        List<String> detailItemName = new ArrayList<>();

                        List<Integer> printCategoryNo = new ArrayList<>();
                        List<Integer> print = new ArrayList<>();
                        List<String>  printItemName = new ArrayList<>();

                        List<Integer> textureCategoryNo = new ArrayList<>();
                        List<Integer> texture = new ArrayList<>();
                        List<String>  textureItemName = new ArrayList<>();

                        List<KfashionLabel> pantsReviewLabelList = kfashionLabelService.selectPantsReviewLabelList(workNo);
                        ReviewLabel pantsReviewLabel = new ReviewLabel();
                        for(int i = 0 ; i<pantsReviewLabelList.size() ; i++){
                                if(pantsReviewLabelList.get(i).getCategoryName().equals("카테고리")){
                                        pantsReviewLabel.setCategoryCategoryNo3(pantsReviewLabelList.get(i).getCategoryNo());
                                        pantsReviewLabel.setCategory3(pantsReviewLabelList.get(i).getCategoryItemNo());
                                        pantsReviewLabel.setCategoryItemName3(pantsReviewLabelList.get(i).getCategoryItemName());
                                } else if(pantsReviewLabelList.get(i).getCategoryName().equals("디테일")){
                                        detailCategoryNo.add(pantsReviewLabelList.get(i).getCategoryNo());
                                        detail.add(pantsReviewLabelList.get(i).getCategoryItemNo());
                                        detailItemName.add(pantsReviewLabelList.get(i).getCategoryItemName());

                                        pantsReviewLabel.setDetailCategoryNo3(detailCategoryNo);
                                        pantsReviewLabel.setDetail3(detail);
                                        pantsReviewLabel.setDetailItemName3(detailItemName);
                                } else if(pantsReviewLabelList.get(i).getCategoryName().equals("프린트")){

                                        printCategoryNo.add(pantsReviewLabelList.get(i).getCategoryNo());
                                        print.add(pantsReviewLabelList.get(i).getCategoryItemNo());
                                        printItemName.add(pantsReviewLabelList.get(i).getCategoryItemName());

                                        pantsReviewLabel.setPrintCategoryNo3(printCategoryNo);
                                        pantsReviewLabel.setPrint3(print);
                                        pantsReviewLabel.setPrintItemName3(printItemName);

                                } else if(pantsReviewLabelList.get(i).getCategoryName().equals("소재")){

                                        textureCategoryNo.add(pantsReviewLabelList.get(i).getCategoryNo());
                                        texture.add(pantsReviewLabelList.get(i).getCategoryItemNo());
                                        textureItemName.add(pantsReviewLabelList.get(i).getCategoryItemName());

                                        pantsReviewLabel.setTextureCategoryNo3(textureCategoryNo);
                                        pantsReviewLabel.setTexture3(texture);
                                        pantsReviewLabel.setTextureItemName3(textureItemName);

                                } else if(pantsReviewLabelList.get(i).getCategoryName().equals("기장(하의)")){
                                        pantsReviewLabel.setClothLengthCategoryNo3(pantsReviewLabelList.get(i).getCategoryNo());
                                        pantsReviewLabel.setClothLength3(pantsReviewLabelList.get(i).getCategoryItemNo());
                                        pantsReviewLabel.setClothLengthItemName3(pantsReviewLabelList.get(i).getCategoryItemName());
                                } else if(pantsReviewLabelList.get(i).getCategoryName().equals("핏")){
                                        pantsReviewLabel.setFitCategoryNo3(pantsReviewLabelList.get(i).getCategoryNo());
                                        pantsReviewLabel.setFit3(pantsReviewLabelList.get(i).getCategoryItemNo());
                                        pantsReviewLabel.setFitItemName3(pantsReviewLabelList.get(i).getCategoryItemName());
                                }
                        }
                        resultMap.put("pantsReviewLabel", pantsReviewLabel);
                        System.out.println(pantsReviewLabel);
                }
                if(labelNo4 == 4) {
                        List<Integer> detailCategoryNo = new ArrayList<>();
                        List<Integer> detail = new ArrayList<>();
                        List<String> detailItemName = new ArrayList<>();

                        List<Integer> printCategoryNo = new ArrayList<>();
                        List<Integer> print = new ArrayList<>();
                        List<String>  printItemName = new ArrayList<>();

                        List<Integer> textureCategoryNo = new ArrayList<>();
                        List<Integer> texture = new ArrayList<>();
                        List<String>  textureItemName = new ArrayList<>();

                        List<KfashionLabel> onePieceReviewLabelList = kfashionLabelService.selectOnePieceReviewLabelList(workNo);
                        ReviewLabel onePieceReviewLabel = new ReviewLabel();
                        for(int i = 0 ; i<onePieceReviewLabelList.size() ; i++){
                                if(onePieceReviewLabelList.get(i).getCategoryName().equals("카테고리")){
                                        onePieceReviewLabel.setCategoryCategoryNo4(onePieceReviewLabelList.get(i).getCategoryNo());
                                        onePieceReviewLabel.setCategory4(onePieceReviewLabelList.get(i).getCategoryItemNo());
                                        onePieceReviewLabel.setCategoryItemName4(onePieceReviewLabelList.get(i).getCategoryItemName());
                                } else if(onePieceReviewLabelList.get(i).getCategoryName().equals("디테일")){
                                        detailCategoryNo.add(onePieceReviewLabelList.get(i).getCategoryNo());
                                        detail.add(onePieceReviewLabelList.get(i).getCategoryItemNo());
                                        detailItemName.add(onePieceReviewLabelList.get(i).getCategoryItemName());

                                        onePieceReviewLabel.setDetailCategoryNo4(detailCategoryNo);
                                        onePieceReviewLabel.setDetail4(detail);
                                        onePieceReviewLabel.setDetailItemName4(detailItemName);
                                } else if(onePieceReviewLabelList.get(i).getCategoryName().equals("프린트")){

                                        printCategoryNo.add(onePieceReviewLabelList.get(i).getCategoryNo());
                                        print.add(onePieceReviewLabelList.get(i).getCategoryItemNo());
                                        printItemName.add(onePieceReviewLabelList.get(i).getCategoryItemName());

                                        onePieceReviewLabel.setPrintCategoryNo4(printCategoryNo);
                                        onePieceReviewLabel.setPrint4(print);
                                        onePieceReviewLabel.setPrintItemName4(printItemName);

                                } else if(onePieceReviewLabelList.get(i).getCategoryName().equals("소재")){
                                        textureCategoryNo.add(onePieceReviewLabelList.get(i).getCategoryNo());
                                        texture.add(onePieceReviewLabelList.get(i).getCategoryItemNo());
                                        textureItemName.add(onePieceReviewLabelList.get(i).getCategoryItemName());

                                        onePieceReviewLabel.setTextureCategoryNo4(textureCategoryNo);
                                        onePieceReviewLabel.setTexture4(texture);
                                        onePieceReviewLabel.setTextureItemName4(textureItemName);

                                } else if(onePieceReviewLabelList.get(i).getCategoryName().equals("기장")){
                                        onePieceReviewLabel.setClothLengthCategoryNo4(onePieceReviewLabelList.get(i).getCategoryNo());
                                        onePieceReviewLabel.setClothLength4(onePieceReviewLabelList.get(i).getCategoryItemNo());
                                        onePieceReviewLabel.setClothLengthItemName4(onePieceReviewLabelList.get(i).getCategoryItemName());
                                } else if(onePieceReviewLabelList.get(i).getCategoryName().equals("넥라인")){
                                        onePieceReviewLabel.setNeckLineCategoryNo4(onePieceReviewLabelList.get(i).getCategoryNo());
                                        onePieceReviewLabel.setNeckLine4(onePieceReviewLabelList.get(i).getCategoryItemNo());
                                        onePieceReviewLabel.setNeckLineItemName4(onePieceReviewLabelList.get(i).getCategoryItemName());
                                } else if(onePieceReviewLabelList.get(i).getCategoryName().equals("옷깃")){
                                        onePieceReviewLabel.setKaraCategoryNo4(onePieceReviewLabelList.get(i).getCategoryNo());
                                        onePieceReviewLabel.setKara4(onePieceReviewLabelList.get(i).getCategoryItemNo());
                                        onePieceReviewLabel.setKaraItemName4(onePieceReviewLabelList.get(i).getCategoryItemName());
                                } else if(onePieceReviewLabelList.get(i).getCategoryName().equals("핏")){
                                        onePieceReviewLabel.setFitCategoryNo4(onePieceReviewLabelList.get(i).getCategoryNo());
                                        onePieceReviewLabel.setFit4(onePieceReviewLabelList.get(i).getCategoryItemNo());
                                        onePieceReviewLabel.setFitItemName4(onePieceReviewLabelList.get(i).getCategoryItemName());
                                }
                        }
                        resultMap.put("onePieceReviewLabel", onePieceReviewLabel);
                        System.out.println(onePieceReviewLabel);
                }
                if(labelNo5 == 5) {
                        List<KfashionLabel> styleReviewLabelList = kfashionLabelService.selectStyleReviewLabelList(workNo);
                        if(styleReviewLabelList.size() == 2){
                                ReviewLabel styleReviewLabel =  ReviewLabel.builder()
                                        .styleCategoryNo(styleReviewLabelList.get(0).getCategoryNo())
                                        .style(styleReviewLabelList.get(0).getCategoryItemNo())
                                        .styleItemName(styleReviewLabelList.get(0).getCategoryItemName())
                                        .styleCategorySubNo(styleReviewLabelList.get(1).getCategoryNo())
                                        .styleSub(styleReviewLabelList.get(1).getCategoryItemNo())
                                        .styleSubItemName(styleReviewLabelList.get(1).getCategoryItemName())
                                        .labelNo1(labelNo1)
                                        .labelNo2(labelNo2)
                                        .labelNo3(labelNo3)
                                        .labelNo4(labelNo4)
                                        .labelNo5(labelNo5)
                                        .build();
                                resultMap.put("styleReviewLabel", styleReviewLabel);
                        }else {
                                ReviewLabel styleReviewLabel =  ReviewLabel.builder()
                                        .styleCategoryNo(styleReviewLabelList.get(0).getCategoryNo())
                                        .style(styleReviewLabelList.get(0).getCategoryItemNo())
                                        .styleItemName(styleReviewLabelList.get(0).getCategoryItemName())
                                        .build();
                                resultMap.put("styleReviewLabel", styleReviewLabel);
                        }
                }
                return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
        }

        /**
         * 일반 라벨 리뷰 리스트
         * @param workNo
         * @return ResponseEntity
         * @throws Exception
         */

        @GetMapping(value="/reviewHighLabelList")
        public ResponseEntity<Object> reviewHighLabelList(HttpServletRequest httpRequest,
                                                          @RequestParam(value="workNo")Long workNo) {
                HashMap<String, Object> resultMap = new HashMap<String, Object>();
                int[] labelNo = kfashionLabelService.selectHighLabelList(workNo);
                int labelNo1 = 0;
                int labelNo2 = 0;
                int labelNo3 = 0;
                int labelNo4 = 0;

                for (int i = 0; i < labelNo.length; i++) {
                        if (labelNo[i] == 1) {
                                labelNo1 = 1;
                        }
                        if (labelNo[i] == 2) {
                                labelNo2 = 2;
                        }
                        if (labelNo[i] == 3) {
                                labelNo3 = 3;
                        }
                        if (labelNo[i] == 4) {
                                labelNo4 = 4;
                        }
                }
                if(labelNo1 == 1) {
                        List<KfashionLabel> outerReviewHighLabelList = kfashionLabelService.selectOuterReviewHighLabelList(workNo);
                        System.out.println(outerReviewHighLabelList.size());
                        if(outerReviewHighLabelList.size() == 2) {
                                HighReviewLabel outerReviewHighLabel =  HighReviewLabel.builder()
                                        .colorCategoryNo1(outerReviewHighLabelList.get(0).getCategoryNo())
                                        .color1(outerReviewHighLabelList.get(0).getCategoryItemNo())
                                        .colorItemName1(outerReviewHighLabelList.get(0).getCategoryItemName())
                                        .colorItemMemo1(outerReviewHighLabelList.get(0).getCategoryItemMemo())
                                        .sleeveLengthCategoryNo1(outerReviewHighLabelList.get(1).getCategoryNo())
                                        .sleeveLength1(outerReviewHighLabelList.get(1).getCategoryItemNo())
                                        .sleeveLengthItemName1(outerReviewHighLabelList.get(1).getCategoryItemName())
                                        .build();
                                resultMap.put("outerReviewHighLabel", outerReviewHighLabel);
                                System.out.println(outerReviewHighLabel);

                        }else {
                                HighReviewLabel outerReviewHighLabel =  HighReviewLabel.builder()
                                        .colorCategoryNo1(outerReviewHighLabelList.get(0).getCategoryNo())
                                        .color1(outerReviewHighLabelList.get(0).getCategoryItemNo())
                                        .colorItemName1(outerReviewHighLabelList.get(0).getCategoryItemName())
                                        .colorItemMemo1(outerReviewHighLabelList.get(0).getCategoryItemMemo())
                                        .subColorCategoryNo1(outerReviewHighLabelList.get(1).getCategoryNo())
                                        .subColor1(outerReviewHighLabelList.get(1).getCategoryItemNo())
                                        .subColorItemName1(outerReviewHighLabelList.get(1).getCategoryItemName())
                                        .subColorItemMemo1(outerReviewHighLabelList.get(1).getCategoryItemMemo())
                                        .sleeveLengthCategoryNo1(outerReviewHighLabelList.get(2).getCategoryNo())
                                        .sleeveLength1(outerReviewHighLabelList.get(2).getCategoryItemNo())
                                        .sleeveLengthItemName1(outerReviewHighLabelList.get(2).getCategoryItemName())
                                        .build();
                                resultMap.put("outerReviewHighLabel", outerReviewHighLabel);
                                System.out.println(outerReviewHighLabel);
                        }
                }
                if(labelNo2 == 2) {
                        List<KfashionLabel> topReviewHighLabelList = kfashionLabelService.selectTopReviewHighLabelList(workNo);
                        if(topReviewHighLabelList.size() == 2) {
                                HighReviewLabel topReviewHighLabel =  HighReviewLabel.builder()
                                        .colorCategoryNo2(topReviewHighLabelList.get(0).getCategoryNo())
                                        .color2(topReviewHighLabelList.get(0).getCategoryItemNo())
                                        .colorItemName2(topReviewHighLabelList.get(0).getCategoryItemName())
                                        .colorItemMemo2(topReviewHighLabelList.get(0).getCategoryItemMemo())
                                        .sleeveLengthCategoryNo2(topReviewHighLabelList.get(1).getCategoryNo())
                                        .sleeveLength2(topReviewHighLabelList.get(1).getCategoryItemNo())
                                        .sleeveLengthItemName2(topReviewHighLabelList.get(1).getCategoryItemName())
                                        .build();
                                resultMap.put("topReviewHighLabel", topReviewHighLabel);
                        }else {
                                HighReviewLabel topReviewHighLabel =  HighReviewLabel.builder()
                                        .colorCategoryNo2(topReviewHighLabelList.get(0).getCategoryNo())
                                        .color2(topReviewHighLabelList.get(0).getCategoryItemNo())
                                        .colorItemName2(topReviewHighLabelList.get(0).getCategoryItemName())
                                        .colorItemMemo2(topReviewHighLabelList.get(0).getCategoryItemMemo())
                                        .subColorCategoryNo2(topReviewHighLabelList.get(1).getCategoryNo())
                                        .subColor2(topReviewHighLabelList.get(1).getCategoryItemNo())
                                        .subColorItemName2(topReviewHighLabelList.get(1).getCategoryItemName())
                                        .subColorItemMemo2(topReviewHighLabelList.get(1).getCategoryItemMemo())
                                        .sleeveLengthCategoryNo2(topReviewHighLabelList.get(2).getCategoryNo())
                                        .sleeveLength2(topReviewHighLabelList.get(2).getCategoryItemNo())
                                        .sleeveLengthItemName2(topReviewHighLabelList.get(2).getCategoryItemName())
                                        .build();
                                resultMap.put("topReviewHighLabel", topReviewHighLabel);
                        }
                }
                if(labelNo3 == 3) {
                        List<KfashionLabel> pantsReviewHighLabelList = kfashionLabelService.selectPantsReviewHighLabelList(workNo);
                        if(pantsReviewHighLabelList.size() == 1) {
                                HighReviewLabel pantsReviewHighLabel = HighReviewLabel.builder()
                                        .colorCategoryNo3(pantsReviewHighLabelList.get(0).getCategoryNo())
                                        .color3(pantsReviewHighLabelList.get(0).getCategoryItemNo())
                                        .colorItemName3(pantsReviewHighLabelList.get(0).getCategoryItemName())
                                        .colorItemMemo3(pantsReviewHighLabelList.get(0).getCategoryItemMemo())
                                        .build();
                                resultMap.put("pantsReviewHighLabel", pantsReviewHighLabel);
                        }else {
                                HighReviewLabel pantsReviewHighLabel = HighReviewLabel.builder()
                                        .colorCategoryNo3(pantsReviewHighLabelList.get(0).getCategoryNo())
                                        .color3(pantsReviewHighLabelList.get(0).getCategoryItemNo())
                                        .colorItemName3(pantsReviewHighLabelList.get(0).getCategoryItemName())
                                        .colorItemMemo3(pantsReviewHighLabelList.get(0).getCategoryItemMemo())
                                        .subColorCategoryNo3(pantsReviewHighLabelList.get(1).getCategoryNo())
                                        .subColor3(pantsReviewHighLabelList.get(1).getCategoryItemNo())
                                        .subColorItemName3(pantsReviewHighLabelList.get(1).getCategoryItemName())
                                        .subColorItemMemo3(pantsReviewHighLabelList.get(1).getCategoryItemMemo())
                                        .build();
                                resultMap.put("pantsReviewHighLabel", pantsReviewHighLabel);

                        }
                }
                if(labelNo4 == 4) {
                        List<KfashionLabel> onePieceReviewHighLabelList = kfashionLabelService.selectOnePieceReviewHighLabelList(workNo);
                        if(onePieceReviewHighLabelList.size() == 2) {
                                HighReviewLabel onePieceReviewHighLabel = HighReviewLabel.builder()
                                        .colorCategoryNo4(onePieceReviewHighLabelList.get(0).getCategoryNo())
                                        .color4(onePieceReviewHighLabelList.get(0).getCategoryItemNo())
                                        .colorItemName4(onePieceReviewHighLabelList.get(0).getCategoryItemName())
                                        .colorItemMemo4(onePieceReviewHighLabelList.get(0).getCategoryItemMemo())
                                        .sleeveLengthCategoryNo4(onePieceReviewHighLabelList.get(1).getCategoryNo())
                                        .sleeveLength4(onePieceReviewHighLabelList.get(1).getCategoryItemNo())
                                        .sleeveLengthItemName4(onePieceReviewHighLabelList.get(1).getCategoryItemName())
                                        .build();
                                resultMap.put("onePieceReviewHighLabel", onePieceReviewHighLabel);
                        }else {
                                HighReviewLabel onePieceReviewHighLabel = HighReviewLabel.builder()
                                        .colorCategoryNo4(onePieceReviewHighLabelList.get(0).getCategoryNo())
                                        .color4(onePieceReviewHighLabelList.get(0).getCategoryItemNo())
                                        .colorItemName4(onePieceReviewHighLabelList.get(0).getCategoryItemName())
                                        .colorItemMemo4(onePieceReviewHighLabelList.get(0).getCategoryItemMemo())
                                        .subColorCategoryNo4(onePieceReviewHighLabelList.get(1).getCategoryNo())
                                        .subColor4(onePieceReviewHighLabelList.get(1).getCategoryItemNo())
                                        .subColorItemName4(onePieceReviewHighLabelList.get(1).getCategoryItemName())
                                        .subColorItemMemo4(onePieceReviewHighLabelList.get(1).getCategoryItemMemo())
                                        .sleeveLengthCategoryNo4(onePieceReviewHighLabelList.get(2).getCategoryNo())
                                        .sleeveLength4(onePieceReviewHighLabelList.get(2).getCategoryItemNo())
                                        .sleeveLengthItemName4(onePieceReviewHighLabelList.get(2).getCategoryItemName())
                                        .build();
                                resultMap.put("onePieceReviewHighLabel", onePieceReviewHighLabel);
                        }
                }
                return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
        }

        /**
         * 전문가 라벨 삭제
         * @param workNo
         * @return ResponseEntity
         * @throws Exception
         */

        @GetMapping(value="/deleteProfessionalLabel")
        public ResponseEntity<Object> deleteProfessionalLabel(HttpServletRequest httpRequest,
                                                              @RequestParam(value="workNo")Long workNo) {

                HashMap<String, Object> resultMap = new HashMap<String, Object>();
                HashMap<String, Object> deleteMap = new HashMap<String, Object>();
                deleteMap.put("workNo",workNo);
                deleteMap.put("workStep",6);
                kfashionLabelService.deleteProfessionalLabel(deleteMap);
                kfashionWorkHistoryService.deleteProfessionalLabelWorkHistory(deleteMap);
                return new ResponseEntity<Object>(HttpStatus.OK);
        }

        /**
         * 기본 라벨 삭제
         * @param workNo
         * @return ResponseEntity
         * @throws Exception
         */

        @GetMapping(value="/deleteBasicLabel")
        public ResponseEntity<Object> deleteBasicLabel(HttpServletRequest httpRequest,
                                                              @RequestParam(value="workNo")Long workNo) {
                HashMap<String, Object> deleteMap = new HashMap<String, Object>();
                deleteMap.put("workNo",workNo);
                deleteMap.put("workStep",4);
                kfashionLabelService.deleteBasicLabel(deleteMap);
                return new ResponseEntity<Object>(HttpStatus.OK);
        }


        @PostMapping(value = "/updateBasicLabel")
        public ResponseEntity<Object> updateBasicLabel(HttpServletRequest httpServletRequest,
                                                 @RequestBody BasicLabel basicLabel) throws Exception{
                System.out.println("basicLabelList"+basicLabel);
                Map<String,Object> updateMap = new HashMap<>();
                updateMap.put("workNo",basicLabel.getWorkNo());
                updateMap.put("workStep",basicLabel.getWorkStep());
                kfashionCommentService.updateComment(updateMap);
                if(basicLabel.getLabelNo1() == 1) {
                        System.out.println("case1실행한다");
                        KfashionLabel basic1 = new KfashionLabel();
                        basic1.setWorkNo(basicLabel.getWorkNo());
                        basic1.setWorkStep(basicLabel.getWorkStep());
                        basic1.setLabelNo(1);
                        basic1.setNo(1);
                        basic1.setCategoryNo(basicLabel.getColorCategoryNo1());
                        basic1.setCategoryItemNo(basicLabel.getColor1());
                        basic1.setCreatedId(basicLabel.getCreatedId());
                        kfashionLabelService.insertBasicLabel(basic1);
                        if (basicLabel.getSubColor1() != 0) {
                                basic1.setNo(2);
                                basic1.setCategoryNo(basicLabel.getSubColorCategoryNo1());
                                basic1.setCategoryItemNo(basicLabel.getSubColor1());
                                kfashionLabelService.insertBasicLabel(basic1);
                        }
                        basic1.setNo(3);
                        basic1.setCategoryNo(basicLabel.getSleeveLengthCategoryNo1());
                        basic1.setCategoryItemNo(basicLabel.getSleeveLength1());
                        kfashionLabelService.insertBasicLabel(basic1);
                }
                if(basicLabel.getLabelNo2() == 2) {
                        System.out.println("case2실행한다");
                        KfashionLabel basic2 = new KfashionLabel();
                        basic2.setWorkNo(basicLabel.getWorkNo());
                        basic2.setWorkStep(basicLabel.getWorkStep());
                        basic2.setLabelNo(2);
                        basic2.setNo(1);
                        basic2.setCategoryNo(basicLabel.getColorCategoryNo2());
                        basic2.setCategoryItemNo(basicLabel.getColor2());
                        basic2.setCreatedId(basicLabel.getCreatedId());
                        kfashionLabelService.insertBasicLabel(basic2);
                        if (basicLabel.getSubColor2() != 0) {
                                basic2.setNo(2);
                                basic2.setCategoryNo(basicLabel.getSubColorCategoryNo2());
                                basic2.setCategoryItemNo(basicLabel.getSubColor2());
                                kfashionLabelService.insertBasicLabel(basic2);
                        }
                        basic2.setNo(3);
                        basic2.setCategoryNo(basicLabel.getSleeveLengthCategoryNo2());
                        basic2.setCategoryItemNo(basicLabel.getSleeveLength2());
                        kfashionLabelService.insertBasicLabel(basic2);
                }
                if(basicLabel.getLabelNo3() == 3) {
                        System.out.println("case3실행한다");
                        KfashionLabel basic3 = new KfashionLabel();
                        basic3.setWorkNo(basicLabel.getWorkNo());
                        basic3.setWorkStep(basicLabel.getWorkStep());
                        basic3.setLabelNo(3);
                        basic3.setNo(1);
                        basic3.setCategoryNo(basicLabel.getColorCategoryNo3());
                        basic3.setCategoryItemNo(basicLabel.getColor3());
                        basic3.setCreatedId(basicLabel.getCreatedId());
                        kfashionLabelService.insertBasicLabel(basic3);
                        if (basicLabel.getSubColor3() != 0) {
                                basic3.setNo(2);
                                basic3.setCategoryNo(basicLabel.getSubColorCategoryNo3());
                                basic3.setCategoryItemNo(basicLabel.getSubColor3());
                                kfashionLabelService.insertBasicLabel(basic3);
                        }
                }
                if(basicLabel.getLabelNo4() == 4) {
                        System.out.println("case4실행한다");
                        KfashionLabel basic4 = new KfashionLabel();
                        basic4.setWorkNo(basicLabel.getWorkNo());
                        basic4.setWorkStep(basicLabel.getWorkStep());
                        basic4.setLabelNo(4);
                        basic4.setNo(1);
                        basic4.setCategoryNo(basicLabel.getColorCategoryNo4());
                        basic4.setCategoryItemNo(basicLabel.getColor4());
                        basic4.setCreatedId(basicLabel.getCreatedId());
                        kfashionLabelService.insertBasicLabel(basic4);
                        if (basicLabel.getSubColor3() != 0) {
                                basic4.setNo(2);
                                basic4.setCategoryNo(basicLabel.getSubColorCategoryNo4());
                                basic4.setCategoryItemNo(basicLabel.getSubColor4());
                                kfashionLabelService.insertBasicLabel(basic4);
                        }
                        basic4.setNo(3);
                        basic4.setCategoryNo(basicLabel.getSleeveLengthCategoryNo4());
                        basic4.setCategoryItemNo(basicLabel.getSleeveLength4());
                        kfashionLabelService.insertBasicLabel(basic4);
                }
                return new ResponseEntity<Object>("success",HttpStatus.OK);
        }



        /**
         * 라벨 넘버 리스트
         * @param workNo
         * @return ResponseEntity
         * @throws
         */
        @GetMapping (value = "/labelNoList")
        public ResponseEntity<Object> labelNoList(HttpServletRequest httpRequest,
                                                   @RequestParam (value="workNo")Long workNo) {
                HashMap<String, Object> resultMap = new HashMap<String, Object>();
                List<Integer> labelNoList = kfashionLabelService.selectLabelNoList(workNo);
                resultMap.put("labelNoList", labelNoList);
                System.out.println("labelNoList"+labelNoList);
                return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
        }
}
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

                int[] labelNo = kfashionImageLocationPolygonPointService.selectLabelNo(basicLabel.getWorkNo());

                System.out.println(labelNo);

                for(int i=0; i < 4; i++) {
                        switch (labelNo[i]) {
                                case 1 :
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
                                        if(basicLabel.getSubColor() != 0) {
                                                basic.setNo(2);
                                                basic.setCategoryNo(basicLabel.getColorCategoryNo());
                                                basic.setCategoryItemNo(basicLabel.getSubColor());
                                                kfashionLabelService.insertBasicLabel(basic);
                                        }
                                        basic.setNo(3);
                                        basic.setCategoryNo(basicLabel.getSleeveLengthCategoryNo());
                                        basic.setCategoryItemNo(basicLabel.getSleeveLength());
                                        kfashionLabelService.insertBasicLabel(basic);
                                        break;
                                case 2 :
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
                                        if(basicLabel.getSubColor1() != 0) {
                                                basic1.setNo(2);
                                                basic1.setCategoryNo(basicLabel.getColorCategoryNo());
                                                basic1.setCategoryItemNo(basicLabel.getSubColor1());
                                                kfashionLabelService.insertBasicLabel(basic1);
                                        }
                                        basic1.setNo(3);
                                        basic1.setCategoryNo(basicLabel.getSleeveLengthCategoryNo());
                                        basic1.setCategoryItemNo(basicLabel.getSleeveLength1());
                                        kfashionLabelService.insertBasicLabel(basic1);
                                        break;
                                case 3 :
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
                                        if(basicLabel.getSubColor2() != 0) {
                                                basic2.setNo(2);
                                                basic2.setCategoryNo(basicLabel.getColorCategoryNo());
                                                basic2.setCategoryItemNo(basicLabel.getSubColor2());
                                                kfashionLabelService.insertBasicLabel(basic2);
                                        }
                                        basic2.setNo(3);
                                        basic2.setCategoryNo(basicLabel.getSleeveLengthCategoryNo());
                                        basic2.setCategoryItemNo(basicLabel.getSleeveLength2());
                                        kfashionLabelService.insertBasicLabel(basic2);
                                        break;
                                case 4 :
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
                                        if(basicLabel.getSubColor3() != 0) {
                                                basic3.setNo(2);
                                                basic3.setCategoryNo(basicLabel.getColorCategoryNo());
                                                basic3.setCategoryItemNo(basicLabel.getSubColor3());
                                                kfashionLabelService.insertBasicLabel(basic3);
                                        }
                                        basic3.setNo(3);
                                        basic3.setCategoryNo(basicLabel.getSleeveLengthCategoryNo());
                                        basic3.setCategoryItemNo(basicLabel.getSleeveLength3());
                                        kfashionLabelService.insertBasicLabel(basic3);
                                        break;
                        }
                }

                return new ResponseEntity<Object>("success", HttpStatus.OK);
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
                KfashionLabel professional = new KfashionLabel();
                professional.setWorkNo(professionalLabel.getWorkNo());
                professional.setWorkStep(professionalLabel.getWorkStep());
                professional.setLabelNo(professionalLabel.getLabelNo());
                professional.setNo(1);
                professional.setCategoryNo(professionalLabel.getStyle());
                professional.setCategoryItemNo(professionalLabel.getStyleCategoryNo());
                professional.setCreatedId(professionalLabel.getCreatedId());
                kfashionLabelService.insertProfessionalLabel(professional);

                professional.setNo(2);
                professional.setCategoryNo(professionalLabel.getStyleSub());
                professional.setCategoryItemNo(professionalLabel.getStyleCategorySubNo());
                kfashionLabelService.insertProfessionalLabel(professional);

                professional.setNo(3);
                professional.setCategoryNo(professionalLabel.getCategory());
                professional.setCategoryItemNo(professionalLabel.getCategoryCategoryNo());
                kfashionLabelService.insertProfessionalLabel(professional);

                professional.setNo(4);
                professional.setCategoryNo(professionalLabel.getDetail());
                professional.setCategoryItemNo(professionalLabel.getDetailCategoryNo());
                kfashionLabelService.insertProfessionalLabel(professional);

                professional.setNo(5);
                professional.setCategoryNo(professionalLabel.getPrint());
                professional.setCategoryItemNo(professionalLabel.getPrintCategoryNo());
                kfashionLabelService.insertProfessionalLabel(professional);

                professional.setNo(6);
                professional.setCategoryNo(professionalLabel.getTexture());
                professional.setCategoryItemNo(professionalLabel.getTextureCategoryNo());
                kfashionLabelService.insertProfessionalLabel(professional);

                professional.setNo(7);
                professional.setCategoryNo(professionalLabel.getClothLength());
                professional.setCategoryItemNo(professionalLabel.getClothLengthCategoryNo());
                kfashionLabelService.insertProfessionalLabel(professional);

                professional.setNo(8);
                professional.setCategoryNo(professionalLabel.getNeckLine());
                professional.setCategoryItemNo(professionalLabel.getNeckLineCategoryNo());
                kfashionLabelService.insertProfessionalLabel(professional);

                professional.setNo(9);
                professional.setCategoryNo(professionalLabel.getKara());
                professional.setCategoryItemNo(professionalLabel.getKaraCategoryNo());
                kfashionLabelService.insertProfessionalLabel(professional);

                professional.setNo(10);
                professional.setCategoryNo(professionalLabel.getFit());
                professional.setCategoryItemNo(professionalLabel.getFitCategoryNo());
                kfashionLabelService.insertProfessionalLabel(professional);

                professional.setNo(11);
                professional.setCategoryNo(professionalLabel.getSafe());
                professional.setCategoryItemNo(professionalLabel.getSafeCategoryNo());
                kfashionLabelService.insertProfessionalLabel(professional);

                professional.setNo(12);
                professional.setCategoryNo(professionalLabel.getSilhouette());
                professional.setCategoryItemNo(professionalLabel.getSilhouetteCategoryNo());
                kfashionLabelService.insertProfessionalLabel(professional);

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
}

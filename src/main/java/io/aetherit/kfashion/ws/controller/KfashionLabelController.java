package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.model.*;
import io.aetherit.kfashion.ws.service.KfashionLabelService;
import io.aetherit.kfashion.ws.service.KfashionWorkHistoryService;
import io.aetherit.kfashion.ws.service.KfashionWorkService;
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

        @Autowired
        public KfashionLabelController(KfashionLabelService kfashionLabelService,
                                       KfashionWorkHistoryService kfashionWorkHistoryService,
                                       KfashionWorkService kfashionWorkService) {
            this.kfashionLabelService = kfashionLabelService;
            this.kfashionWorkHistoryService = kfashionWorkHistoryService;
            this.kfashionWorkService = kfashionWorkService;
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
                KfashionWork work = new KfashionWork();
                work.setNo(basicLabel.getWorkNo());
                work.setWorkState(basicLabel.getWorkStep());
                kfashionWorkService.updateWork(work);

                KfashionWorkHistory workHistory = new KfashionWorkHistory();
                workHistory.setWorkNo(basicLabel.getWorkNo());
                workHistory.setWorkStep(basicLabel.getWorkStep());
                workHistory.setCreatedId(basicLabel.getCreatedId());
                kfashionWorkHistoryService.insertWorkHistory(workHistory);
                KfashionLabel basic = new KfashionLabel();
                basic.setWorkNo(basicLabel.getWorkNo());
                basic.setWorkStep(basicLabel.getWorkStep());
                basic.setLabelNo(basicLabel.getLabelNo());
                basic.setNo(1);
                basic.setCategoryNo(basicLabel.getColor());
                basic.setCategoryItemNo(basicLabel.getColorCategoryNo());
                basic.setCreatedId(basicLabel.getCreatedId());
                kfashionLabelService.insertBasicLabel(basic);
                basic.setNo(2);
                basic.setCategoryNo(basicLabel.getSleeveLength());
                basic.setCategoryItemNo(basicLabel.getSleeveLengthCategoryNo());
                kfashionLabelService.insertBasicLabel(basic);
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

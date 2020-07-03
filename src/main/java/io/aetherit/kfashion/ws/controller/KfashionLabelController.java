package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.model.*;
import io.aetherit.kfashion.ws.service.KfashionLabelService;
import io.aetherit.kfashion.ws.service.KfashionWorkHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/v1/kfashion/label")
public class KfashionLabelController {

        private KfashionLabelService kfashionLabelService;
        private KfashionWorkHistoryService kfashionWorkHistoryService;

        @Autowired
        public KfashionLabelController(KfashionLabelService kfashionLabelService,
                                       KfashionWorkHistoryService kfashionWorkHistoryService) {
            this.kfashionLabelService = kfashionLabelService;
            this.kfashionWorkHistoryService = kfashionWorkHistoryService;
        }


        @PostMapping(value = "/basicLabel")
        public ResponseEntity<Object> basicLabel(HttpServletRequest httpServletRequest,
                                                 @RequestBody BasicLabel basicLabel) throws Exception{
                KfashionWorkHistory workHistory = new KfashionWorkHistory();
                workHistory.setWorkNo(basicLabel.getWorkNo());
                workHistory.setWorkStep(basicLabel.getWorkStep());
                workHistory.setCreatedId(basicLabel.getCreatedId());
                kfashionWorkHistoryService.insertWorkHistory(workHistory);
                KfashionLabel basic = new KfashionLabel();
                basic.setWorkNo(basicLabel.getWorkNo());
                basic.setWorkStep(basicLabel.getWorkStep());
                basic.setLabelNo(1);
                basic.setCategoryNo(basicLabel.getColor());
                basic.setCategoryItemNo(basicLabel.getColorCategoryNo());
                basic.setCreatedId(basicLabel.getCreatedId());
                kfashionLabelService.insertBasicLabel(basic);
                basic.setLabelNo(2);
                basic.setCategoryNo(basicLabel.getSleeveLength());
                basic.setCategoryItemNo(basicLabel.getSleeveLengthCategoryNo());
                kfashionLabelService.insertBasicLabel(basic);
                return new ResponseEntity<Object>("success", HttpStatus.OK);
        }

        @PostMapping(value = "/professionalLabel")
        public ResponseEntity<Object> professionalLabel(HttpServletRequest httpServletRequest,
                                      @RequestBody ProfessionalLabel professionalLabel) throws Exception {

                KfashionWorkHistory workHistory = new KfashionWorkHistory();
                workHistory.setWorkNo(professionalLabel.getWorkNo());
                workHistory.setWorkStep(professionalLabel.getWorkStep());
                workHistory.setCreatedId(professionalLabel.getCreatedId());
                kfashionWorkHistoryService.insertWorkHistory(workHistory);
                KfashionLabel professional = new KfashionLabel();
                professional.setWorkNo(professionalLabel.getWorkNo());
                professional.setWorkStep(professionalLabel.getWorkStep());
                professional.setLabelNo(1);
                professional.setCategoryNo(professionalLabel.getStyle());
                professional.setCategoryItemNo(professionalLabel.getStyleCategoryNo());
                professional.setCreatedId(professionalLabel.getCreatedId());
                kfashionLabelService.insertProfessionalLabel(professional);

                professional.setLabelNo(2);
                professional.setCategoryNo(professionalLabel.getStyleSub());
                professional.setCategoryItemNo(professionalLabel.getStyleCategorySubNo());
                kfashionLabelService.insertProfessionalLabel(professional);

                professional.setLabelNo(3);
                professional.setCategoryNo(professionalLabel.getCategory());
                professional.setCategoryItemNo(professionalLabel.getCategoryCategoryNo());
                kfashionLabelService.insertProfessionalLabel(professional);

                professional.setLabelNo(4);
                professional.setCategoryNo(professionalLabel.getDetail());
                professional.setCategoryItemNo(professionalLabel.getDetailCategoryNo());
                kfashionLabelService.insertProfessionalLabel(professional);

                professional.setLabelNo(5);
                professional.setCategoryNo(professionalLabel.getPrint());
                professional.setCategoryItemNo(professionalLabel.getPrintCategoryNo());
                kfashionLabelService.insertProfessionalLabel(professional);

                professional.setLabelNo(6);
                professional.setCategoryNo(professionalLabel.getTexture());
                professional.setCategoryItemNo(professionalLabel.getTextureCategoryNo());
                kfashionLabelService.insertProfessionalLabel(professional);

                professional.setLabelNo(7);
                professional.setCategoryNo(professionalLabel.getClothLength());
                professional.setCategoryItemNo(professionalLabel.getClothLengthCategoryNo());
                kfashionLabelService.insertProfessionalLabel(professional);

                professional.setLabelNo(8);
                professional.setCategoryNo(professionalLabel.getNeckLine());
                professional.setCategoryItemNo(professionalLabel.getNeckLineCategoryNo());
                kfashionLabelService.insertProfessionalLabel(professional);

                professional.setLabelNo(9);
                professional.setCategoryNo(professionalLabel.getKara());
                professional.setCategoryItemNo(professionalLabel.getKaraCategoryNo());
                kfashionLabelService.insertProfessionalLabel(professional);

                professional.setLabelNo(10);
                professional.setCategoryNo(professionalLabel.getFit());
                professional.setCategoryItemNo(professionalLabel.getFitCategoryNo());
                kfashionLabelService.insertProfessionalLabel(professional);

                professional.setLabelNo(11);
                professional.setCategoryNo(professionalLabel.getSafe());
                professional.setCategoryItemNo(professionalLabel.getSafeCategoryNo());
                kfashionLabelService.insertProfessionalLabel(professional);

                professional.setLabelNo(12);
                professional.setCategoryNo(professionalLabel.getSilhouette());
                professional.setCategoryItemNo(professionalLabel.getSilhouetteCategoryNo());
                kfashionLabelService.insertProfessionalLabel(professional);

                return new ResponseEntity<Object>("success", HttpStatus.OK);
        }


}

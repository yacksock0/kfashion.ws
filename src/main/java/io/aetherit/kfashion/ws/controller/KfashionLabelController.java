package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.model.*;
import io.aetherit.kfashion.ws.service.*;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/v1/kfashion/label")
public class KfashionLabelController {

    private KfashionCommentService kfashionCommentService;
    private KfashionLabelService kfashionLabelService;
    private KfashionWorkHistoryService kfashionWorkHistoryService;
    private KfashionWorkService kfashionWorkService;
    private KfashionImageLocationPolygonPointService kfashionImageLocationPolygonPointService;
    private KfashionImageLocationRectService kfashionImageLocationRectService;
    private KfashionImageService kfashionImageService;

    @Autowired
    public KfashionLabelController(KfashionLabelService kfashionLabelService,
                                   KfashionWorkHistoryService kfashionWorkHistoryService,
                                   KfashionWorkService kfashionWorkService,
                                   KfashionImageLocationPolygonPointService kfashionImageLocationPolygonPointService,
                                   KfashionCommentService kfashionCommentService,
                                   KfashionImageLocationRectService kfashionImageLocationRectService,
                                   KfashionImageService kfashionImageService) {
        this.kfashionLabelService = kfashionLabelService;
        this.kfashionWorkHistoryService = kfashionWorkHistoryService;
        this.kfashionWorkService = kfashionWorkService;
        this.kfashionImageLocationPolygonPointService = kfashionImageLocationPolygonPointService;
        this.kfashionCommentService = kfashionCommentService;
        this.kfashionImageLocationRectService = kfashionImageLocationRectService;
        this.kfashionImageService = kfashionImageService;
    }

    /**
     * 기본라벨 인서트
     *
     * @param httpServletRequest
     * @param basicLabel
     * @return ResponseEntity
     * @throws Exception
     */

    @PostMapping(value = "/basicLabel")
    public ResponseEntity<Object> basicLabel(HttpServletRequest httpServletRequest,
                                             @RequestBody BasicLabel basicLabel) throws Exception {
        kfashionLabelService.setBasicLabel(basicLabel);
        return new ResponseEntity<Object>(HttpStatus.OK);
    }

    /**
     * 전문가라벨 인서트
     *
     * @param httpServletRequest
     * @param professionalLabel
     * @return ResponseEntity
     * @throws Exception
     */

    @PostMapping(value = "/professionalLabel")
    public ResponseEntity<Object> professionalLabel(HttpServletRequest httpServletRequest,
                                                    @RequestBody ProfessionalLabel professionalLabel) throws Exception {
        kfashionLabelService.setProfessionalLabel(professionalLabel);
        return new ResponseEntity<Object>("success", HttpStatus.OK);
    }


    /**
     * 기본 라벨 리스트
     *
     * @param createdId
     * @return ResponseEntity
     * @throws Exception
     */
    @GetMapping(value = "/basicLabelList")
    public ResponseEntity<Object> basicLabelList(HttpServletRequest httpRequest,
                                                 @RequestParam(value = "createdId") String createdId) {
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        List<KfashionLabel> basicLabelList = kfashionLabelService.selectBasicLabelList(createdId);
        resultMap.put("basicLabelList", basicLabelList);
        System.out.println(basicLabelList);
        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }

    /**
     * 전문가 라벨 리뷰리스트
     *
     * @param workNo
     * @return ResponseEntity
     * @throws Exception
     */

    @GetMapping(value = "/reviewLabelList")
    public ResponseEntity<Object> reviewLabelList(HttpServletRequest httpRequest,
                                                  @RequestParam(value = "workNo") Long workNo) {


        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        int[] labelNo = kfashionLabelService.selectLabelList(workNo);
        int labelNo1 = 0;
        int labelNo2 = 0;
        int labelNo3 = 0;
        int labelNo4 = 0;
        int labelNo5 = 0;

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
            if (labelNo[i] == 5) {
                labelNo5 = 5;
            }

        }

        if (labelNo1 == 1) {
            List<Integer> detailCategoryNo = new ArrayList<>();
            List<Integer> detail = new ArrayList<>();
            List<String> detailItemName = new ArrayList<>();

            List<Integer> printCategoryNo = new ArrayList<>();
            List<Integer> print = new ArrayList<>();
            List<String> printItemName = new ArrayList<>();

            List<Integer> textureCategoryNo = new ArrayList<>();
            List<Integer> texture = new ArrayList<>();
            List<String> textureItemName = new ArrayList<>();

            List<KfashionLabel> outerReviewLabelList = kfashionLabelService.selectOuterReviewLabelList(workNo);
            ReviewLabel outerReviewLabel = new ReviewLabel();


            for (int i = 0; i < outerReviewLabelList.size(); i++) {
                if (outerReviewLabelList.get(i).getCategoryName().equals("카테고리")) {
                    outerReviewLabel.setCategoryCategoryNo1(outerReviewLabelList.get(i).getCategoryNo());
                    outerReviewLabel.setCategory1(outerReviewLabelList.get(i).getCategoryItemNo());
                    outerReviewLabel.setCategoryItemName1(outerReviewLabelList.get(i).getCategoryItemName());
                }
                if (outerReviewLabelList.get(i).getCategoryName().equals("디테일")) {

                    detailCategoryNo.add(outerReviewLabelList.get(i).getCategoryNo());
                    detail.add(outerReviewLabelList.get(i).getCategoryItemNo());
                    detailItemName.add(outerReviewLabelList.get(i).getCategoryItemName());

                    outerReviewLabel.setDetailCategoryNo1(detailCategoryNo);
                    outerReviewLabel.setDetail1(detail);
                    outerReviewLabel.setDetailItemName1(detailItemName);

                }
                if (outerReviewLabelList.get(i).getCategoryName().equals("프린트")) {

                    printCategoryNo.add(outerReviewLabelList.get(i).getCategoryNo());
                    print.add(outerReviewLabelList.get(i).getCategoryItemNo());
                    printItemName.add(outerReviewLabelList.get(i).getCategoryItemName());

                    outerReviewLabel.setPrintCategoryNo1(printCategoryNo);
                    outerReviewLabel.setPrint1(print);
                    outerReviewLabel.setPrintItemName1(printItemName);

                }
                if (outerReviewLabelList.get(i).getCategoryName().equals("소재")) {
                    textureCategoryNo.add(outerReviewLabelList.get(i).getCategoryNo());
                    texture.add(outerReviewLabelList.get(i).getCategoryItemNo());
                    textureItemName.add(outerReviewLabelList.get(i).getCategoryItemName());

                    outerReviewLabel.setTextureCategoryNo1(textureCategoryNo);
                    outerReviewLabel.setTexture1(texture);
                    outerReviewLabel.setTextureItemName1(textureItemName);

                }
                if (outerReviewLabelList.get(i).getCategoryName().equals("기장")) {
                    outerReviewLabel.setClothLengthCategoryNo1(outerReviewLabelList.get(i).getCategoryNo());
                    outerReviewLabel.setClothLength1(outerReviewLabelList.get(i).getCategoryItemNo());
                    outerReviewLabel.setClothLengthItemName1(outerReviewLabelList.get(i).getCategoryItemName());
                }
                if (outerReviewLabelList.get(i).getCategoryName().equals("넥라인")) {
                    outerReviewLabel.setNeckLineCategoryNo1(outerReviewLabelList.get(i).getCategoryNo());
                    outerReviewLabel.setNeckLine1(outerReviewLabelList.get(i).getCategoryItemNo());
                    outerReviewLabel.setNeckLineItemName1(outerReviewLabelList.get(i).getCategoryItemName());
                }
                if (outerReviewLabelList.get(i).getCategoryName().equals("옷깃")) {
                    outerReviewLabel.setKaraCategoryNo1(outerReviewLabelList.get(i).getCategoryNo());
                    outerReviewLabel.setKara1(outerReviewLabelList.get(i).getCategoryItemNo());
                    outerReviewLabel.setKaraItemName1(outerReviewLabelList.get(i).getCategoryItemName());
                }
                if (outerReviewLabelList.get(i).getCategoryName().equals("핏")) {
                    outerReviewLabel.setFitCategoryNo1(outerReviewLabelList.get(i).getCategoryNo());
                    outerReviewLabel.setFit1(outerReviewLabelList.get(i).getCategoryItemNo());
                    outerReviewLabel.setFitItemName1(outerReviewLabelList.get(i).getCategoryItemName());
                }
            }
            resultMap.put("outerReviewLabel", outerReviewLabel);
        }
        if (labelNo2 == 2) {
            List<Integer> detailCategoryNo = new ArrayList<>();
            List<Integer> detail = new ArrayList<>();
            List<String> detailItemName = new ArrayList<>();

            List<Integer> printCategoryNo = new ArrayList<>();
            List<Integer> print = new ArrayList<>();
            List<String> printItemName = new ArrayList<>();

            List<Integer> textureCategoryNo = new ArrayList<>();
            List<Integer> texture = new ArrayList<>();
            List<String> textureItemName = new ArrayList<>();

            List<KfashionLabel> topReviewLabelList = kfashionLabelService.selectTopReviewLabelList(workNo);
            ReviewLabel topReviewLabel = new ReviewLabel();
            for (int i = 0; i < topReviewLabelList.size(); i++) {
                if (topReviewLabelList.get(i).getCategoryName().equals("카테고리")) {
                    topReviewLabel.setCategoryCategoryNo2(topReviewLabelList.get(i).getCategoryNo());
                    topReviewLabel.setCategory2(topReviewLabelList.get(i).getCategoryItemNo());
                    topReviewLabel.setCategoryItemName2(topReviewLabelList.get(i).getCategoryItemName());
                }
                if (topReviewLabelList.get(i).getCategoryName().equals("디테일")) {

                    detailCategoryNo.add(topReviewLabelList.get(i).getCategoryNo());
                    detail.add(topReviewLabelList.get(i).getCategoryItemNo());
                    detailItemName.add(topReviewLabelList.get(i).getCategoryItemName());

                    topReviewLabel.setDetailCategoryNo2(detailCategoryNo);
                    topReviewLabel.setDetail2(detail);
                    topReviewLabel.setDetailItemName2(detailItemName);

                }
                if (topReviewLabelList.get(i).getCategoryName().equals("프린트")) {
                    printCategoryNo.add(topReviewLabelList.get(i).getCategoryNo());
                    print.add(topReviewLabelList.get(i).getCategoryItemNo());
                    printItemName.add(topReviewLabelList.get(i).getCategoryItemName());

                    topReviewLabel.setPrintCategoryNo2(printCategoryNo);
                    topReviewLabel.setPrint2(print);
                    topReviewLabel.setPrintItemName2(printItemName);

                }
                if (topReviewLabelList.get(i).getCategoryName().equals("소재")) {
                    textureCategoryNo.add(topReviewLabelList.get(i).getCategoryNo());
                    texture.add(topReviewLabelList.get(i).getCategoryItemNo());
                    textureItemName.add(topReviewLabelList.get(i).getCategoryItemName());

                    topReviewLabel.setTextureCategoryNo2(textureCategoryNo);
                    topReviewLabel.setTexture2(texture);
                    topReviewLabel.setTextureItemName2(textureItemName);

                }
                if (topReviewLabelList.get(i).getCategoryName().equals("기장")) {
                    topReviewLabel.setClothLengthCategoryNo2(topReviewLabelList.get(i).getCategoryNo());
                    topReviewLabel.setClothLength2(topReviewLabelList.get(i).getCategoryItemNo());
                    topReviewLabel.setClothLengthItemName2(topReviewLabelList.get(i).getCategoryItemName());
                }
                if (topReviewLabelList.get(i).getCategoryName().equals("넥라인")) {
                    topReviewLabel.setNeckLineCategoryNo2(topReviewLabelList.get(i).getCategoryNo());
                    topReviewLabel.setNeckLine2(topReviewLabelList.get(i).getCategoryItemNo());
                    topReviewLabel.setNeckLineItemName2(topReviewLabelList.get(i).getCategoryItemName());
                }
                if (topReviewLabelList.get(i).getCategoryName().equals("옷깃")) {
                    topReviewLabel.setKaraCategoryNo2(topReviewLabelList.get(i).getCategoryNo());
                    topReviewLabel.setKara2(topReviewLabelList.get(i).getCategoryItemNo());
                    topReviewLabel.setKaraItemName2(topReviewLabelList.get(i).getCategoryItemName());
                }
                if (topReviewLabelList.get(i).getCategoryName().equals("핏")) {
                    topReviewLabel.setFitCategoryNo2(topReviewLabelList.get(i).getCategoryNo());
                    topReviewLabel.setFit2(topReviewLabelList.get(i).getCategoryItemNo());
                    topReviewLabel.setFitItemName2(topReviewLabelList.get(i).getCategoryItemName());
                }
            }
            resultMap.put("topReviewLabel", topReviewLabel);
        }
        if (labelNo3 == 3) {
            List<Integer> detailCategoryNo = new ArrayList<>();
            List<Integer> detail = new ArrayList<>();
            List<String> detailItemName = new ArrayList<>();

            List<Integer> printCategoryNo = new ArrayList<>();
            List<Integer> print = new ArrayList<>();
            List<String> printItemName = new ArrayList<>();

            List<Integer> textureCategoryNo = new ArrayList<>();
            List<Integer> texture = new ArrayList<>();
            List<String> textureItemName = new ArrayList<>();

            List<KfashionLabel> pantsReviewLabelList = kfashionLabelService.selectPantsReviewLabelList(workNo);
            ReviewLabel pantsReviewLabel = new ReviewLabel();
            for (int i = 0; i < pantsReviewLabelList.size(); i++) {
                if (pantsReviewLabelList.get(i).getCategoryName().equals("카테고리")) {
                    pantsReviewLabel.setCategoryCategoryNo3(pantsReviewLabelList.get(i).getCategoryNo());
                    pantsReviewLabel.setCategory3(pantsReviewLabelList.get(i).getCategoryItemNo());
                    pantsReviewLabel.setCategoryItemName3(pantsReviewLabelList.get(i).getCategoryItemName());
                }
                if (pantsReviewLabelList.get(i).getCategoryName().equals("디테일")) {
                    detailCategoryNo.add(pantsReviewLabelList.get(i).getCategoryNo());
                    detail.add(pantsReviewLabelList.get(i).getCategoryItemNo());
                    detailItemName.add(pantsReviewLabelList.get(i).getCategoryItemName());

                    pantsReviewLabel.setDetailCategoryNo3(detailCategoryNo);
                    pantsReviewLabel.setDetail3(detail);
                    pantsReviewLabel.setDetailItemName3(detailItemName);
                }
                if (pantsReviewLabelList.get(i).getCategoryName().equals("프린트")) {

                    printCategoryNo.add(pantsReviewLabelList.get(i).getCategoryNo());
                    print.add(pantsReviewLabelList.get(i).getCategoryItemNo());
                    printItemName.add(pantsReviewLabelList.get(i).getCategoryItemName());

                    pantsReviewLabel.setPrintCategoryNo3(printCategoryNo);
                    pantsReviewLabel.setPrint3(print);
                    pantsReviewLabel.setPrintItemName3(printItemName);

                }
                if (pantsReviewLabelList.get(i).getCategoryName().equals("소재")) {

                    textureCategoryNo.add(pantsReviewLabelList.get(i).getCategoryNo());
                    texture.add(pantsReviewLabelList.get(i).getCategoryItemNo());
                    textureItemName.add(pantsReviewLabelList.get(i).getCategoryItemName());

                    pantsReviewLabel.setTextureCategoryNo3(textureCategoryNo);
                    pantsReviewLabel.setTexture3(texture);
                    pantsReviewLabel.setTextureItemName3(textureItemName);

                }
                if (pantsReviewLabelList.get(i).getCategoryName().equals("기장")) {
                    pantsReviewLabel.setClothLengthCategoryNo3(pantsReviewLabelList.get(i).getCategoryNo());
                    pantsReviewLabel.setClothLength3(pantsReviewLabelList.get(i).getCategoryItemNo());
                    pantsReviewLabel.setClothLengthItemName3(pantsReviewLabelList.get(i).getCategoryItemName());
                }
                if (pantsReviewLabelList.get(i).getCategoryName().equals("핏")) {
                    pantsReviewLabel.setFitCategoryNo3(pantsReviewLabelList.get(i).getCategoryNo());
                    pantsReviewLabel.setFit3(pantsReviewLabelList.get(i).getCategoryItemNo());
                    pantsReviewLabel.setFitItemName3(pantsReviewLabelList.get(i).getCategoryItemName());
                }
            }
            resultMap.put("pantsReviewLabel", pantsReviewLabel);
        }
        if (labelNo4 == 4) {
            List<Integer> detailCategoryNo = new ArrayList<>();
            List<Integer> detail = new ArrayList<>();
            List<String> detailItemName = new ArrayList<>();

            List<Integer> printCategoryNo = new ArrayList<>();
            List<Integer> print = new ArrayList<>();
            List<String> printItemName = new ArrayList<>();

            List<Integer> textureCategoryNo = new ArrayList<>();
            List<Integer> texture = new ArrayList<>();
            List<String> textureItemName = new ArrayList<>();

            List<KfashionLabel> onePieceReviewLabelList = kfashionLabelService.selectOnePieceReviewLabelList(workNo);
            ReviewLabel onePieceReviewLabel = new ReviewLabel();
            for (int i = 0; i < onePieceReviewLabelList.size(); i++) {
                if (onePieceReviewLabelList.get(i).getCategoryName().equals("카테고리")) {
                    onePieceReviewLabel.setCategoryCategoryNo4(onePieceReviewLabelList.get(i).getCategoryNo());
                    onePieceReviewLabel.setCategory4(onePieceReviewLabelList.get(i).getCategoryItemNo());
                    onePieceReviewLabel.setCategoryItemName4(onePieceReviewLabelList.get(i).getCategoryItemName());
                }
                if (onePieceReviewLabelList.get(i).getCategoryName().equals("디테일")) {
                    detailCategoryNo.add(onePieceReviewLabelList.get(i).getCategoryNo());
                    detail.add(onePieceReviewLabelList.get(i).getCategoryItemNo());
                    detailItemName.add(onePieceReviewLabelList.get(i).getCategoryItemName());

                    onePieceReviewLabel.setDetailCategoryNo4(detailCategoryNo);
                    onePieceReviewLabel.setDetail4(detail);
                    onePieceReviewLabel.setDetailItemName4(detailItemName);
                }
                if (onePieceReviewLabelList.get(i).getCategoryName().equals("프린트")) {

                    printCategoryNo.add(onePieceReviewLabelList.get(i).getCategoryNo());
                    print.add(onePieceReviewLabelList.get(i).getCategoryItemNo());
                    printItemName.add(onePieceReviewLabelList.get(i).getCategoryItemName());

                    onePieceReviewLabel.setPrintCategoryNo4(printCategoryNo);
                    onePieceReviewLabel.setPrint4(print);
                    onePieceReviewLabel.setPrintItemName4(printItemName);

                }
                if (onePieceReviewLabelList.get(i).getCategoryName().equals("소재")) {
                    textureCategoryNo.add(onePieceReviewLabelList.get(i).getCategoryNo());
                    texture.add(onePieceReviewLabelList.get(i).getCategoryItemNo());
                    textureItemName.add(onePieceReviewLabelList.get(i).getCategoryItemName());

                    onePieceReviewLabel.setTextureCategoryNo4(textureCategoryNo);
                    onePieceReviewLabel.setTexture4(texture);
                    onePieceReviewLabel.setTextureItemName4(textureItemName);

                }
                if (onePieceReviewLabelList.get(i).getCategoryName().equals("기장")) {
                    onePieceReviewLabel.setClothLengthCategoryNo4(onePieceReviewLabelList.get(i).getCategoryNo());
                    onePieceReviewLabel.setClothLength4(onePieceReviewLabelList.get(i).getCategoryItemNo());
                    onePieceReviewLabel.setClothLengthItemName4(onePieceReviewLabelList.get(i).getCategoryItemName());
                }
                if (onePieceReviewLabelList.get(i).getCategoryName().equals("넥라인")) {
                    onePieceReviewLabel.setNeckLineCategoryNo4(onePieceReviewLabelList.get(i).getCategoryNo());
                    onePieceReviewLabel.setNeckLine4(onePieceReviewLabelList.get(i).getCategoryItemNo());
                    onePieceReviewLabel.setNeckLineItemName4(onePieceReviewLabelList.get(i).getCategoryItemName());
                }
                if (onePieceReviewLabelList.get(i).getCategoryName().equals("옷깃")) {
                    onePieceReviewLabel.setKaraCategoryNo4(onePieceReviewLabelList.get(i).getCategoryNo());
                    onePieceReviewLabel.setKara4(onePieceReviewLabelList.get(i).getCategoryItemNo());
                    onePieceReviewLabel.setKaraItemName4(onePieceReviewLabelList.get(i).getCategoryItemName());
                }
                if (onePieceReviewLabelList.get(i).getCategoryName().equals("핏")) {
                    onePieceReviewLabel.setFitCategoryNo4(onePieceReviewLabelList.get(i).getCategoryNo());
                    onePieceReviewLabel.setFit4(onePieceReviewLabelList.get(i).getCategoryItemNo());
                    onePieceReviewLabel.setFitItemName4(onePieceReviewLabelList.get(i).getCategoryItemName());
                }
            }
            resultMap.put("onePieceReviewLabel", onePieceReviewLabel);
        }
        if (labelNo5 == 5) {
            List<KfashionLabel> styleReviewLabelList = kfashionLabelService.selectStyleReviewLabelList(workNo);
            if (styleReviewLabelList.size() == 2) {
                ReviewLabel styleReviewLabel = ReviewLabel.builder()
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
            } else {
                ReviewLabel styleReviewLabel = ReviewLabel.builder()
                        .styleCategoryNo(styleReviewLabelList.get(0).getCategoryNo())
                        .style(styleReviewLabelList.get(0).getCategoryItemNo())
                        .styleItemName(styleReviewLabelList.get(0).getCategoryItemName())
                        .labelNo1(labelNo1)
                        .labelNo2(labelNo2)
                        .labelNo3(labelNo3)
                        .labelNo4(labelNo4)
                        .labelNo5(labelNo5)
                        .build();
                resultMap.put("styleReviewLabel", styleReviewLabel);
            }
        }
        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }

    /**
     * 일반 라벨 리뷰 리스트
     *
     * @param workNo
     * @return ResponseEntity
     * @throws Exception
     */

    @GetMapping(value = "/reviewHighLabelList")
    public ResponseEntity<Object> reviewHighLabelList(HttpServletRequest httpRequest,
                                                      @RequestParam(value = "workNo") Long workNo) {
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
        if (labelNo1 == 1) {
            List<KfashionLabel> outerReviewHighLabelList = kfashionLabelService.selectOuterReviewHighLabelList(workNo);
            if (outerReviewHighLabelList.size() == 2) {
                HighReviewLabel outerReviewHighLabel = HighReviewLabel.builder()
                        .colorCategoryNo1(outerReviewHighLabelList.get(0).getCategoryNo())
                        .color1(outerReviewHighLabelList.get(0).getCategoryItemNo())
                        .colorItemName1(outerReviewHighLabelList.get(0).getCategoryItemName())
                        .colorItemMemo1(outerReviewHighLabelList.get(0).getCategoryItemMemo())
                        .sleeveLengthCategoryNo1(outerReviewHighLabelList.get(1).getCategoryNo())
                        .sleeveLength1(outerReviewHighLabelList.get(1).getCategoryItemNo())
                        .sleeveLengthItemName1(outerReviewHighLabelList.get(1).getCategoryItemName())
                        .labelNo1(labelNo1)
                        .build();
                resultMap.put("outerReviewHighLabel", outerReviewHighLabel);
            } else {
                HighReviewLabel outerReviewHighLabel = HighReviewLabel.builder()
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
                        .labelNo1(labelNo1)
                        .build();
                resultMap.put("outerReviewHighLabel", outerReviewHighLabel);
            }
        }
        if (labelNo2 == 2) {
            List<KfashionLabel> topReviewHighLabelList = kfashionLabelService.selectTopReviewHighLabelList(workNo);
            if (topReviewHighLabelList.size() == 2) {
                HighReviewLabel topReviewHighLabel = HighReviewLabel.builder()
                        .colorCategoryNo2(topReviewHighLabelList.get(0).getCategoryNo())
                        .color2(topReviewHighLabelList.get(0).getCategoryItemNo())
                        .colorItemName2(topReviewHighLabelList.get(0).getCategoryItemName())
                        .colorItemMemo2(topReviewHighLabelList.get(0).getCategoryItemMemo())
                        .sleeveLengthCategoryNo2(topReviewHighLabelList.get(1).getCategoryNo())
                        .sleeveLength2(topReviewHighLabelList.get(1).getCategoryItemNo())
                        .sleeveLengthItemName2(topReviewHighLabelList.get(1).getCategoryItemName())
                        .labelNo2(labelNo2)
                        .build();
                resultMap.put("topReviewHighLabel", topReviewHighLabel);
            } else {
                HighReviewLabel topReviewHighLabel = HighReviewLabel.builder()
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
                        .labelNo2(labelNo2)
                        .build();
                resultMap.put("topReviewHighLabel", topReviewHighLabel);
            }
        }
        if (labelNo3 == 3) {
            List<KfashionLabel> pantsReviewHighLabelList = kfashionLabelService.selectPantsReviewHighLabelList(workNo);
            if (pantsReviewHighLabelList.size() == 1) {
                HighReviewLabel pantsReviewHighLabel = HighReviewLabel.builder()
                        .colorCategoryNo3(pantsReviewHighLabelList.get(0).getCategoryNo())
                        .color3(pantsReviewHighLabelList.get(0).getCategoryItemNo())
                        .colorItemName3(pantsReviewHighLabelList.get(0).getCategoryItemName())
                        .colorItemMemo3(pantsReviewHighLabelList.get(0).getCategoryItemMemo())
                        .labelNo3(labelNo3)
                        .build();
                resultMap.put("pantsReviewHighLabel", pantsReviewHighLabel);
            } else {
                HighReviewLabel pantsReviewHighLabel = HighReviewLabel.builder()
                        .colorCategoryNo3(pantsReviewHighLabelList.get(0).getCategoryNo())
                        .color3(pantsReviewHighLabelList.get(0).getCategoryItemNo())
                        .colorItemName3(pantsReviewHighLabelList.get(0).getCategoryItemName())
                        .colorItemMemo3(pantsReviewHighLabelList.get(0).getCategoryItemMemo())
                        .subColorCategoryNo3(pantsReviewHighLabelList.get(1).getCategoryNo())
                        .subColor3(pantsReviewHighLabelList.get(1).getCategoryItemNo())
                        .subColorItemName3(pantsReviewHighLabelList.get(1).getCategoryItemName())
                        .subColorItemMemo3(pantsReviewHighLabelList.get(1).getCategoryItemMemo())
                        .labelNo3(labelNo3)
                        .build();
                resultMap.put("pantsReviewHighLabel", pantsReviewHighLabel);

            }
        }
        if (labelNo4 == 4) {
            List<KfashionLabel> onePieceReviewHighLabelList = kfashionLabelService.selectOnePieceReviewHighLabelList(workNo);
            if (onePieceReviewHighLabelList.size() == 2) {
                HighReviewLabel onePieceReviewHighLabel = HighReviewLabel.builder()
                        .colorCategoryNo4(onePieceReviewHighLabelList.get(0).getCategoryNo())
                        .color4(onePieceReviewHighLabelList.get(0).getCategoryItemNo())
                        .colorItemName4(onePieceReviewHighLabelList.get(0).getCategoryItemName())
                        .colorItemMemo4(onePieceReviewHighLabelList.get(0).getCategoryItemMemo())
                        .sleeveLengthCategoryNo4(onePieceReviewHighLabelList.get(1).getCategoryNo())
                        .sleeveLength4(onePieceReviewHighLabelList.get(1).getCategoryItemNo())
                        .sleeveLengthItemName4(onePieceReviewHighLabelList.get(1).getCategoryItemName())
                        .labelNo4(labelNo4)
                        .build();
                resultMap.put("onePieceReviewHighLabel", onePieceReviewHighLabel);
            } else {
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
                        .labelNo4(labelNo4)
                        .build();
                resultMap.put("onePieceReviewHighLabel", onePieceReviewHighLabel);
            }
        }
        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }

    /**
     * 전문가 라벨 삭제
     *
     * @param workNo
     * @return ResponseEntity
     * @throws Exception
     */

    @GetMapping(value = "/deleteProfessionalLabel")
    public ResponseEntity<Object> deleteProfessionalLabel(HttpServletRequest httpRequest,
                                                          @RequestParam(value = "workNo") long workNo) {
        kfashionLabelService.deleteProfessionalLabel(workNo);
//        HashMap<String, Object> deleteMap = new HashMap<String, Object>();
//        deleteMap.put("workNo", workNo);
//        deleteMap.put("workStep", 6);
//        kfashionLabelService.deleteProfessionalLabel(deleteMap);
//        kfashionWorkHistoryService.deleteProfessionalLabelWorkHistory(deleteMap);
        return new ResponseEntity<Object>(HttpStatus.OK);
    }

    /**
     * 기본 라벨 삭제
     *
     * @param workNo
     * @return ResponseEntity
     * @throws Exception
     */

    @GetMapping(value = "/deleteBasicLabel")
    public ResponseEntity<Object> deleteBasicLabel(HttpServletRequest httpRequest,
                                                   @RequestParam(value = "workNo") long workNo) {
//        HashMap<String, Object> deleteMap = new HashMap<String, Object>();
//        deleteMap.put("workNo", workNo);
//        deleteMap.put("workStep", 4);
        kfashionLabelService.deleteBasicLabel(workNo);
        return new ResponseEntity<Object>(HttpStatus.OK);
    }


    @PostMapping(value = "/updateBasicLabel")
    public ResponseEntity<Object> updateBasicLabel(HttpServletRequest httpServletRequest,
                                                   @RequestBody BasicLabel basicLabel) throws Exception {
        kfashionLabelService.updateBasicLabel(basicLabel);
//        Map<String, Object> updateMap = new HashMap<>();
//        updateMap.put("workNo", basicLabel.getWorkNo());
//        updateMap.put("workStep", basicLabel.getWorkStep());
//        kfashionCommentService.updateComment(updateMap);
//        if (basicLabel.getLabelNo1() == 1) {
//            KfashionLabel basic1 = new KfashionLabel();
//            basic1.setWorkNo(basicLabel.getWorkNo());
//            basic1.setWorkStep(basicLabel.getWorkStep());
//            basic1.setLabelNo(1);
//            basic1.setNo(1);
//            basic1.setCategoryNo(basicLabel.getColorCategoryNo1());
//            basic1.setCategoryItemNo(basicLabel.getColor1());
//            basic1.setCreatedId(basicLabel.getCreatedId());
//            kfashionLabelService.insertBasicLabel(basic1);
//            if (basicLabel.getSubColor1() != 0) {
//                basic1.setNo(2);
//                basic1.setCategoryNo(basicLabel.getSubColorCategoryNo1());
//                basic1.setCategoryItemNo(basicLabel.getSubColor1());
//                kfashionLabelService.insertBasicLabel(basic1);
//            }
//            basic1.setNo(3);
//            basic1.setCategoryNo(basicLabel.getSleeveLengthCategoryNo1());
//            basic1.setCategoryItemNo(basicLabel.getSleeveLength1());
//            kfashionLabelService.insertBasicLabel(basic1);
//        }
//        if (basicLabel.getLabelNo2() == 2) {
//            KfashionLabel basic2 = new KfashionLabel();
//            basic2.setWorkNo(basicLabel.getWorkNo());
//            basic2.setWorkStep(basicLabel.getWorkStep());
//            basic2.setLabelNo(2);
//            basic2.setNo(1);
//            basic2.setCategoryNo(basicLabel.getColorCategoryNo2());
//            basic2.setCategoryItemNo(basicLabel.getColor2());
//            basic2.setCreatedId(basicLabel.getCreatedId());
//            kfashionLabelService.insertBasicLabel(basic2);
//            if (basicLabel.getSubColor2() != 0) {
//                basic2.setNo(2);
//                basic2.setCategoryNo(basicLabel.getSubColorCategoryNo2());
//                basic2.setCategoryItemNo(basicLabel.getSubColor2());
//                kfashionLabelService.insertBasicLabel(basic2);
//            }
//            basic2.setNo(3);
//            basic2.setCategoryNo(basicLabel.getSleeveLengthCategoryNo2());
//            basic2.setCategoryItemNo(basicLabel.getSleeveLength2());
//            kfashionLabelService.insertBasicLabel(basic2);
//        }
//        if (basicLabel.getLabelNo3() == 3) {
//            KfashionLabel basic3 = new KfashionLabel();
//            basic3.setWorkNo(basicLabel.getWorkNo());
//            basic3.setWorkStep(basicLabel.getWorkStep());
//            basic3.setLabelNo(3);
//            basic3.setNo(1);
//            basic3.setCategoryNo(basicLabel.getColorCategoryNo3());
//            basic3.setCategoryItemNo(basicLabel.getColor3());
//            basic3.setCreatedId(basicLabel.getCreatedId());
//            kfashionLabelService.insertBasicLabel(basic3);
//            if (basicLabel.getSubColor3() != 0) {
//                basic3.setNo(2);
//                basic3.setCategoryNo(basicLabel.getSubColorCategoryNo3());
//                basic3.setCategoryItemNo(basicLabel.getSubColor3());
//                kfashionLabelService.insertBasicLabel(basic3);
//            }
//        }
//        if (basicLabel.getLabelNo4() == 4) {
//            KfashionLabel basic4 = new KfashionLabel();
//            basic4.setWorkNo(basicLabel.getWorkNo());
//            basic4.setWorkStep(basicLabel.getWorkStep());
//            basic4.setLabelNo(4);
//            basic4.setNo(1);
//            basic4.setCategoryNo(basicLabel.getColorCategoryNo4());
//            basic4.setCategoryItemNo(basicLabel.getColor4());
//            basic4.setCreatedId(basicLabel.getCreatedId());
//            kfashionLabelService.insertBasicLabel(basic4);
//            if (basicLabel.getSubColor3() != 0) {
//                basic4.setNo(2);
//                basic4.setCategoryNo(basicLabel.getSubColorCategoryNo4());
//                basic4.setCategoryItemNo(basicLabel.getSubColor4());
//                kfashionLabelService.insertBasicLabel(basic4);
//            }
//            basic4.setNo(3);
//            basic4.setCategoryNo(basicLabel.getSleeveLengthCategoryNo4());
//            basic4.setCategoryItemNo(basicLabel.getSleeveLength4());
//            kfashionLabelService.insertBasicLabel(basic4);
//        }
        return new ResponseEntity<Object>("success", HttpStatus.OK);
    }


    /**
     * 라벨 넘버 리스트
     *
     * @param workNo
     * @return ResponseEntity
     * @throws
     */
    @GetMapping(value = "/labelNoList")
    public ResponseEntity<Object> labelNoList(HttpServletRequest httpRequest,
                                              @RequestParam(value = "workNo") Long workNo) {
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        List<Integer> labelNoList = kfashionLabelService.selectLabelNoList(workNo);
        resultMap.put("labelNoList", labelNoList);
        System.out.println("labelNoList" + labelNoList);
        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }


    @GetMapping(value="jsonfile")
    public ResponseEntity<Object> jsonFileUp(HttpServletRequest httpRequest ,
                                             @RequestParam(value = "workNo") Long workNo) throws IOException {
        HashMap<String, Object> resultMap = new HashMap<String, Object>();

        JSONObject jsonObject = new JSONObject();
        JSONObject labelObject = new JSONObject();
        JSONObject rectObject = new JSONObject();
        JSONObject polygonObject = new JSONObject();

        jsonObject.put("파일번호", workNo);
        String workName =  kfashionWorkService.selectWorkName(workNo);

        jsonObject.put("파일이름", workName);

        JSONObject outerMap = new JSONObject();
        JSONObject outerRectMap = new JSONObject();
        JSONObject outerPolygonMap = new JSONObject();
        JSONObject topMap = new JSONObject();
        JSONObject topRectMap = new JSONObject();
        JSONObject topPolygonMap = new JSONObject();
        JSONObject pantsMap = new JSONObject();
        JSONObject pantsRectMap = new JSONObject();
        JSONObject pantsPolygonMap = new JSONObject();
        JSONObject onePieceMap = new JSONObject();
        JSONObject onePieceRectMap = new JSONObject();
        JSONObject onePiecePolygonMap = new JSONObject();
        JSONObject styleMap = new JSONObject();

        JSONArray outerLabel = new JSONArray();
        JSONArray outerPolygon = new JSONArray();
        JSONArray outerRect = new JSONArray();
        JSONArray topLabel = new JSONArray();
        JSONArray topPolygon = new JSONArray();
        JSONArray topRect = new JSONArray();
        JSONArray pantsLabel = new JSONArray();
        JSONArray pantsPolygon = new JSONArray();
        JSONArray pantsRect = new JSONArray();
        JSONArray onePieceLabel = new JSONArray();
        JSONArray onePiecePolygon = new JSONArray();
        JSONArray onePieceRect = new JSONArray();
        JSONArray style = new JSONArray();

        int[] labelNo = kfashionLabelService.selectLabelList(workNo);
        int labelNo1 = 0;
        int labelNo2 = 0;
        int labelNo3 = 0;
        int labelNo4 = 0;
        int labelNo5 = 0;
    if(labelNo != null && labelNo.length > 0) {
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
            if (labelNo[i] == 5) {
                labelNo5 = 5;
            }

        }
        if (labelNo1 == 1) {
            List<String> detailItemName = new ArrayList<>();
            List<String> printItemName = new ArrayList<>();
            List<String> textureItemName = new ArrayList<>();

            List<KfashionLabel> outerReviewLabelList = kfashionLabelService.selectOuterReviewLabelList(workNo);
            for (int i = 0; i < outerReviewLabelList.size(); i++) {
                if (outerReviewLabelList.get(i).getCategoryName().equals("카테고리")) {
                    outerMap.put(outerReviewLabelList.get(i).getCategoryName(), outerReviewLabelList.get(i).getCategoryItemName());
                }
                if (outerReviewLabelList.get(i).getCategoryName().equals("디테일")) {
                    detailItemName.add(outerReviewLabelList.get(i).getCategoryItemName());
                    outerMap.put(outerReviewLabelList.get(i).getCategoryName(), detailItemName);
                }
                if (outerReviewLabelList.get(i).getCategoryName().equals("프린트")) {
                    printItemName.add(outerReviewLabelList.get(i).getCategoryItemName());
                    outerMap.put(outerReviewLabelList.get(i).getCategoryName(), printItemName);
                }
                if (outerReviewLabelList.get(i).getCategoryName().equals("소재")) {
                    textureItemName.add(outerReviewLabelList.get(i).getCategoryItemName());
                    outerMap.put(outerReviewLabelList.get(i).getCategoryName(), textureItemName);
                }
                if (outerReviewLabelList.get(i).getCategoryName().equals("기장")) {
                    outerMap.put(outerReviewLabelList.get(i).getCategoryName(), outerReviewLabelList.get(i).getCategoryItemName());
                }
                if (outerReviewLabelList.get(i).getCategoryName().equals("넥라인")) {
                    outerMap.put(outerReviewLabelList.get(i).getCategoryName(), outerReviewLabelList.get(i).getCategoryItemName());
                }
                if (outerReviewLabelList.get(i).getCategoryName().equals("옷깃")) {
                    outerMap.put(outerReviewLabelList.get(i).getCategoryName(), outerReviewLabelList.get(i).getCategoryItemName());
                }
                if (outerReviewLabelList.get(i).getCategoryName().equals("핏")) {
                    outerMap.put(outerReviewLabelList.get(i).getCategoryName(), outerReviewLabelList.get(i).getCategoryItemName());
                }
            }
        }
        if (labelNo2 == 2) {
            List<String> detailItemName = new ArrayList<>();
            List<String> printItemName = new ArrayList<>();
            List<String> textureItemName = new ArrayList<>();

            List<KfashionLabel> topReviewLabelList = kfashionLabelService.selectTopReviewLabelList(workNo);
            for (int i = 0; i < topReviewLabelList.size(); i++) {
                if (topReviewLabelList.get(i).getCategoryName().equals("카테고리")) {
                    topMap.put(topReviewLabelList.get(i).getCategoryName(), topReviewLabelList.get(i).getCategoryItemName());
                }
                if (topReviewLabelList.get(i).getCategoryName().equals("디테일")) {
                    detailItemName.add(topReviewLabelList.get(i).getCategoryItemName());
                    topMap.put(topReviewLabelList.get(i).getCategoryName(), detailItemName);

                }
                if (topReviewLabelList.get(i).getCategoryName().equals("프린트")) {
                    printItemName.add(topReviewLabelList.get(i).getCategoryItemName());
                    topMap.put(topReviewLabelList.get(i).getCategoryName(), printItemName);
                }
                if (topReviewLabelList.get(i).getCategoryName().equals("소재")) {
                    textureItemName.add(topReviewLabelList.get(i).getCategoryItemName());
                    topMap.put(topReviewLabelList.get(i).getCategoryName(), textureItemName);
                }
                if (topReviewLabelList.get(i).getCategoryName().equals("기장")) {
                    topMap.put(topReviewLabelList.get(i).getCategoryName(), topReviewLabelList.get(i).getCategoryItemName());
                }
                if (topReviewLabelList.get(i).getCategoryName().equals("넥라인")) {
                    topMap.put(topReviewLabelList.get(i).getCategoryName(), topReviewLabelList.get(i).getCategoryItemName());
                }
                if (topReviewLabelList.get(i).getCategoryName().equals("옷깃")) {
                    topMap.put(topReviewLabelList.get(i).getCategoryName(), topReviewLabelList.get(i).getCategoryItemName());
                }
                if (topReviewLabelList.get(i).getCategoryName().equals("핏")) {
                    topMap.put(topReviewLabelList.get(i).getCategoryName(), topReviewLabelList.get(i).getCategoryItemName());
                }
            }
        }
        if (labelNo3 == 3) {
            List<String> detailItemName = new ArrayList<>();
            List<String> printItemName = new ArrayList<>();
            List<String> textureItemName = new ArrayList<>();

            List<KfashionLabel> pantsReviewLabelList = kfashionLabelService.selectPantsReviewLabelList(workNo);
            for (int i = 0; i < pantsReviewLabelList.size(); i++) {
                if (pantsReviewLabelList.get(i).getCategoryName().equals("카테고리")) {
                    pantsMap.put(pantsReviewLabelList.get(i).getCategoryName(), pantsReviewLabelList.get(i).getCategoryItemName());
                }
                if (pantsReviewLabelList.get(i).getCategoryName().equals("디테일")) {
                    detailItemName.add(pantsReviewLabelList.get(i).getCategoryItemName());
                    pantsMap.put(pantsReviewLabelList.get(i).getCategoryName(), detailItemName);
                }
                if (pantsReviewLabelList.get(i).getCategoryName().equals("프린트")) {
                    printItemName.add(pantsReviewLabelList.get(i).getCategoryItemName());
                    pantsMap.put(pantsReviewLabelList.get(i).getCategoryName(), printItemName);
                }
                if (pantsReviewLabelList.get(i).getCategoryName().equals("소재")) {
                    textureItemName.add(pantsReviewLabelList.get(i).getCategoryItemName());
                    pantsMap.put(pantsReviewLabelList.get(i).getCategoryName(), textureItemName);
                }
                if (pantsReviewLabelList.get(i).getCategoryName().equals("기장")) {
                    pantsMap.put(pantsReviewLabelList.get(i).getCategoryName(), pantsReviewLabelList.get(i).getCategoryItemName());
                }
                if (pantsReviewLabelList.get(i).getCategoryName().equals("핏")) {
                    pantsMap.put(pantsReviewLabelList.get(i).getCategoryName(), pantsReviewLabelList.get(i).getCategoryItemName());
                }
            }
        }
        if (labelNo4 == 4) {
            List<String> detailItemName = new ArrayList<>();
            List<String> printItemName = new ArrayList<>();
            List<String> textureItemName = new ArrayList<>();

            List<KfashionLabel> onePieceReviewLabelList = kfashionLabelService.selectOnePieceReviewLabelList(workNo);
            for (int i = 0; i < onePieceReviewLabelList.size(); i++) {
                if (onePieceReviewLabelList.get(i).getCategoryName().equals("카테고리")) {
                    onePieceMap.put(onePieceReviewLabelList.get(i).getCategoryName(), onePieceReviewLabelList.get(i).getCategoryItemName());
                }
                if (onePieceReviewLabelList.get(i).getCategoryName().equals("디테일")) {
                    detailItemName.add(onePieceReviewLabelList.get(i).getCategoryItemName());
                    onePieceMap.put(onePieceReviewLabelList.get(i).getCategoryName(), detailItemName);
                }
                if (onePieceReviewLabelList.get(i).getCategoryName().equals("프린트")) {
                    printItemName.add(onePieceReviewLabelList.get(i).getCategoryItemName());
                    onePieceMap.put(onePieceReviewLabelList.get(i).getCategoryName(), printItemName);
                }
                if (onePieceReviewLabelList.get(i).getCategoryName().equals("소재")) {
                    textureItemName.add(onePieceReviewLabelList.get(i).getCategoryItemName());
                    onePieceMap.put(onePieceReviewLabelList.get(i).getCategoryName(), textureItemName);
                }
                if (onePieceReviewLabelList.get(i).getCategoryName().equals("기장")) {
                    onePieceMap.put(onePieceReviewLabelList.get(i).getCategoryName(), onePieceReviewLabelList.get(i).getCategoryItemName());
                }
                if (onePieceReviewLabelList.get(i).getCategoryName().equals("넥라인")) {
                    onePieceMap.put(onePieceReviewLabelList.get(i).getCategoryName(), onePieceReviewLabelList.get(i).getCategoryItemName());
                }
                if (onePieceReviewLabelList.get(i).getCategoryName().equals("옷깃")) {
                    onePieceMap.put(onePieceReviewLabelList.get(i).getCategoryName(), onePieceReviewLabelList.get(i).getCategoryItemName());
                }
                if (onePieceReviewLabelList.get(i).getCategoryName().equals("핏")) {
                    onePieceMap.put(onePieceReviewLabelList.get(i).getCategoryName(), onePieceReviewLabelList.get(i).getCategoryItemName());
                }
            }
        }
        if (labelNo5 == 5) {
            List<KfashionLabel> styleReviewLabelList = kfashionLabelService.selectStyleReviewLabelList(workNo);
            if (styleReviewLabelList.size() == 2) {
                styleMap.put(styleReviewLabelList.get(0).getCategoryName(), styleReviewLabelList.get(0).getCategoryItemName());
                styleMap.put("서브" + styleReviewLabelList.get(1).getCategoryName(), styleReviewLabelList.get(1).getCategoryItemName());
            } else {
                styleMap.put(styleReviewLabelList.get(0).getCategoryName(), styleReviewLabelList.get(0).getCategoryItemName());
            }
        }
    }
        int[] basiclabelNo = kfashionLabelService.selectHighLabelList(workNo);
        int basiclabelNo1 = 0;
        int basiclabelNo2 = 0;
        int basiclabelNo3 = 0;
        int basiclabelNo4 = 0;
     if(basiclabelNo != null && basiclabelNo.length > 0) {
         for (int i = 0; i < basiclabelNo.length; i++) {
             if (basiclabelNo[i] == 1) {
                 basiclabelNo1 = 1;
             }
             if (basiclabelNo[i] == 2) {
                 basiclabelNo2 = 2;
             }
             if (basiclabelNo[i] == 3) {
                 basiclabelNo3 = 3;
             }
             if (basiclabelNo[i] == 4) {
                 basiclabelNo4 = 4;
             }
         }
         if (basiclabelNo1 == 1) {
             List<KfashionLabel> outerReviewHighLabelList = kfashionLabelService.selectOuterReviewHighLabelList(workNo);
             if (outerReviewHighLabelList.size() == 2) {
                 outerMap.put(outerReviewHighLabelList.get(0).getCategoryName(), outerReviewHighLabelList.get(0).getCategoryItemName());
                 outerMap.put(outerReviewHighLabelList.get(1).getCategoryName(), outerReviewHighLabelList.get(1).getCategoryItemName());
             } else {
                 outerMap.put(outerReviewHighLabelList.get(0).getCategoryName(), outerReviewHighLabelList.get(0).getCategoryItemName());
                 outerMap.put("서브" + outerReviewHighLabelList.get(1).getCategoryName(), outerReviewHighLabelList.get(1).getCategoryItemName());
                 outerMap.put(outerReviewHighLabelList.get(2).getCategoryName(), outerReviewHighLabelList.get(2).getCategoryItemName());
             }
         }
         if (basiclabelNo2 == 2) {
             List<KfashionLabel> topReviewHighLabelList = kfashionLabelService.selectTopReviewHighLabelList(workNo);
             if (topReviewHighLabelList.size() == 2) {
                 topMap.put(topReviewHighLabelList.get(0).getCategoryName(), topReviewHighLabelList.get(0).getCategoryItemName());
                 topMap.put(topReviewHighLabelList.get(1).getCategoryName(), topReviewHighLabelList.get(1).getCategoryItemName());
             } else {
                 topMap.put(topReviewHighLabelList.get(0).getCategoryName(), topReviewHighLabelList.get(0).getCategoryItemName());
                 topMap.put("서브" + topReviewHighLabelList.get(1).getCategoryName(), topReviewHighLabelList.get(1).getCategoryItemName());
                 topMap.put(topReviewHighLabelList.get(2).getCategoryName(), topReviewHighLabelList.get(2).getCategoryItemName());
             }
         }
         if (basiclabelNo3 == 3) {
             List<KfashionLabel> pantsReviewHighLabelList = kfashionLabelService.selectPantsReviewHighLabelList(workNo);
             if (pantsReviewHighLabelList.size() == 1) {
                 pantsMap.put(pantsReviewHighLabelList.get(0).getCategoryName(), pantsReviewHighLabelList.get(0).getCategoryItemName());
             } else {
                 pantsMap.put(pantsReviewHighLabelList.get(0).getCategoryName(), pantsReviewHighLabelList.get(0).getCategoryItemName());
                 pantsMap.put("서브" + pantsReviewHighLabelList.get(1).getCategoryName(), pantsReviewHighLabelList.get(1).getCategoryItemName());
             }
         }
         if (basiclabelNo4 == 4) {
             List<KfashionLabel> onePieceReviewHighLabelList = kfashionLabelService.selectOnePieceReviewHighLabelList(workNo);
             if (onePieceReviewHighLabelList.size() == 2) {
                 onePieceMap.put(onePieceReviewHighLabelList.get(0).getCategoryName(), onePieceReviewHighLabelList.get(0).getCategoryItemName());
                 onePieceMap.put(onePieceReviewHighLabelList.get(1).getCategoryName(), onePieceReviewHighLabelList.get(1).getCategoryItemName());
             } else {
                 onePieceMap.put(onePieceReviewHighLabelList.get(0).getCategoryName(), onePieceReviewHighLabelList.get(0).getCategoryItemName());
                 onePieceMap.put("서브" + onePieceReviewHighLabelList.get(1).getCategoryName(), onePieceReviewHighLabelList.get(1).getCategoryItemName());
                 onePieceMap.put(onePieceReviewHighLabelList.get(2).getCategoryName(), onePieceReviewHighLabelList.get(2).getCategoryItemName());
             }
         }
     }

        int[] rectNo = kfashionImageLocationRectService.selectRectNo(workNo);
        int rectNo1 = 0;
        int rectNo2 = 0;
        int rectNo3 = 0;
        int rectNo4 = 0;
        if (rectNo != null && rectNo.length > 0) {
            for (int k = 0; k < rectNo.length; k++) {
                if (rectNo[k] == 1) {
                    rectNo1 = 1;
                }
                if (rectNo[k] == 2) {
                    rectNo2 = 2;
                }
                if (rectNo[k] == 3) {
                    rectNo3 = 3;
                }
                if (rectNo[k] == 4) {
                    rectNo4 = 4;
                }
            }

                if(rectNo1 == 1) {
                    List<KfashionImageLocationRect> outerRectList = kfashionImageLocationRectService.selectOuterRectList(workNo);
                    outerRectMap.put("X좌표",outerRectList.get(0).getLocationX());
                    outerRectMap.put("Y좌표",outerRectList.get(0).getLocationY());
                    outerRectMap.put("가로",outerRectList.get(0).getLocationWidth());
                    outerRectMap.put("세로",outerRectList.get(0).getLocationHeight());
                }
                if(rectNo2 == 2) {
                    List<KfashionImageLocationRect> topRectList = kfashionImageLocationRectService.selectTopRectList(workNo);
                    topRectMap.put("X좌표",topRectList.get(0).getLocationX());
                    topRectMap.put("Y좌표",topRectList.get(0).getLocationY());
                    topRectMap.put("가로",topRectList.get(0).getLocationWidth());
                    topRectMap.put("세로",topRectList.get(0).getLocationHeight());
                }
                if(rectNo3 == 3) {
                    List<KfashionImageLocationRect> pantsRectList = kfashionImageLocationRectService.selectPantsRectList(workNo);
                    pantsRectMap.put("X좌표",pantsRectList.get(0).getLocationX());
                    pantsRectMap.put("Y좌표",pantsRectList.get(0).getLocationY());
                    pantsRectMap.put("가로",pantsRectList.get(0).getLocationWidth());
                    pantsRectMap.put("세로",pantsRectList.get(0).getLocationHeight());
                }
                if(rectNo4 == 4) {
                    List<KfashionImageLocationRect> onePieceRectList = kfashionImageLocationRectService.selectOnePieceRectList(workNo);
                    onePieceRectMap.put("X좌표",onePieceRectList.get(0).getLocationX());
                    onePieceRectMap.put("Y좌표",onePieceRectList.get(0).getLocationY());
                    onePieceRectMap.put("가로",onePieceRectList.get(0).getLocationWidth());
                    onePieceRectMap.put("세로",onePieceRectList.get(0).getLocationHeight());
                }
        }

        List<Integer> polyNo = kfashionImageLocationPolygonPointService.selectPolyNo(workNo);
        int polyNo1 = 0;
        int polyNo2 = 0;
        int polyNo3 = 0;
        int polyNo4 = 0;
        KfashionImageLocationPolygonPoint polygon = new KfashionImageLocationPolygonPoint();
        if (polyNo != null) {
            for (int p = 0; p < polyNo.size(); p++) {
                if (polyNo.get(p) == 1) {
                    polyNo1 = 1;
                }
                if (polyNo.get(p) == 2) {
                    polyNo2 = 2;
                }
                if (polyNo.get(p) == 3) {
                    polyNo3 = 3;
                }
                if (polyNo.get(p) == 4) {
                    polyNo4 = 4;
                }
            }
                polygon.setWorkNo(workNo);
                if(polyNo1 == 1) {
                    polygon.setPolyNo(1);
                    List<KfashionImageLocationPolygonPoint> outerPolygonList = kfashionImageLocationPolygonPointService.selectPolygonList(polygon);
                    for(int a = 0; a < outerPolygonList.size(); a++) {
                        outerPolygonMap.put("X좌표"+outerPolygonList.get(a).getNo(),outerPolygonList.get(a).getLocationX());
                        outerPolygonMap.put("Y좌표"+outerPolygonList.get(a).getNo(),outerPolygonList.get(a).getLocationY());
                    }
                }
                if(polyNo2 == 2) {
                    polygon.setPolyNo(2);
                    List<KfashionImageLocationPolygonPoint> topPolygonList = kfashionImageLocationPolygonPointService.selectPolygonList(polygon);
                    for(int b = 0; b < topPolygonList.size(); b++) {
                        topPolygonMap.put("X좌표"+topPolygonList.get(b).getNo(),topPolygonList.get(b).getLocationX());
                        topPolygonMap.put("Y좌표"+topPolygonList.get(b).getNo(),topPolygonList.get(b).getLocationY());
                    }
                }
                if(polyNo3 == 3) {
                    polygon.setPolyNo(3);
                    List<KfashionImageLocationPolygonPoint> pantsPolygonList = kfashionImageLocationPolygonPointService.selectPolygonList(polygon);
                    for(int c = 0; c < pantsPolygonList.size(); c++) {
                        pantsPolygonMap.put("X좌표"+pantsPolygonList.get(c).getNo(), pantsPolygonList.get(c).getLocationX());
                        pantsPolygonMap.put("Y좌표"+pantsPolygonList.get(c).getNo(), pantsPolygonList.get(c).getLocationY());
                    }
                }
                if(polyNo4 == 4) {
                    polygon.setPolyNo(4);
                    List<KfashionImageLocationPolygonPoint> onePiecePolygonList = kfashionImageLocationPolygonPointService.selectPolygonList(polygon);
                    System.out.println("onePiecePolygonListonePiecePolygonListonePiecePolygonList"+onePiecePolygonList);
                    for(int d = 0; d < onePiecePolygonList.size(); d++) {
                        if(onePiecePolygonList.get(d).getNo() > 0){
                            onePiecePolygonMap.put("X좌표"+onePiecePolygonList.get(d).getNo(), onePiecePolygonList.get(d).getLocationX());
                            onePiecePolygonMap.put("Y좌표"+onePiecePolygonList.get(d).getNo(), onePiecePolygonList.get(d).getLocationY());
                        }
                    }
                }

        }



        outerLabel.add(outerMap);
        labelObject.put("아우터", outerLabel);
        topLabel.add(topMap);
        labelObject.put("상의", topLabel);
        pantsLabel.add(pantsMap);
        labelObject.put("하의", pantsLabel);
        onePieceLabel.add(onePieceMap);
        labelObject.put("원피스", onePieceLabel);
        style.add(styleMap);
        labelObject.put("스타일", style);
        jsonObject.put("라벨링",labelObject);

        outerRect.add(outerRectMap);
        rectObject.put("아우터",outerRect);
        topRect.add(topRectMap);
        rectObject.put("상의",topRect);
        pantsRect.add(pantsRectMap);
        rectObject.put("하의",pantsRect);
        onePieceRect.add(onePieceRectMap);
        rectObject.put("원피스",onePieceRect);

        jsonObject.put("렉트좌표",rectObject);



        outerPolygon.add(outerPolygonMap);
        polygonObject.put("아우터",outerPolygon);
        topPolygon.add(topPolygonMap);
        polygonObject.put("상의",topPolygon);
        pantsPolygon.add(pantsPolygonMap);
        polygonObject.put("하의",pantsPolygon);
        onePiecePolygon.add(onePiecePolygonMap);
        polygonObject.put("원피스",onePiecePolygon);

        jsonObject.put("폴리곤좌표",polygonObject);

        System.out.println(jsonObject);

//        String path =  "/Users/jangseong-yeol/work/"+workNo; //폴더 경로
//        File Folder = new File(path);
//
//        // 해당 디렉토리가 없을경우 디렉토리를 생성합니다.
//        if (!Folder.exists()) {
//            try{
//                Folder.mkdirs(); //폴더 생성합니다.
//                System.out.println("폴더가 생성되었습니다.");
//            }
//            catch(Exception e){
//                e.getStackTrace();
//            }
//        }else {
//            System.out.println("이미 폴더가 생성되어 있습니다.");
//        }
//
//        FileWriter file = new FileWriter("/Users/jangseong-yeol/work/"+workNo+"/"+workNo+".json");
//        file.write(jsonObject.toJSONString());
//        file.flush();
//        file.close();
//
//        Map<String, Object> map = kfashionImageService.getByteImage(workNo);
//        byte[] imageContent = (byte[]) map.get("img_data");
//
//        int pos = workName.lastIndexOf(".");
//        String fileType = workName.substring(pos + 1);
//
//        File imageFile = new File(path+"/"+workName);
//
//        OutputStream os = new FileOutputStream(imageFile);
//        os.write(imageContent);  // 읽은 byte 갯수 만큼 byte내용을 저장
//        os.close();

        return new ResponseEntity<Object>(jsonObject, HttpStatus.OK);
    }
}
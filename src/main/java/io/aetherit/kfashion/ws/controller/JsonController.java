package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.model.KfashionImageLocationPolygonPoint;
import io.aetherit.kfashion.ws.model.KfashionImageLocationRect;
import io.aetherit.kfashion.ws.model.KfashionLabel;
import io.aetherit.kfashion.ws.service.*;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/kfashion/json")
public class JsonController {

    private KfashionCommentService kfashionCommentService;
    private KfashionLabelService kfashionLabelService;
    private KfashionWorkHistoryService kfashionWorkHistoryService;
    private KfashionWorkService kfashionWorkService;
    private KfashionImageLocationPolygonPointService kfashionImageLocationPolygonPointService;
    private KfashionImageLocationRectService kfashionImageLocationRectService;
    private KfashionImageService kfashionImageService;

    @Autowired
    public JsonController(KfashionLabelService kfashionLabelService,
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


    @GetMapping(value="fileup")
    public ResponseEntity<Object> jsonFileUp(HttpServletRequest httpRequest) throws IOException {

        Long[] workNo = kfashionWorkService.selectJsonWorkList();


        if(workNo.length > 0) {
            for(int z=0; z < workNo.length; z++) {

                JSONObject jsonObject = new JSONObject();
                JSONObject labelObject = new JSONObject();
                JSONObject rectObject = new JSONObject();
                JSONObject polygonObject = new JSONObject();

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

                HashMap<String, Object> resultMap = new HashMap<String, Object>();


                jsonObject.put("파일번호", workNo[z]);
                String workName =  kfashionWorkService.selectWorkName(workNo[z]);

                jsonObject.put("파일이름", workName);


        int[] labelNo = kfashionLabelService.selectLabelList(workNo[z]);
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

                List<KfashionLabel> outerReviewLabelList = kfashionLabelService.selectOuterReviewLabelList(workNo[z]);
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

                List<KfashionLabel> topReviewLabelList = kfashionLabelService.selectTopReviewLabelList(workNo[z]);
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

                List<KfashionLabel> pantsReviewLabelList = kfashionLabelService.selectPantsReviewLabelList(workNo[z]);
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

                List<KfashionLabel> onePieceReviewLabelList = kfashionLabelService.selectOnePieceReviewLabelList(workNo[z]);
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
                List<KfashionLabel> styleReviewLabelList = kfashionLabelService.selectStyleReviewLabelList(workNo[z]);
                if (styleReviewLabelList.size() == 2) {
                    styleMap.put(styleReviewLabelList.get(0).getCategoryName(), styleReviewLabelList.get(0).getCategoryItemName());
                    styleMap.put("서브" + styleReviewLabelList.get(1).getCategoryName(), styleReviewLabelList.get(1).getCategoryItemName());
                } else {
                    styleMap.put(styleReviewLabelList.get(0).getCategoryName(), styleReviewLabelList.get(0).getCategoryItemName());
                }
            }
        }
        int[] basiclabelNo = kfashionLabelService.selectHighLabelList(workNo[z]);
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
                List<KfashionLabel> outerReviewHighLabelList = kfashionLabelService.selectOuterReviewHighLabelList(workNo[z]);
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
                List<KfashionLabel> topReviewHighLabelList = kfashionLabelService.selectTopReviewHighLabelList(workNo[z]);
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
                List<KfashionLabel> pantsReviewHighLabelList = kfashionLabelService.selectPantsReviewHighLabelList(workNo[z]);
                if (pantsReviewHighLabelList.size() == 1) {
                    pantsMap.put(pantsReviewHighLabelList.get(0).getCategoryName(), pantsReviewHighLabelList.get(0).getCategoryItemName());
                } else {
                    pantsMap.put(pantsReviewHighLabelList.get(0).getCategoryName(), pantsReviewHighLabelList.get(0).getCategoryItemName());
                    pantsMap.put("서브" + pantsReviewHighLabelList.get(1).getCategoryName(), pantsReviewHighLabelList.get(1).getCategoryItemName());
                }
            }
            if (basiclabelNo4 == 4) {
                List<KfashionLabel> onePieceReviewHighLabelList = kfashionLabelService.selectOnePieceReviewHighLabelList(workNo[z]);
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

        int[] rectNo = kfashionImageLocationRectService.selectRectNo(workNo[z]);
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
                List<KfashionImageLocationRect> outerRectList = kfashionImageLocationRectService.selectOuterRectList(workNo[z]);
                outerRectMap.put("X좌표",outerRectList.get(0).getLocationX());
                outerRectMap.put("Y좌표",outerRectList.get(0).getLocationY());
                outerRectMap.put("가로",outerRectList.get(0).getLocationWidth());
                outerRectMap.put("세로",outerRectList.get(0).getLocationHeight());
            }
            if(rectNo2 == 2) {
                List<KfashionImageLocationRect> topRectList = kfashionImageLocationRectService.selectTopRectList(workNo[z]);
                topRectMap.put("X좌표",topRectList.get(0).getLocationX());
                topRectMap.put("Y좌표",topRectList.get(0).getLocationY());
                topRectMap.put("가로",topRectList.get(0).getLocationWidth());
                topRectMap.put("세로",topRectList.get(0).getLocationHeight());
            }
            if(rectNo3 == 3) {
                List<KfashionImageLocationRect> pantsRectList = kfashionImageLocationRectService.selectPantsRectList(workNo[z]);
                pantsRectMap.put("X좌표",pantsRectList.get(0).getLocationX());
                pantsRectMap.put("Y좌표",pantsRectList.get(0).getLocationY());
                pantsRectMap.put("가로",pantsRectList.get(0).getLocationWidth());
                pantsRectMap.put("세로",pantsRectList.get(0).getLocationHeight());
            }
            if(rectNo4 == 4) {
                List<KfashionImageLocationRect> onePieceRectList = kfashionImageLocationRectService.selectOnePieceRectList(workNo[z]);
                onePieceRectMap.put("X좌표",onePieceRectList.get(0).getLocationX());
                onePieceRectMap.put("Y좌표",onePieceRectList.get(0).getLocationY());
                onePieceRectMap.put("가로",onePieceRectList.get(0).getLocationWidth());
                onePieceRectMap.put("세로",onePieceRectList.get(0).getLocationHeight());
            }
        }

        List<Integer> polyNo = kfashionImageLocationPolygonPointService.selectPolyNo(workNo[z]);
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
            polygon.setWorkNo(workNo[z]);
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

        String path =  "/Users/jangseong-yeol/work/"+workNo[z]; //폴더 경로
        File Folder = new File(path);

        // 해당 디렉토리가 없을경우 디렉토리를 생성합니다.
        if (!Folder.exists()) {
            try{
                Folder.mkdirs(); //폴더 생성합니다.
            }
            catch(Exception e){
                e.getStackTrace();
            }
        }else {
        }

        FileWriter file = new FileWriter("/Users/jangseong-yeol/work/"+workNo[z]+"/"+workNo[z]+".json");
        file.write(jsonObject.toJSONString());
        file.flush();
        file.close();

        Map<String, Object> map = kfashionImageService.getByteImage(workNo[z]);
        byte[] imageContent = (byte[]) map.get("img_data");

        File imageFile = new File(path+"/"+workName);

        OutputStream os = new FileOutputStream(imageFile);
        os.write(imageContent);  // 읽은 byte 갯수 만큼 byte내용을 저장
        os.close();
            }
        }
        return new ResponseEntity<Object>("성공", HttpStatus.OK);
    }

}
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


@RestController
@RequestMapping("/api/v1/kfashion/rect")
public class KfashionImageLocationRectController {

    private KfashionImageLocationRectService kfashionImageLocationRectService;
    private KfashionWorkHistoryService kfashionWorkHistoryService;
    private KfashionWorkService kfashionWorkService;
    private KfashionImageService kfashionImageService;

    @Autowired
    public KfashionImageLocationRectController(KfashionImageLocationRectService kfashionImageLocationRectService,
                                               KfashionWorkHistoryService kfashionWorkHistoryService,
                                               KfashionWorkService kfashionWorkService,
                                               KfashionImageService kfashionImageService
    ) {
        this.kfashionImageLocationRectService = kfashionImageLocationRectService;
        this.kfashionWorkHistoryService = kfashionWorkHistoryService;
        this.kfashionWorkService = kfashionWorkService;
        this.kfashionImageService = kfashionImageService;

    }


    /**
     * 렉트 인서트
     * @param httpServletRequest
     * @param rectList
     * @return String
     * @throws Exception
     */


    @PostMapping(value="/location")
    public ResponseEntity<String> insertLocationRect(HttpServletRequest httpServletRequest,
                                                     @RequestBody List<KfashionRectList> rectList) throws Exception {
        String msg= "";
        System.out.println("q1111111111111"+rectList);
        KfashionWork work = new KfashionWork();
        work.setNo(rectList.get(0).getWorkNo());
        work.setWorkState(rectList.get(0).getWorkStep());
        kfashionWorkService.updateWork(work);

        KfashionWorkHistory workHistory = new KfashionWorkHistory();
        workHistory.setWorkNo(rectList.get(0).getWorkNo());
        workHistory.setWorkStep(rectList.get(0).getWorkStep());
        workHistory.setCreatedId(rectList.get(0).getCreatedId());
        kfashionWorkHistoryService.insertWorkHistory(workHistory);


        KfashionImageLocationRect rect = new KfashionImageLocationRect();
        for(int i = 0; i<rectList.size();i++){
            rect.setWorkNo(rectList.get(i).getWorkNo());
            rect.setWorkStep(rectList.get(i).getWorkStep());
            rect.setRectNo(rectList.get(i).getId());
            rect.setLocationX(rectList.get(i).getLeft());
            rect.setLocationY(rectList.get(i).getTop());
            rect.setLocationWidth(rectList.get(i).getWidth());
            rect.setLocationHeight(rectList.get(i).getHeight());
            rect.setScaleX(rectList.get(i).getScaleX());
            rect.setScaleY(rectList.get(i).getScaleY());
            msg = kfashionImageLocationRectService.insertLocationRect(rect);
        }
        return new ResponseEntity<String>(msg, HttpStatus.OK);
    }

    /**
     * 렉트 좌표값 리스트
     * @param httpRequest
     * @param workNo
     * @return locationRectList
     * @throws
     */

    @GetMapping(value="/locationRectList")
    public ResponseEntity<Object> locationRectList(HttpServletRequest httpRequest,
                                              @RequestParam(value="workNo")Long workNo){
        List<KfashionImageLocationRect> rectNoList = kfashionImageLocationRectService.selectRectNoList(workNo);
        System.out.println(rectNoList);
        KfashionImageLocationRect rect = new KfashionImageLocationRect();
        List<KfashionImageLocationRect> locationRectList = new ArrayList<>();
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        if(rectNoList != null) {
            for(int i=0; i < rectNoList.size(); i++) {
                rect.setWorkNo(rectNoList.get(i).getWorkNo());
                rect.setRectNo(rectNoList.get(i).getRectNo());
                locationRectList.addAll(kfashionImageLocationRectService.selectLocationRectList(rect));
            }
            System.out.println(locationRectList);
            resultMap.put("locationRectList", locationRectList);
        }
        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }

    /**
     * 렉트 이미지 리스트
     * @param httpRequest
     * @param createdId
     * @return rectList
     * @throws
     */

    @GetMapping(value="/rectList")
    public ResponseEntity<Object> polygonList(HttpServletRequest httpRequest,
                                              @RequestParam(value="createdId")String createdId) {
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        List<KfashionImage> rectList = kfashionImageService.selectRectList(createdId);
        resultMap.put("rectList", rectList);
        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }

}

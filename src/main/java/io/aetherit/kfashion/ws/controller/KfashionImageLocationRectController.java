package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.model.*;
import io.aetherit.kfashion.ws.service.KfashionImageLocationPolygonService;
import io.aetherit.kfashion.ws.service.KfashionImageLocationRectService;
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
@RequestMapping("/api/v1/kfashion/rect")
public class KfashionImageLocationRectController {

    private KfashionImageLocationRectService kfashionImageLocationRectService;
    private KfashionWorkHistoryService kfashionWorkHistoryService;
    private KfashionWorkService kfashionWorkService;

    @Autowired
    public KfashionImageLocationRectController(KfashionImageLocationRectService kfashionImageLocationRectService,
                                               KfashionWorkHistoryService kfashionWorkHistoryService,
                                               KfashionWorkService kfashionWorkService
    ) {
        this.kfashionImageLocationRectService = kfashionImageLocationRectService;
        this.kfashionWorkHistoryService = kfashionWorkHistoryService;
        this.kfashionWorkService = kfashionWorkService;

    }

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

    @GetMapping(value="/locationRectList")
    public ResponseEntity<Object> locationRectList(HttpServletRequest httpRequest,
                                              @RequestParam(value="workNo")String workNo) {
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        List<KfashionImageLocationRect> locationRectList = kfashionImageLocationRectService.selectLocationRectList(workNo);
        resultMap.put("locationRectList", locationRectList);
        System.out.println(locationRectList);
        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }

}

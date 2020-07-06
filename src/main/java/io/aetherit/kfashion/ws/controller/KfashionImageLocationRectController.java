package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.model.KfashionCategoryItem;
import io.aetherit.kfashion.ws.model.KfashionImageLocationRect;
import io.aetherit.kfashion.ws.model.KfashionWorkHistory;
import io.aetherit.kfashion.ws.model.KfashionRectList;
import io.aetherit.kfashion.ws.service.KfashionImageLocationRectService;
import io.aetherit.kfashion.ws.service.KfashionWorkHistoryService;
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

        @Autowired
        public KfashionImageLocationRectController(KfashionImageLocationRectService kfashionImageLocationRectService,
                                                   KfashionWorkHistoryService kfashionWorkHistoryService) {
            this.kfashionImageLocationRectService = kfashionImageLocationRectService;
            this.kfashionWorkHistoryService = kfashionWorkHistoryService;
        }

    @PostMapping(value="/location")
    public ResponseEntity<String> insertLocationRect(HttpServletRequest httpServletRequest,
                                                        @RequestBody List<KfashionImageLocationRect> rectList
                                                                                                    ) throws Exception {
            String msg= "";
            System.out.println("asdljkfasdlkfjasldkfj;as"+rectList);
            KfashionWorkHistory workHistory = new KfashionWorkHistory();
            workHistory.setWorkNo(rectList.get(0).getWorkNo());
            workHistory.setWorkStep(rectList.get(0).getWorkStep());
            workHistory.setCreatedId(rectList.get(0).getCreatedId());
            kfashionWorkHistoryService.insertWorkHistory(workHistory);

              KfashionImageLocationRect rect = new KfashionImageLocationRect();
              if(rectList != null) {

                  for(int i=0; i < rectList.size(); i++) {
                      rect.setCreatedId(rectList.get(i).getCreatedId());
                      rect.setWorkStep(rectList.get(i).getWorkStep());
                      rect.setRectNo(rectList.get(i).getRectNo());
                      rect.setWorkNo(rectList.get(i).getWorkNo());
                      rect.setLocationHeight(rectList.get(i).getLocationHeight());
                      rect.setLocationWidth(rectList.get(i).getLocationWidth());
                      rect.setLocationX(rectList.get(i).getLocationX());
                      rect.setLocationY(rectList.get(i).getLocationY());
                      rect.setScaleX(rectList.get(i).getScaleX());
                      rect.setScaleY(rectList.get(i).getScaleY());
                      msg = kfashionImageLocationRectService.insertLocationRect(rect);
                  }
              }
        return new ResponseEntity<String>(msg, HttpStatus.OK);
    }

    @GetMapping(value = "/rectList")
    public ResponseEntity<Object> selectRectList(@RequestParam(value ="workNo") Long workNo,
                                                 @RequestParam(value="rectNo") int rectNo) {
        KfashionImageLocationRect rect = KfashionImageLocationRect.builder()
                    .workNo(workNo)
                    .rectNo(rectNo)
                    .build();
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        List<KfashionCategoryItem> rectList = kfashionImageLocationRectService.selectRectList(rect);
        resultMap.put("rectList", rectList);
        System.out.println(rectList);
        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }

}

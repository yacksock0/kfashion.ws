package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.model.*;
import io.aetherit.kfashion.ws.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/api/v1/kfashion/polygon")
public class KfashionImageLocationPolygonController {

        private KfashionImageLocationPolygonService kfashionImageLocationPolygonService;
        private KfashionWorkHistoryService kfashionWorkHistoryService;
        private KfashionImageLocationPolygonPointService kfashionImageLocationPolygonPointService;
        private KfashionWorkService kfashionWorkService;


        @Autowired
        public KfashionImageLocationPolygonController(KfashionImageLocationPolygonService kfashionImageLocationPolygonService,
                                                      KfashionImageLocationPolygonPointService kfashionImageLocationPolygonPointService,
                                                      KfashionWorkHistoryService kfashionWorkHistoryService,
                                                         KfashionWorkService kfashionWorkService) {
            this.kfashionImageLocationPolygonService = kfashionImageLocationPolygonService;
            this.kfashionImageLocationPolygonPointService = kfashionImageLocationPolygonPointService;
            this.kfashionWorkHistoryService = kfashionWorkHistoryService;
            this.kfashionWorkService = kfashionWorkService;
        }


        /**
         * 렉트 인서트
         * @param httpServletRequest
         * @param polygonList
         * @return String
         * @throws Exception
         */
        @PostMapping(value="/")
        public ResponseEntity<String> insertLocationPolygon(HttpServletRequest httpServletRequest,
                                                            @RequestBody List<KfashionImageLocationPolygonPoint> polygonList)throws Exception {
            System.out.println(polygonList);
            String msg= "";
            System.out.println("q1111111111111"+polygonList);
            KfashionWork work = new KfashionWork();
            work.setNo(polygonList.get(0).getWorkNo());
            work.setWorkState(polygonList.get(0).getWorkStep());
            kfashionWorkService.updateWork(work);

            KfashionWorkHistory workHistory = new KfashionWorkHistory();
            workHistory.setWorkNo(polygonList.get(0).getWorkNo());
            workHistory.setWorkStep(polygonList.get(0).getWorkStep());
            workHistory.setCreatedId(polygonList.get(0).getCreatedId());
            kfashionWorkHistoryService.insertWorkHistory(workHistory);



            if(polygonList != null) {

                for(int i=1; i <= polygonList.size(); i++) {
                    KfashionImageLocationPolygon polygon = new KfashionImageLocationPolygon();
                    polygon.setWorkNo(polygonList.get(i).getWorkNo());
                    polygon.setWorkStep(polygonList.get(i).getWorkStep());
                    polygon.setRectNo(polygonList.get(i).getRectNo());
                    polygon.setNo(polygonList.get(i).getPolyNo());
                    kfashionImageLocationPolygonService.insertLocationPolygon(polygon);


                    KfashionImageLocationPolygonPoint polygonPoint = new KfashionImageLocationPolygonPoint();
                    polygonPoint.setWorkNo(polygonList.get(i).getWorkNo());
                    polygonPoint.setWorkStep(polygonList.get(i).getWorkStep());
                    polygonPoint.setRectNo(polygonList.get(i).getRectNo());
                    polygonPoint.setPolyNo(polygonList.get(i).getPolyNo());

                    for(int j = 1 ; j < polygonList.get(i).getPoints().size()){

                    }
                    polygonPoint.setNo(i);
                    polygonPoint.setLocationX(polygonList.get(i).getLocationX());
                    polygonPoint.setLocationY(polygonList.get(i).getLocationY());
                    polygonPoint.setLocationSeq(i);
                    msg=kfashionImageLocationPolygonPointService.insertLocationPolygonPoint(polygonPoint);
                }
            }
            return new ResponseEntity<String>(msg, HttpStatus.OK);
        }
}

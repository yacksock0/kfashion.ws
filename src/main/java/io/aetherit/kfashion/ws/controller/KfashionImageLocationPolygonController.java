package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.model.KfashionImageLocationPolygon;
import io.aetherit.kfashion.ws.model.KfashionImageLocationPolygonPoint;
import io.aetherit.kfashion.ws.model.KfashionWork;
import io.aetherit.kfashion.ws.model.KfashionWorkHistory;
import io.aetherit.kfashion.ws.service.KfashionImageLocationPolygonPointService;
import io.aetherit.kfashion.ws.service.KfashionImageLocationPolygonService;
import io.aetherit.kfashion.ws.service.KfashionWorkHistoryService;
import io.aetherit.kfashion.ws.service.KfashionWorkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
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
        @PostMapping(value="/location")
        public ResponseEntity<String> insertLocationPolygon(HttpServletRequest httpServletRequest,
                                                            @RequestBody List<KfashionImageLocationPolygonPoint> polygonList) throws Exception {
            System.out.println("polygonList:@@@@@@@@@@@@@@@@@@@@@@@@@"+polygonList);
            String msg= "";
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
                }
                for(int i=1; i <= polygonList.size(); i++) {
                    KfashionImageLocationPolygonPoint polygonPoint = new KfashionImageLocationPolygonPoint();
                    polygonPoint.setWorkNo(polygonList.get(i).getWorkNo());
                    polygonPoint.setWorkStep(polygonList.get(i).getWorkStep());
                    polygonPoint.setRectNo(polygonList.get(i).getRectNo());
                    polygonPoint.setPolyNo(polygonList.get(i).getPolyNo());
                    for(int j=1; j <= polygonList.size(); j++) {
                        polygonPoint.setNo(j);
                        polygonPoint.setLocationX(polygonList.get(j).getLocationX());
                        polygonPoint.setLocationY(polygonList.get(j).getLocationY());
                        polygonPoint.setLocationSeq(j);
                        kfashionImageLocationPolygonPointService.insertLocationPolygonPoint(polygonPoint);
                    }
                }
            }
            return new ResponseEntity<String>(msg, HttpStatus.OK);
        }
}

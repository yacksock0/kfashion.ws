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
@RequestMapping("/api/v1/kfashion/polygon")
public class KfashionImageLocationPolygonController {

        private KfashionImageLocationPolygonService kfashionImageLocationPolygonService;
        private KfashionWorkHistoryService kfashionWorkHistoryService;
        private KfashionImageLocationPolygonPointService kfashionImageLocationPolygonPointService;
        private KfashionWorkService kfashionWorkService;
        private KfashionImageService kfashionImageService;

        @Autowired
        public KfashionImageLocationPolygonController(KfashionImageLocationPolygonService kfashionImageLocationPolygonService,
                                                      KfashionImageLocationPolygonPointService kfashionImageLocationPolygonPointService,
                                                      KfashionWorkHistoryService kfashionWorkHistoryService,
                                                      KfashionWorkService kfashionWorkService,
                                                      KfashionImageService kfashionImageService) {
            this.kfashionImageLocationPolygonService = kfashionImageLocationPolygonService;
            this.kfashionImageLocationPolygonPointService = kfashionImageLocationPolygonPointService;
            this.kfashionWorkHistoryService = kfashionWorkHistoryService;
            this.kfashionWorkService = kfashionWorkService;
            this.kfashionImageService = kfashionImageService;
        }


        /**
         * 폴리곤 인서트
         * @param httpServletRequest
         * @param polygonList
         * @return String
         * @throws Exception
         */

        @PostMapping(value="/location")
        public ResponseEntity<String> insertLocationPolygon(HttpServletRequest httpServletRequest,
                                                            @RequestBody List<KfashionImageLocationPolygonPoint> polygonList
                                                            )throws Exception {
            System.out.println("111111111111111111111111111");
            System.out.println(polygonList);
            String msg= "";

//                for(int i=1; i <= polygonList.size(); i++) {
//                    System.out.println(polygonList.get(i));
//                for (int j =1 ;j< polygonList.get(i).getPoints().size(); j++ ) {
//                    System.out.println(polygonList.get(i).getPoints().get(j).getX());
//
//                }
//            }
//

            if(polygonList != null) {

                for(int i=0; i < polygonList.size(); i++) {
                    KfashionImageLocationPolygon polygon = new KfashionImageLocationPolygon();
                    polygon.setWorkNo(polygonList.get(i).getWorkNo());
                    polygon.setWorkStep(polygonList.get(i).getWorkStep());
                    polygon.setPolyNo(polygonList.get(i).getPolyNo());
                    System.out.println("polygon" + polygon);
                    kfashionImageLocationPolygonService.insertLocationPolygon(polygon);


                    KfashionImageLocationPolygonPoint polygonPoint = new KfashionImageLocationPolygonPoint();
                    polygonPoint.setWorkNo(polygonList.get(i).getWorkNo());
                    polygonPoint.setWorkStep(polygonList.get(i).getWorkStep());
                    polygonPoint.setPolyNo(polygonList.get(i).getPolyNo());
                    polygonPoint.setNo(polygonList.get(i).getNo());


                    for (int j =1 ;j< polygonList.get(i).getPoints().size(); j++ ){
                        polygonPoint.setNo(j);
                        polygonPoint.setLocationX(polygonList.get(i).getPoints().get(j).getX());
                        polygonPoint.setLocationY(polygonList.get(i).getPoints().get(j).getY());
                        polygonPoint.setLocationSeq(j);
                        System.out.println("polygonPoint" + polygonPoint);
                        msg=kfashionImageLocationPolygonPointService.insertLocationPolygonPoint(polygonPoint);
                    }

                }
            }
            return new ResponseEntity<String>(msg, HttpStatus.OK);
        }

        /**
         * 폴리곤 좌표 삭제
         * @param workNo
         * @return ResponseEntity
         * @throws Exception
         */

        @GetMapping(value="/deletePolygon")
        public ResponseEntity<Object> deletePolygon(HttpServletRequest httpRequest,
                                                  @RequestParam(value="workNo")Long workNo) {
            HashMap<String, Object> deleteMap = new HashMap<String, Object>();
            return new ResponseEntity<Object>(HttpStatus.OK);
        }


        /**
         * 폴리곤 이미지 리스트
         * @param httpRequest
         * @param createdId
         * @return polygonList
         * @throws Exception
         */
        @GetMapping(value="/polygonList")
        public ResponseEntity<Object> polygonList(HttpServletRequest httpRequest,
                                               @RequestParam(value="createdId")String createdId) {
            HashMap<String, Object> resultMap = new HashMap<String, Object>();
            List<KfashionImage> polygonList = kfashionImageService.selectPolygonList(createdId);
            resultMap.put("polygonList", polygonList);
            return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
        }

        /**
         * 폴리곤 좌표값 리스트
         * @param httpRequest
         * @param workNo
         * @return locationPolygonList
         * @throws
         */

        @GetMapping(value="/locationPolygonList")
        public ResponseEntity<Object> locationPolygonList(HttpServletRequest httpRequest,
                                                       @RequestParam(value="workNo")Long workNo){
            List<KfashionImageLocationPolygonPoint> polyNoList = kfashionImageLocationPolygonPointService.selectPolyNoList(workNo);
            System.out.println(polyNoList);
            KfashionImageLocationPolygonPoint polygon = new KfashionImageLocationPolygonPoint();
            List<KfashionImageLocationPolygonPoint> locationPolygonList = new ArrayList<>();
            HashMap<String, Object> resultMap = new HashMap<String, Object>();
            if(polyNoList != null) {
                for(int i=0; i < polyNoList.size(); i++) {
                    polygon.setWorkNo(polyNoList.get(i).getWorkNo());
                    polygon.setPolyNo(polyNoList.get(i).getPolyNo());
                    polygon.setNo(polyNoList.get(i).getNo());
                    locationPolygonList.addAll(kfashionImageLocationPolygonPointService.selectLocationPolygonList(polygon));
                }
                List<Integer> polyNo = kfashionImageLocationPolygonPointService.selectPolyNo(workNo);
                resultMap.put("polyNo",polyNo);
                resultMap.put("locationPolygonList", locationPolygonList);
            }
            return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
        }

}

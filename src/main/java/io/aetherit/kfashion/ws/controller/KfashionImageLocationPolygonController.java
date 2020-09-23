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
    private KfashionImageLocationPolygonPointService kfashionImageLocationPolygonPointService;
    private KfashionWorkHistoryService kfashionWorkHistoryService;
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
     *
     * @param httpServletRequest
     * @param polygonList
     * @return String
     * @throws Exception
     */

    @PostMapping(value = "/location")
    public ResponseEntity<Object> insertLocationPolygon(HttpServletRequest httpServletRequest,
                                                        @RequestBody List<KfashionImageLocationPolygonPoint> polygonList) throws Exception {
        kfashionImageLocationPolygonService.setLocationPolygon(polygonList);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    /**
     * 폴리곤 좌표 삭제
     *
     * @param workNo
     * @return ResponseEntity
     * @throws Exception
     */

    @GetMapping(value = "/deletePolygon")
    public ResponseEntity<Object> deletePolygon(HttpServletRequest httpRequest,
                                                @RequestParam(value = "workNo") Long workNo) {
        HashMap<String, Object> deleteMap = new HashMap<String, Object>();
        return new ResponseEntity<Object>(HttpStatus.OK);
    }


    /**
     * 폴리곤 이미지 리스트
     *
     * @param httpRequest
     * @param createdId
     * @return polygonList
     * @throws Exception
     */
    @GetMapping(value = "/polygonList")
    public ResponseEntity<Object> polygonList(HttpServletRequest httpRequest,
                                              @RequestParam(value = "createdId") String createdId,
                                              @RequestParam(value = "page", required = true, defaultValue = "0") int page,
                                              @RequestParam(value = "pageSize", required = true, defaultValue = "5") int pageSize,
                                              @RequestParam(value = "keyword",required = true, defaultValue = "")String keyword) {

        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        int startPage = page * pageSize;
        HashMap<String, Object> pageMap = new HashMap<>();
        pageMap.put("createdId",createdId);
        pageMap.put("pageSize",pageSize);
        pageMap.put("startPage",startPage);
        pageMap.put("keyword", keyword);
        List<KfashionImage> polygonList = kfashionImageService.selectPolygonList(pageMap);
        List<KfashionImage> polygonListTotal = kfashionImageService.selectPolygonListTotal(pageMap);
        int totalCount = polygonListTotal.size();
        resultMap.put("page", page);
        resultMap.put("totalCount", totalCount);
        resultMap.put("pageSize", pageSize);
        resultMap.put("polygonList", polygonList);
        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);

    }


    /**
     * 폴리곤 좌표값 리스트
     *
     * @param httpRequest
     * @param workNo
     * @return locationPolygonList
     * @throws
     */

    @GetMapping(value = "/locationPolygonList")
    public ResponseEntity<Object> locationPolygonList(HttpServletRequest httpRequest,
                                                      @RequestParam(value = "workNo") Long workNo) {
        List<KfashionImageLocationPolygonPoint> polyNoList = kfashionImageLocationPolygonPointService.selectPolyNoList(workNo);
        KfashionImageLocationPolygonPoint polygon = new KfashionImageLocationPolygonPoint();
        List<KfashionImageLocationPolygonPoint> locationPolygonList = new ArrayList<>();
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        if (polyNoList != null) {
            for (int i = 0; i < polyNoList.size(); i++) {
                polygon.setWorkNo(polyNoList.get(i).getWorkNo());
                polygon.setPolyNo(polyNoList.get(i).getPolyNo());
                polygon.setNo(polyNoList.get(i).getNo());
                locationPolygonList.addAll(kfashionImageLocationPolygonPointService.selectLocationPolygonList(polygon));
            }
            List<Integer> polyNo = kfashionImageLocationPolygonPointService.selectPolyNo(workNo);
            resultMap.put("polyNo", polyNo);
            resultMap.put("locationPolygonList", locationPolygonList);
        }
        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }

}

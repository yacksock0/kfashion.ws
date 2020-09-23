package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.model.KfashionImage;
import io.aetherit.kfashion.ws.model.KfashionImageLocationRect;
import io.aetherit.kfashion.ws.model.KfashionRectList;
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
    private KfashionCommentService kfashionCommentService;

    @Autowired
    public KfashionImageLocationRectController(KfashionImageLocationRectService kfashionImageLocationRectService,
                                               KfashionWorkHistoryService kfashionWorkHistoryService,
                                               KfashionWorkService kfashionWorkService,
                                               KfashionImageService kfashionImageService,
                                               KfashionCommentService kfashionCommentService
    ) {
        this.kfashionImageLocationRectService = kfashionImageLocationRectService;
        this.kfashionWorkHistoryService = kfashionWorkHistoryService;
        this.kfashionWorkService = kfashionWorkService;
        this.kfashionImageService = kfashionImageService;
        this.kfashionCommentService = kfashionCommentService;

    }


    /**
     * 렉트 인서트
     *
     * @param httpServletRequest
     * @param rectList
     * @return String
     * @throws Exception
     */

    @PostMapping(value = "/location")
    public ResponseEntity<Object> insertLocationRect(HttpServletRequest httpServletRequest,
                                                     @RequestBody List<KfashionRectList> rectList) throws Exception {
        kfashionImageLocationRectService.setLocationRect(rectList);
        return new ResponseEntity<Object>(HttpStatus.OK);
    }


    /**
     * 렉트 수정
     *
     * @param httpServletRequest
     * @param rectList
     * @return String
     * @throws Exception
     */

    @PostMapping(value = "/updateLocation")
    public ResponseEntity<Object> updateLocationRect(HttpServletRequest httpServletRequest,
                                                     @RequestBody List<KfashionRectList> rectList) throws Exception {
        kfashionImageLocationRectService.updateLocationRect(rectList);
        return new ResponseEntity<Object>(HttpStatus.OK);
    }

    /**
     * 렉트 좌표값 리스트
     *
     * @param httpRequest
     * @param workNo
     * @return locationRectList
     * @throws
     */

    @GetMapping(value = "/locationRectList")
    public ResponseEntity<Object> locationRectList(HttpServletRequest httpRequest,
                                                   @RequestParam(value = "workNo") Long workNo) {
        List<KfashionImageLocationRect> rectNoList = kfashionImageLocationRectService.selectRectNoList(workNo);
        KfashionImageLocationRect rect = new KfashionImageLocationRect();
        List<KfashionImageLocationRect> locationRectList = new ArrayList<>();
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        if (rectNoList != null) {
            for (int i = 0; i < rectNoList.size(); i++) {
                rect.setWorkNo(rectNoList.get(i).getWorkNo());
                rect.setRectNo(rectNoList.get(i).getRectNo());
                locationRectList.addAll(kfashionImageLocationRectService.selectLocationRectList(rect));
            }
            resultMap.put("locationRectList", locationRectList);
        }
        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }

    /**
     * 렉트 이미지 리스트
     *
     * @param httpRequest
     * @param createdId
     * @return rectList
     * @throws
     */

    @GetMapping(value = "/rectList")
    public ResponseEntity<Object> rectList(HttpServletRequest httpRequest,
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
        List<KfashionImage> rectList = kfashionImageService.selectRectList(pageMap);
        Long totalCount = kfashionImageService.selectRectListTotal(pageMap);
        resultMap.put("page", page);
        resultMap.put("totalCount", totalCount);
        resultMap.put("pageSize", pageSize);
        resultMap.put("rectList", rectList);
        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }

}

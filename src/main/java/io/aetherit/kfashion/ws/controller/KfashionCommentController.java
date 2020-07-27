package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.model.KfashionCategoryItem;
import io.aetherit.kfashion.ws.model.KfashionComment;
import io.aetherit.kfashion.ws.model.KfashionImageLocationRect;
import io.aetherit.kfashion.ws.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/kfashion/comment")
public class KfashionCommentController {

    private KfashionCommentService kfashionCommentService;
    private KfashionWorkHistoryService kfashionWorkHistoryService;
    private KfashionImageLocationPolygonService kfashionImageLocationPolygonService;
    private KfashionImageLocationPolygonPointService kfashionImageLocationPolygonPointService;
    private KfashionImageLocationRectService kfashionImageLocationRectService;

    @Autowired
    public KfashionCommentController(KfashionCommentService kfashionCommentService,
                                     KfashionWorkHistoryService kfashionWorkHistoryService,
                                     KfashionImageLocationPolygonService kfashionImageLocationPolygonService,
                                     KfashionImageLocationPolygonPointService kfashionImageLocationPolygonPointService,
                                     KfashionImageLocationRectService kfashionImageLocationRectService) {
        this.kfashionCommentService = kfashionCommentService;
        this.kfashionWorkHistoryService = kfashionWorkHistoryService;
        this.kfashionImageLocationPolygonService = kfashionImageLocationPolygonService;
        this.kfashionImageLocationPolygonPointService = kfashionImageLocationPolygonPointService;
        this.kfashionImageLocationRectService = kfashionImageLocationRectService;
    }

    /**
     * 기본 작업 리턴 코멘트
     * @param kfashionComment
     * @return ResponseEntity
     * @throws Exception
     */

    @PostMapping(value = "/highComment")
    public ResponseEntity<Object> highComment(HttpServletRequest httpRequest,
                                                   @RequestBody KfashionComment kfashionComment) {
        kfashionComment.setReceiveId(kfashionWorkHistoryService.selectReceiveId(kfashionComment.getWorkNo()));
        if(kfashionComment.getWorkStep1() == 3) {
            if(kfashionComment.getWorkType1() == 1) {
                Map<String,Object> selectMap = new HashMap<>();
                selectMap.put("workNo",kfashionComment.getWorkNo());
                selectMap.put("workStep",kfashionComment.getWorkStep1());
                int commentNo =kfashionCommentService.selectCommentNo(selectMap);
                kfashionComment.setCommentNo(commentNo);
                kfashionComment.setWorkStep(3);
                kfashionComment.setWorkType(1);
                kfashionCommentService.insertHighPolyComment(kfashionComment);
                Map<String,Object> deleteMap = new HashMap<>();
                deleteMap.put("workNo",kfashionComment.getWorkNo());
                deleteMap.put("polyNo",kfashionComment.getWorkType1());
                deleteMap.put("rectNo",kfashionComment.getWorkType1());
                kfashionImageLocationPolygonPointService.deletePolyPoint(deleteMap);
                kfashionImageLocationPolygonService.deletePoly(deleteMap);
                kfashionImageLocationRectService.deleteRect(deleteMap);
            }
            if(kfashionComment.getWorkType2() == 2) {
                Map<String,Object> selectMap = new HashMap<>();
                selectMap.put("workNo",kfashionComment.getWorkNo());
                selectMap.put("workStep",kfashionComment.getWorkStep1());
                int commentNo =kfashionCommentService.selectCommentNo(selectMap);
                kfashionComment.setCommentNo(commentNo);
                kfashionComment.setWorkStep(3);
                kfashionComment.setWorkType(2);
                kfashionCommentService.insertHighPolyComment(kfashionComment);
                Map<String,Object> deleteMap = new HashMap<>();
                deleteMap.put("workNo",kfashionComment.getWorkNo());
                deleteMap.put("polyNo",kfashionComment.getWorkType2());
                deleteMap.put("rectNo",kfashionComment.getWorkType2());
                kfashionImageLocationPolygonPointService.deletePolyPoint(deleteMap);
                kfashionImageLocationPolygonService.deletePoly(deleteMap);
                kfashionImageLocationRectService.deleteRect(deleteMap);
            }
            if(kfashionComment.getWorkType3() == 3) {
                Map<String,Object> selectMap = new HashMap<>();
                selectMap.put("workNo",kfashionComment.getWorkNo());
                selectMap.put("workStep",kfashionComment.getWorkStep1());
                int commentNo =kfashionCommentService.selectCommentNo(selectMap);
                kfashionComment.setCommentNo(commentNo);
                kfashionComment.setWorkStep(3);
                kfashionComment.setWorkType(3);
                kfashionCommentService.insertHighPolyComment(kfashionComment);
                Map<String,Object> deleteMap = new HashMap<>();
                deleteMap.put("workNo",kfashionComment.getWorkNo());
                deleteMap.put("polyNo",kfashionComment.getWorkType3());
                deleteMap.put("rectNo",kfashionComment.getWorkType3());
                kfashionImageLocationPolygonPointService.deletePolyPoint(deleteMap);
                kfashionImageLocationPolygonService.deletePoly(deleteMap);
                kfashionImageLocationRectService.deleteRect(deleteMap);
            }
            if(kfashionComment.getWorkType4() == 4) {
                Map<String,Object> selectMap = new HashMap<>();
                selectMap.put("workNo",kfashionComment.getWorkNo());
                selectMap.put("workStep",kfashionComment.getWorkStep1());
                int commentNo =kfashionCommentService.selectCommentNo(selectMap);
                kfashionComment.setCommentNo(commentNo);
                kfashionComment.setWorkStep(3);
                kfashionComment.setWorkType(4);
                kfashionCommentService.insertHighPolyComment(kfashionComment);
                Map<String,Object> deleteMap = new HashMap<>();
                deleteMap.put("workNo",kfashionComment.getWorkNo());
                deleteMap.put("polyNo",kfashionComment.getWorkType4());
                deleteMap.put("rectNo",kfashionComment.getWorkType4());
                kfashionImageLocationPolygonPointService.deletePolyPoint(deleteMap);
                kfashionImageLocationPolygonService.deletePoly(deleteMap);
                kfashionImageLocationRectService.deleteRect(deleteMap);
            }
        }
        if(kfashionComment.getWorkStep2() == 4) {
            Map<String,Object> selectMap = new HashMap<>();
            selectMap.put("workNo",kfashionComment.getWorkNo());
            selectMap.put("workStep",kfashionComment.getWorkStep2());
            int commentNo =kfashionCommentService.selectCommentNo(selectMap);
            kfashionComment.setCommentNo(commentNo);
            kfashionComment.setWorkStep(4);
            kfashionCommentService.insertHighLabelComment(kfashionComment);
        }
        return new ResponseEntity<Object>(HttpStatus.OK);
    }


    /**
     * 코멘트 타입 리스트
     * @param workNo
     * @return ResponseEntity
     * @throws
     */
    @GetMapping (value = "/workTypeList")
    public ResponseEntity<Object> workTypeList(HttpServletRequest httpRequest,
                                            @RequestParam (value="workNo")Long workNo) {
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        List<Integer> workTypeList = kfashionCommentService.selectWorkTypeList(workNo);
        resultMap.put("workTypeList", workTypeList);
        System.out.println("workTypeList"+workTypeList);
        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }

}

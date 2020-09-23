package io.aetherit.kfashion.ws.service;

import io.aetherit.kfashion.ws.model.KfashionComment;
import io.aetherit.kfashion.ws.model.KfashionImage;
import io.aetherit.kfashion.ws.repository.KfashionCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class KfashionCommentService {

    private KfashionCommentRepository repository;
    private KfashionWorkHistoryService kfashionWorkHistoryService;
    private KfashionImageLocationPolygonService kfashionImageLocationPolygonService;
    private KfashionImageLocationPolygonPointService kfashionImageLocationPolygonPointService;
    private KfashionImageLocationRectService kfashionImageLocationRectService;

    @Autowired
    public KfashionCommentService(KfashionCommentRepository repository,
                                  KfashionWorkHistoryService kfashionWorkHistoryService,
                                  KfashionImageLocationPolygonService kfashionImageLocationPolygonService,
                                  KfashionImageLocationPolygonPointService kfashionImageLocationPolygonPointService,
                                  KfashionImageLocationRectService kfashionImageLocationRectService) {
        this.repository = repository;
        this.kfashionWorkHistoryService = kfashionWorkHistoryService;
        this.kfashionImageLocationPolygonService = kfashionImageLocationPolygonService;
        this.kfashionImageLocationPolygonPointService = kfashionImageLocationPolygonPointService;
        this.kfashionImageLocationRectService = kfashionImageLocationRectService;
    }


    public void insertHighLabelComment(KfashionComment kfashionComment) {
        repository.insertHighLabelComment(kfashionComment);
    }

    public void insertHighPolyComment(KfashionComment kfashionComment) {
        repository.insertHighPolyComment(kfashionComment);
    }

    public int selectCommentNo(Map<String, Object> selectMap) {
        return repository.selectCommentNo(selectMap);
    }

    public void updateComment(Map<String, Object> updateMap) {
        repository.updateComment(updateMap);
    }

    public String selectComment(Long workNo) {
        return repository.selectComment(workNo);
    }

    public List<Integer> selectWorkTypeList(Long workNo) {
        return repository.selectWorkTypeList(workNo);
    }

    public void updatePolyComment(Map<String, Object> updateMap) {
        repository.updatePolyComment(updateMap);
    }

    public List<KfashionComment> selectCommentWorkNoList() {
        return repository.selectCommentWorkNoList();
    }

    public List<KfashionComment> selectCommentComplete(Long workNo) {
        return repository.selectCommentComplete(workNo);
    }

    public void deleteCommentAll(KfashionImage workImage) {
        repository.deleteCommentAll(workImage);
    }

    @Transactional(rollbackFor = {RuntimeException.class, SQLException.class, Exception.class})
    public void setHighComment(KfashionComment kfashionComment) {
        kfashionComment.setReceiveId(kfashionWorkHistoryService.selectReceiveId(kfashionComment.getWorkNo()));
        if (kfashionComment.getWorkStep1() == 3) {
            if (kfashionComment.getWorkType1() == 1) {
                Map<String, Object> selectMap = new HashMap<>();
                selectMap.put("workNo", kfashionComment.getWorkNo());
                selectMap.put("workStep", kfashionComment.getWorkStep1());
                int commentNo = repository.selectCommentNo(selectMap);
                kfashionComment.setCommentNo(commentNo);
                kfashionComment.setWorkStep(3);
                kfashionComment.setWorkType(1);
                repository.insertHighPolyComment(kfashionComment);
                Map<String, Object> deleteMap = new HashMap<>();
                deleteMap.put("workNo", kfashionComment.getWorkNo());
                deleteMap.put("polyNo", kfashionComment.getWorkType1());
                deleteMap.put("rectNo", kfashionComment.getWorkType1());
                kfashionImageLocationPolygonPointService.deletePolyPoint(deleteMap);
                kfashionImageLocationPolygonService.deletePoly(deleteMap);
                kfashionImageLocationRectService.deleteRect(deleteMap);
            }
            if (kfashionComment.getWorkType2() == 2) {
                Map<String, Object> selectMap = new HashMap<>();
                selectMap.put("workNo", kfashionComment.getWorkNo());
                selectMap.put("workStep", kfashionComment.getWorkStep1());
                int commentNo = repository.selectCommentNo(selectMap);
                kfashionComment.setCommentNo(commentNo);
                kfashionComment.setWorkStep(3);
                kfashionComment.setWorkType(2);
                repository.insertHighPolyComment(kfashionComment);
                Map<String, Object> deleteMap = new HashMap<>();
                deleteMap.put("workNo", kfashionComment.getWorkNo());
                deleteMap.put("polyNo", kfashionComment.getWorkType2());
                deleteMap.put("rectNo", kfashionComment.getWorkType2());
                kfashionImageLocationPolygonPointService.deletePolyPoint(deleteMap);
                kfashionImageLocationPolygonService.deletePoly(deleteMap);
                kfashionImageLocationRectService.deleteRect(deleteMap);
            }
            if (kfashionComment.getWorkType3() == 3) {
                Map<String, Object> selectMap = new HashMap<>();
                selectMap.put("workNo", kfashionComment.getWorkNo());
                selectMap.put("workStep", kfashionComment.getWorkStep1());
                int commentNo = repository.selectCommentNo(selectMap);
                kfashionComment.setCommentNo(commentNo);
                kfashionComment.setWorkStep(3);
                kfashionComment.setWorkType(3);
                repository.insertHighPolyComment(kfashionComment);
                Map<String, Object> deleteMap = new HashMap<>();
                deleteMap.put("workNo", kfashionComment.getWorkNo());
                deleteMap.put("polyNo", kfashionComment.getWorkType3());
                deleteMap.put("rectNo", kfashionComment.getWorkType3());
                kfashionImageLocationPolygonPointService.deletePolyPoint(deleteMap);
                kfashionImageLocationPolygonService.deletePoly(deleteMap);
                kfashionImageLocationRectService.deleteRect(deleteMap);
            }
            if (kfashionComment.getWorkType4() == 4) {
                Map<String, Object> selectMap = new HashMap<>();
                selectMap.put("workNo", kfashionComment.getWorkNo());
                selectMap.put("workStep", kfashionComment.getWorkStep1());
                int commentNo = repository.selectCommentNo(selectMap);
                kfashionComment.setCommentNo(commentNo);
                kfashionComment.setWorkStep(3);
                kfashionComment.setWorkType(4);
                repository.insertHighPolyComment(kfashionComment);
                Map<String, Object> deleteMap = new HashMap<>();
                deleteMap.put("workNo", kfashionComment.getWorkNo());
                deleteMap.put("polyNo", kfashionComment.getWorkType4());
                deleteMap.put("rectNo", kfashionComment.getWorkType4());
                kfashionImageLocationPolygonPointService.deletePolyPoint(deleteMap);
                kfashionImageLocationPolygonService.deletePoly(deleteMap);
                kfashionImageLocationRectService.deleteRect(deleteMap);
            }
        }
    }

    @Transactional(rollbackFor = {RuntimeException.class, SQLException.class, Exception.class})
    public void setHighCommentLabel(KfashionComment kfashionComment) {
        kfashionComment.setReceiveId(kfashionWorkHistoryService.selectReceiveId(kfashionComment.getWorkNo()));
        if (kfashionComment.getWorkStep2() == 4) {
            Map<String, Object> selectMap = new HashMap<>();
            selectMap.put("workNo", kfashionComment.getWorkNo());
            selectMap.put("workStep", kfashionComment.getWorkStep2());
            int commentNo = repository.selectCommentNo(selectMap);
            kfashionComment.setCommentNo(commentNo);
            kfashionComment.setWorkStep(4);
            repository.insertHighLabelComment(kfashionComment);
        }
    }
}

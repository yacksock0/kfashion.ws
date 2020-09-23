package io.aetherit.kfashion.ws.service;

import io.aetherit.kfashion.ws.model.KfashionImage;
import io.aetherit.kfashion.ws.repository.KfashionImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class KfashionImageService {
    private KfashionImageRepository repository;
    private KfashionWorkService kfashionWorkService;
    private KfashionWorkHistoryService kfashionWorkHistoryService;
    private KfashionCommentService kfashionCommentService;
    private KfashionImageLocationPolygonService kfashionImageLocationPolygonService;
    private KfashionImageLocationPolygonPointService kfashionImageLocationPolygonPointService;
    private KfashionImageLocationRectService kfashionImageLocationRectService;
    private KfashionLabelService kfashionLabelService;

    @Autowired
    public KfashionImageService(KfashionImageRepository repository,
                                KfashionWorkService kfashionWorkService,
                                KfashionWorkHistoryService kfashionWorkHistoryService,
                                KfashionCommentService kfashionCommentService,
                                KfashionImageLocationPolygonService kfashionImageLocationPolygonService,
                                KfashionImageLocationPolygonPointService kfashionImageLocationPolygonPointService,
                                KfashionImageLocationRectService kfashionImageLocationRectService,
                                KfashionLabelService kfashionLabelService) {
        this.repository = repository;
        this.kfashionWorkService = kfashionWorkService;
        this.kfashionWorkHistoryService = kfashionWorkHistoryService;
        this.kfashionCommentService = kfashionCommentService;
        this.kfashionImageLocationPolygonService = kfashionImageLocationPolygonService;
        this.kfashionImageLocationPolygonPointService = kfashionImageLocationPolygonPointService;
        this.kfashionImageLocationRectService = kfashionImageLocationRectService;
        this.kfashionLabelService = kfashionLabelService;
    }

    public void insertImgUpload(KfashionImage kfashionImage) {
        repository.insertImgUpload(kfashionImage);
    }

    public List<KfashionImage> selectBoundaryList() {
        return repository.selectBoundaryList();
    }

    public Map<String, Object> getByteImage(Long workNo) {
        return repository.getByteImage(workNo);
    }

    public List<KfashionImage> selectPolygonList(HashMap<String, Object> pageMap) {
        return repository.selectPolygonList(pageMap);
    }

    public List<KfashionImage> selectRectList(HashMap<String, Object> pageMap) {
        return repository.selectRectList(pageMap);
    }

    public List<KfashionImage> recentlyImg(String createdId) {
        return repository.recentlyImg(createdId);
    }

    @Transactional(rollbackFor = {RuntimeException.class, SQLException.class, Exception.class})
    public void deleteImage(KfashionImage workImage) {
        kfashionLabelService.deleteLabelAll(workImage);
        kfashionCommentService.deleteCommentAll(workImage);
        kfashionImageLocationPolygonPointService.deletePolyPointAll(workImage);
        kfashionImageLocationPolygonService.deletePolyAll(workImage);
        kfashionImageLocationRectService.deleteRectAll(workImage);
        kfashionWorkHistoryService.deleteWorkHistory(workImage);
        repository.deleteImage(workImage);
        kfashionWorkService.deleteWork(workImage);
    }

    public List<KfashionImage> selectProfessionalList(HashMap<String, Object> pageMap) {
        return repository.selectProfessionalList(pageMap);
    }

    public List<KfashionImage> selectInspectionList(Map<String, Object> pageMap) {
        return repository.selectInspectionList(pageMap);
    }

    public List<KfashionImage> selectInspectionHighList(HashMap<String, Object> pageMap) {
        return repository.selectInspectionHighList(pageMap);
    }

    public int selectTotalCount(HashMap<String, Object> map) {
        return repository.selectTotalCount(map);
    }

    public List<KfashionImage> selectSuccessList(HashMap<String, Object> pageMap) {
        return repository.selectSuccessList(pageMap);
    }

    public Long selectInspectionListTotal(Map<String, Object> pageMap) {
        return repository.selectInspectionListTotal(pageMap);
    }

    public List<KfashionImage> selectProfessionalInspectionList(Map<String, Object> pageMap) {
        return repository.selectProfessionalInspectionList(pageMap);
    }


    public Long selectProfessionalInspectionListTotal(Map<String, Object> pageMap) {
        return repository.selectProfessionalInspectionListTotal(pageMap);
    }

    public Long selectProfessionalListTotal(HashMap<String, Object> pageMap) {
        return repository.selectProfessionalListTotal(pageMap);
    }

    public Long selectSuccessListTotal(HashMap<String, Object> pageMap) {
        return repository.selectSuccessListTotal(pageMap);
    }

    public Long selectRectListTotal(HashMap<String, Object> pageMap) {
        return repository.selectRectListTotal(pageMap);
    }

    public List<KfashionImage> selectPolygonListTotal(HashMap<String, Object> pageMap) {
        return repository.selectPolygonListTotal(pageMap);
    }

    public Long selectInspectionHighListTotal(HashMap<String, Object> pageMap) {
        return repository.selectInspectionHighListTotal(pageMap);
    }
}

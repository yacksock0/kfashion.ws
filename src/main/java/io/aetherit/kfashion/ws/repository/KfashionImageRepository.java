package io.aetherit.kfashion.ws.repository;

import io.aetherit.kfashion.ws.model.KfashionImage;
import io.aetherit.kfashion.ws.repository.mapper.KfashionImageMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class KfashionImageRepository {
    private KfashionImageMapper mapper;

    @Autowired
    public KfashionImageRepository(KfashionImageMapper mapper) {
        this.mapper = mapper;
    }

    public void insertImgUpload(KfashionImage kfashionImage) {
        mapper.insertImgUpload(kfashionImage);
    }

    public List<KfashionImage> selectBoundaryList() {
        return mapper.selectBoundaryList();
    }

    public Map<String, Object> getByteImage(Long workNo) {
        return mapper.getByteImage(workNo);
    }

    public List<KfashionImage> selectPolygonList(HashMap<String, Object> pageMap) {
        return mapper.selectPolygonList(pageMap);
    }

    public List<KfashionImage> selectRectList(HashMap<String, Object> pageMap) {
        return mapper.selectRectList(pageMap);
    }

    public List<KfashionImage> recentlyImg(String createdId) {
        return mapper.recentlyImg(createdId);
    }

    public void deleteImage(KfashionImage workImage) {
        mapper.deleteImage(workImage);
    }

    public List<KfashionImage> selectProfessionalList(HashMap<String, Object> pageMap) {
        return mapper.selectProfessionalList(pageMap);
    }

    public List<KfashionImage> selectInspectionList(Map<String, Object> pageMap) {
        return mapper.selectInspectionList(pageMap);
    }

    public List<KfashionImage> selectInspectionHighList(HashMap<String, Object> pageMap) {
        return mapper.selectInspectionHighList(pageMap);
    }

    public int selectTotalCount(HashMap<String, Object> map) {
        return mapper.selectTotalCount(map);
    }

    public List<KfashionImage> selectSuccessList(HashMap<String, Object> pageMap) {
        return mapper.selectSuccessList(pageMap);
    }

    public Long selectInspectionListTotal(Map<String, Object> pageMap) {
        return mapper.selectInspectionListTotal(pageMap);
    }

    public List<KfashionImage> selectProfessionalInspectionList(Map<String, Object> pageMap) {
        return mapper.selectProfessionalInspectionList(pageMap);
    }

    public Long selectProfessionalInspectionListTotal(Map<String, Object> pageMap) {
        return mapper.selectProfessionalInspectionListTotal(pageMap);
    }

    public Long selectProfessionalListTotal(HashMap<String, Object> pageMap) {
        return mapper.selectProfessionalListTotal(pageMap);
    }

    public Long selectSuccessListTotal(HashMap<String, Object> pageMap) {
        return mapper.selectSuccessListTotal(pageMap);
    }

    public Long selectRectListTotal(HashMap<String, Object> pageMap) {
        return mapper.selectRectListTotal(pageMap);
    }

    public List<KfashionImage> selectPolygonListTotal(HashMap<String, Object> pageMap) {
        return mapper.selectPolygonListTotal(pageMap);
    }

    public Long selectInspectionHighListTotal(HashMap<String, Object> pageMap) {
        return mapper.selectInspectionHighListTotal(pageMap);
    }
}

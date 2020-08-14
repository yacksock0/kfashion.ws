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

    public List<KfashionImage> selectPolygonList(String createdId) {
        return mapper.selectPolygonList(createdId);
    }

    public List<KfashionImage> selectRectList(String createdId) {
        return mapper.selectRectList(createdId);
    }

    public List<KfashionImage> recentlyImg(String createdId) {
        return mapper.recentlyImg(createdId);
    }

    public void deleteImage(KfashionImage workImage) {
        mapper.deleteImage(workImage);
    }

    public List<KfashionImage> selectProfessionalList(HashMap<String, Object> map) {
        return mapper.selectProfessionalList(map);
    }

    public List<KfashionImage> selectInspectionList(String createdId) {
        return mapper.selectInspectionList(createdId);
    }

    public List<KfashionImage> selectInspectionHighList(Long workNo) {
        return mapper.selectInspectionHighList(workNo);
    }

    public int selectTotalCount(HashMap<String, Object> map) {
        return mapper.selectTotalCount(map);
    }
}

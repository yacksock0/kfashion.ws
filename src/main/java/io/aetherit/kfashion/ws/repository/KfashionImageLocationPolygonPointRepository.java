package io.aetherit.kfashion.ws.repository;

import io.aetherit.kfashion.ws.model.KfashionImage;
import io.aetherit.kfashion.ws.model.KfashionImageLocationPolygonPoint;
import io.aetherit.kfashion.ws.repository.mapper.KfashionImageLocationPolygonPointMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class KfashionImageLocationPolygonPointRepository {
    private KfashionImageLocationPolygonPointMapper mapper;

    @Autowired
    public KfashionImageLocationPolygonPointRepository(KfashionImageLocationPolygonPointMapper mapper) {
        this.mapper = mapper;
    }

    public void insertLocationPolygonPoint(KfashionImageLocationPolygonPoint polygonPoint) {
        mapper.insertLocationPolygonPoint(polygonPoint);
    }

    public List<KfashionImageLocationPolygonPoint> selectPolyNoList(Long workNo) {
        return mapper.selectPolyNoList(workNo);
    }

    public List<KfashionImageLocationPolygonPoint> selectLocationPolygonList(KfashionImageLocationPolygonPoint polygon) {
        return mapper.selectLocationPolygonList(polygon);
    }

    public List<Integer> selectPolyNo(Long workNo) {
        return mapper.selectPolyNo(workNo);
    }

    public int[] selectLabelNo(Long workNo) {
        return mapper.selectLabelNo(workNo);
    }

    public void deletePolyPoint(Map<String, Object> deleteMap) {
        mapper.deletePolyPoint(deleteMap);
    }

    public List<KfashionImageLocationPolygonPoint> selectPolygonList(KfashionImageLocationPolygonPoint polygon) {
        return mapper.selectPolygonList(polygon);
    }

    public void deletePolyPointAll(KfashionImage workImage) {
        mapper.deletePolyPointAll(workImage);
    }
}

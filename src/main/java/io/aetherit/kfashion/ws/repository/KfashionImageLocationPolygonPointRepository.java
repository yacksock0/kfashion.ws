package io.aetherit.kfashion.ws.repository;

import io.aetherit.kfashion.ws.model.KfashionImageLocationPolygonPoint;
import io.aetherit.kfashion.ws.repository.mapper.KfashionImageLocationPolygonMapper;
import io.aetherit.kfashion.ws.repository.mapper.KfashionImageLocationPolygonPointMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

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
}

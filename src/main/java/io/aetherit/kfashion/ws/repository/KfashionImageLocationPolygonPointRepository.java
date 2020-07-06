package io.aetherit.kfashion.ws.repository;

import io.aetherit.kfashion.ws.model.KfashionImageLocationPolygonPoint;
import io.aetherit.kfashion.ws.repository.mapper.KfashionImageLocationPolygonMapper;
import io.aetherit.kfashion.ws.repository.mapper.KfashionImageLocationPolygonPointMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

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
}

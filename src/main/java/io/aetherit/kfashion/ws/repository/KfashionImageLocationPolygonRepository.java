package io.aetherit.kfashion.ws.repository;

import io.aetherit.kfashion.ws.model.KfashionImageLocationPolygon;
import io.aetherit.kfashion.ws.repository.mapper.KfashionImageLocationPolygonMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class KfashionImageLocationPolygonRepository {
    private KfashionImageLocationPolygonMapper mapper;

    @Autowired
    public KfashionImageLocationPolygonRepository(KfashionImageLocationPolygonMapper mapper) {
        this.mapper = mapper;
    }

    public void insertLocationPolygon(KfashionImageLocationPolygon polygon) {
        mapper.insertLocationPolygon(polygon);
    }
}

package io.aetherit.kfashion.ws.repository;

import io.aetherit.kfashion.ws.model.KfashionImageLocationPolygon;
import io.aetherit.kfashion.ws.repository.mapper.KfashionImageLocationPolygonMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class KfashionImageLocationPolygonRepository {
    private KfashionImageLocationPolygonMapper mapper;

    @Autowired
    public KfashionImageLocationPolygonRepository(KfashionImageLocationPolygonMapper mapper) {
        this.mapper = mapper;
    }

    public String insertLocationPolygon(KfashionImageLocationPolygon polygon) {
        String msg="";
        mapper.insertLocationPolygon(polygon);
        return msg;
    }

    public void deletePoly(Map<String, Object> deleteMap) {
        mapper.deletePoly(deleteMap);
    }
}

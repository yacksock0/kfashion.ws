package io.aetherit.kfashion.ws.repository.mapper;

import io.aetherit.kfashion.ws.model.KfashionImageLocationPolygon;

import java.util.List;
import java.util.Map;

public interface KfashionImageLocationPolygonMapper {
    void insertLocationPolygon(KfashionImageLocationPolygon polygon);

    void deletePoly(Map<String, Object> deleteMap);
}

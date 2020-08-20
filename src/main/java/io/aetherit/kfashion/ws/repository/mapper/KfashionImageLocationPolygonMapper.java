package io.aetherit.kfashion.ws.repository.mapper;

import io.aetherit.kfashion.ws.model.KfashionImage;
import io.aetherit.kfashion.ws.model.KfashionImageLocationPolygon;

import java.util.Map;

public interface KfashionImageLocationPolygonMapper {
    void insertLocationPolygon(KfashionImageLocationPolygon polygon);

    void deletePoly(Map<String, Object> deleteMap);

    void deletePolyAll(KfashionImage workImage);
}

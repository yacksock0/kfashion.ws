package io.aetherit.kfashion.ws.repository.mapper;

import io.aetherit.kfashion.ws.model.KfashionImageLocationPolygonPoint;

import java.util.List;

public interface KfashionImageLocationPolygonPointMapper {
    void insertLocationPolygonPoint(KfashionImageLocationPolygonPoint polygonPoint);

    List<KfashionImageLocationPolygonPoint> selectPolyNoList(Long workNo);

    List<KfashionImageLocationPolygonPoint> selectLocationPolygonList(KfashionImageLocationPolygonPoint polygon);
}

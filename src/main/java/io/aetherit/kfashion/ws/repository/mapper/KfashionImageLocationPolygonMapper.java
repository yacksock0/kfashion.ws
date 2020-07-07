package io.aetherit.kfashion.ws.repository.mapper;

import io.aetherit.kfashion.ws.model.KfashionImageLocationPolygon;

import java.util.List;

public interface KfashionImageLocationPolygonMapper {
    void insertLocationPolygon(KfashionImageLocationPolygon polygon);
    List<KfashionImageLocationPolygon> selectPolygonList(String createdId);
}

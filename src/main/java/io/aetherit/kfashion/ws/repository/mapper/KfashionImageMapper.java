package io.aetherit.kfashion.ws.repository.mapper;

import io.aetherit.kfashion.ws.model.KfashionImage;

import java.util.List;
import java.util.Map;

public interface KfashionImageMapper {
    void insertImgUpload(KfashionImage kfashionImage);

    List<KfashionImage> selectBoundaryList(String createdId);

    Map<String, Object> getByteImage(int workNo);

    List<KfashionImage> selectPolygonList(String createdId);

    List<KfashionImage> selectRectList(String createdId);
}

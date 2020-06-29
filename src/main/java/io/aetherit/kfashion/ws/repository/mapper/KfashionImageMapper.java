package io.aetherit.kfashion.ws.repository.mapper;

import io.aetherit.kfashion.ws.model.KfashionImage;

import java.util.List;

public interface KfashionImageMapper {
    void insertImgUpload(KfashionImage kfashionImage);

    List<KfashionImage> selectBoundaryList();
}

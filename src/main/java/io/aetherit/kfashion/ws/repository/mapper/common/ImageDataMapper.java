package io.aetherit.kfashion.ws.repository.mapper.common;

import io.aetherit.kfashion.ws.model.KfashionImage;

import java.util.List;

public interface ImageDataMapper {

    List<KfashionImage> selectAllImageData();

    String selectImageWorkName(Long workNo);
}

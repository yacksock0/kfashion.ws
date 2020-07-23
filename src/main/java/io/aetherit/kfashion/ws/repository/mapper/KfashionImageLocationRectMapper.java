package io.aetherit.kfashion.ws.repository.mapper;

import io.aetherit.kfashion.ws.model.KfashionCategoryItem;
import io.aetherit.kfashion.ws.model.KfashionImageLocationRect;

import java.util.List;
import java.util.Map;

public interface KfashionImageLocationRectMapper {
    void insertLocationRect(KfashionImageLocationRect rect);

    List<KfashionImageLocationRect> selectLocationRectList(KfashionImageLocationRect rect);

    List<KfashionImageLocationRect> selectRectNoList(Long workNo);

    void deleteRect(Map<String, Object> deleteMap);
}

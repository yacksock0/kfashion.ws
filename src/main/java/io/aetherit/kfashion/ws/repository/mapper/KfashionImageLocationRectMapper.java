package io.aetherit.kfashion.ws.repository.mapper;

import io.aetherit.kfashion.ws.model.KfashionCategoryItem;
import io.aetherit.kfashion.ws.model.KfashionImageLocationRect;

import java.util.List;

public interface KfashionImageLocationRectMapper {
    void insertLocationRect(KfashionImageLocationRect rect);

    List<KfashionCategoryItem> selectRectList(KfashionImageLocationRect rect);
    List<KfashionImageLocationRect> selectLocationRectList(String workNo);
}

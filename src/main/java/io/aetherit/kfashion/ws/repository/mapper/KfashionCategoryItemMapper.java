package io.aetherit.kfashion.ws.repository.mapper;

import io.aetherit.kfashion.ws.model.KfashionCategoryItem;
import java.util.List;

public interface KfashionCategoryItemMapper {
    List<KfashionCategoryItem> selectCategoryItem();
    List<KfashionCategoryItem> selectColorList();
    List<KfashionCategoryItem> selectSleeveLengthList();

}

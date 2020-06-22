package io.aetherit.kfashion.ws.repository;

import io.aetherit.kfashion.ws.model.KfashionCategoryItem;
import io.aetherit.kfashion.ws.repository.mapper.KfashionCategoryItemMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class KfashionCategoryItemRepository {

    private KfashionCategoryItemMapper mapper;

    @Autowired
    public KfashionCategoryItemRepository(KfashionCategoryItemMapper mapper) {
        this.mapper = mapper;
    }

    public List<KfashionCategoryItem> selectCategoryItem() {
        return mapper.selectCategoryItem();
    }

    public List<KfashionCategoryItem> selectColorList() {
        return mapper.selectColorList();
    }

    public List<KfashionCategoryItem> selectSleeveLengthList() {
        return mapper.selectSleeveLengthList();
    }
}

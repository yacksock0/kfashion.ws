package io.aetherit.kfashion.ws.repository;

import io.aetherit.kfashion.ws.model.KfashionCategory;
import io.aetherit.kfashion.ws.repository.mapper.KfashionBasicMapper;
import io.aetherit.kfashion.ws.repository.mapper.KfashionCategoryMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class KfashionCategoryRepository {
    private KfashionCategoryMapper mapper;

    @Autowired
    public KfashionCategoryRepository(KfashionCategoryMapper mapper) {
        this.mapper = mapper;
    }

    public List<KfashionCategory> categoryList() {
        return mapper.categoryList();
    }
}

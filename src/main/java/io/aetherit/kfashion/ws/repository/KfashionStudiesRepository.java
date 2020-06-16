package io.aetherit.kfashion.ws.repository;

import io.aetherit.kfashion.ws.model.KfashionStudies;
import io.aetherit.kfashion.ws.repository.mapper.KfashionStudiesMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class KfashionStudiesRepository {
    private KfashionStudiesMapper mapper;

    @Autowired
    public KfashionStudiesRepository (KfashionStudiesMapper mapper) {
        this.mapper =mapper;
    }

    public void kfashionStudiesInsert(KfashionStudies kfashionStudies) {
        mapper.kfashionStudiesInsert(kfashionStudies);
    }
}

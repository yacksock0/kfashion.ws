package io.aetherit.kfashion.ws.repository;

import io.aetherit.kfashion.ws.repository.mapper.KfashionImageLocationRectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class KfashionImageLocationRectRepository {
    private KfashionImageLocationRectMapper mapper;

    @Autowired
    public KfashionImageLocationRectRepository(KfashionImageLocationRectMapper mapper) {
        this.mapper = mapper;
    }
}

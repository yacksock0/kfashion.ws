package io.aetherit.kfashion.ws.repository;

import io.aetherit.kfashion.ws.repository.mapper.KfashionWorkMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class KfashionWorkRepository {
    private KfashionWorkMapper mapper;

    @Autowired
    public KfashionWorkRepository(KfashionWorkMapper mapper) {
        this.mapper = mapper;
    }
}

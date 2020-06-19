package io.aetherit.kfashion.ws.repository;

import io.aetherit.kfashion.ws.repository.mapper.KfashionUserGroupMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class KfashionUserGroupRepository {
    private KfashionUserGroupMapper mapper;

    @Autowired
    public KfashionUserGroupRepository(KfashionUserGroupMapper mapper) {
        this.mapper = mapper;
    }
}

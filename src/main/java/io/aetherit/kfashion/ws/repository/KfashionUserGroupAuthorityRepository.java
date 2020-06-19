package io.aetherit.kfashion.ws.repository;

import io.aetherit.kfashion.ws.repository.mapper.KfashionUserGroupAuthorityMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class KfashionUserGroupAuthorityRepository {
    private KfashionUserGroupAuthorityMapper mapper;

    @Autowired
    public KfashionUserGroupAuthorityRepository(KfashionUserGroupAuthorityMapper mapper) {
        this.mapper = mapper;
    }
}

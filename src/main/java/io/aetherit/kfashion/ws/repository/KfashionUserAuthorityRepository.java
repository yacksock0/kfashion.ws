package io.aetherit.kfashion.ws.repository;

import io.aetherit.kfashion.ws.model.KfashionUserAuthority;
import io.aetherit.kfashion.ws.repository.mapper.KfashionUserAuthorityMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class KfashionUserAuthorityRepository {
    private KfashionUserAuthorityMapper mapper;

    @Autowired
    public KfashionUserAuthorityRepository(KfashionUserAuthorityMapper mapper) {
        this.mapper = mapper;
    }

    public List<KfashionUserAuthority> selectUserAuthority() {
        return mapper.selectUserAuthority();
    }
}

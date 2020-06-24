package io.aetherit.kfashion.ws.repository;

import io.aetherit.kfashion.ws.model.KfashionEmailAuthority;
import io.aetherit.kfashion.ws.repository.mapper.KfashionEmailAuthorityMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class KfashionEmailAuthorityRepository {
    private KfashionEmailAuthorityMapper mapper;

    @Autowired
    public KfashionEmailAuthorityRepository(KfashionEmailAuthorityMapper mapper) {
        this.mapper = mapper;
    }

    public void insertAuthkey(KfashionEmailAuthority emailAuthority) {
        mapper.insertAuthkey(emailAuthority);
    }

    public String selectCheckAuthMail(KfashionEmailAuthority authMail) {
        return mapper.selectCheckAuthMail(authMail);
    }

    public void updateAuthority(KfashionEmailAuthority authMail) {
        mapper.updateAuthority(authMail);
    }
}

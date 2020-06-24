package io.aetherit.kfashion.ws.repository.mapper;

import io.aetherit.kfashion.ws.model.KfashionEmailAuthority;

public interface KfashionEmailAuthorityMapper {
    void insertAuthkey(KfashionEmailAuthority emailAuthority);

    String selectCheckAuthMail(KfashionEmailAuthority authMail);

    void updateAuthority(KfashionEmailAuthority authMail);
}

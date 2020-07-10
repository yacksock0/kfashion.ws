package io.aetherit.kfashion.ws.repository.mapper;

import io.aetherit.kfashion.ws.model.KfashionEmailAuthority;
import io.aetherit.kfashion.ws.model.KfashionUserInfo;

public interface KfashionEmailAuthorityMapper {
    void insertAuthkey(KfashionEmailAuthority emailAuthority);

    String selectCheckAuthMail(KfashionEmailAuthority authMail);

    void updateAuthority(KfashionEmailAuthority authMail);

    void deleteUserId(KfashionUserInfo user);
}

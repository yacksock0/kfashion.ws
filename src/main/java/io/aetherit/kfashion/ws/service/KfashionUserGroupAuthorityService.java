package io.aetherit.kfashion.ws.service;

import io.aetherit.kfashion.ws.model.KfashionUserGroupAuthority;
import io.aetherit.kfashion.ws.repository.KfashionUserGroupAuthorityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KfashionUserGroupAuthorityService {
    private KfashionUserGroupAuthorityRepository repository;

    @Autowired
    public KfashionUserGroupAuthorityService(KfashionUserGroupAuthorityRepository repository) {
        this.repository = repository;
    }

    public void insertUserGroupAuthority(KfashionUserGroupAuthority userGroupAuthority) {
        repository.insertUserGroupAuthority(userGroupAuthority);
    }
}

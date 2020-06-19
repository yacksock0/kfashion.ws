package io.aetherit.kfashion.ws.service;

import io.aetherit.kfashion.ws.repository.KfashionUserGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KfashionUserGroupService {
    private KfashionUserGroupRepository repository;

    @Autowired
    public KfashionUserGroupService(KfashionUserGroupRepository repository) {
        this.repository = repository;
    }
}

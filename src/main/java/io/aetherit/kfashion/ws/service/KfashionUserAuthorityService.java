package io.aetherit.kfashion.ws.service;

import io.aetherit.kfashion.ws.repository.KfashionUserAuthorityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KfashionUserAuthorityService {
    private KfashionUserAuthorityRepository repository;

    @Autowired
    public KfashionUserAuthorityService(KfashionUserAuthorityRepository repository) {
        this.repository = repository;
    }
}

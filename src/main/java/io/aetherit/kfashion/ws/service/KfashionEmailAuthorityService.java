package io.aetherit.kfashion.ws.service;

import io.aetherit.kfashion.ws.repository.KfashionEmailAuthorityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KfashionEmailAuthorityService {
    private KfashionEmailAuthorityRepository repository;

    @Autowired
    public KfashionEmailAuthorityService(KfashionEmailAuthorityRepository repository) {
        this.repository = repository;
    }
}

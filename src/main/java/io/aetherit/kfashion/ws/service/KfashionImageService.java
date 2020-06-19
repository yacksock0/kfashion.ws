package io.aetherit.kfashion.ws.service;

import io.aetherit.kfashion.ws.repository.KfashionImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KfashionImageService {
    private KfashionImageRepository repository;

    @Autowired
    public KfashionImageService(KfashionImageRepository repository) {
        this.repository = repository;
    }
}

package io.aetherit.kfashion.ws.service;

import io.aetherit.kfashion.ws.repository.KfashionStudiesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KfashionStudiesService {

    private KfashionStudiesRepository repository;

    @Autowired
    public KfashionStudiesService(KfashionStudiesRepository repository) {
        this.repository = repository;
    }
}

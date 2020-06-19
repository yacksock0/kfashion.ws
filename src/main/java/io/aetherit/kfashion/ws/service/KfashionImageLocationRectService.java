package io.aetherit.kfashion.ws.service;

import io.aetherit.kfashion.ws.repository.KfashionImageLocationRectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KfashionImageLocationRectService {
    private KfashionImageLocationRectRepository repository;

    @Autowired
    public KfashionImageLocationRectService(KfashionImageLocationRectRepository repository) {
        this.repository = repository;
    }
}

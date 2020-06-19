package io.aetherit.kfashion.ws.service;

import io.aetherit.kfashion.ws.repository.KfashionWorkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KfashionWorkService {
    private KfashionWorkRepository repository;

    @Autowired
    public KfashionWorkService(KfashionWorkRepository repository) {
        this.repository = repository;
    }
}

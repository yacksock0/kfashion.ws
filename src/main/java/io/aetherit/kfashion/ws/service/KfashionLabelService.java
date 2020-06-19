package io.aetherit.kfashion.ws.service;

import io.aetherit.kfashion.ws.repository.KfashionLabelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KfashionLabelService {
    private KfashionLabelRepository repository;

    @Autowired
    public KfashionLabelService(KfashionLabelRepository repository) {
        this.repository = repository;
    }
}

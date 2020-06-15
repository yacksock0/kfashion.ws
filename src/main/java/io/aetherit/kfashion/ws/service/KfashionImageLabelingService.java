package io.aetherit.kfashion.ws.service;

import io.aetherit.kfashion.ws.repository.KfashionImageLabelingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KfashionImageLabelingService {

    private KfashionImageLabelingRepository repository;

    @Autowired
    public KfashionImageLabelingService(KfashionImageLabelingRepository repository) {
        this.repository = repository;
    }
}

package io.aetherit.kfashion.ws.service;

import io.aetherit.kfashion.ws.repository.KfashionImageLabelingLocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KfashionImageLabelingLocationService {

    private KfashionImageLabelingLocationRepository repository;

    @Autowired
    public KfashionImageLabelingLocationService(KfashionImageLabelingLocationRepository repository) {
        this.repository = repository;
    }

}

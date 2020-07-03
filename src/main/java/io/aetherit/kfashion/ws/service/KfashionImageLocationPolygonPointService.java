package io.aetherit.kfashion.ws.service;

import io.aetherit.kfashion.ws.repository.KfashionImageLocationPolygonPointRepository;
import io.aetherit.kfashion.ws.repository.KfashionImageLocationPolygonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KfashionImageLocationPolygonPointService {
    private KfashionImageLocationPolygonPointRepository repository;

    @Autowired
    public KfashionImageLocationPolygonPointService(KfashionImageLocationPolygonPointRepository repository) {
        this.repository = repository;
    }
}

package io.aetherit.kfashion.ws.service;

import io.aetherit.kfashion.ws.model.KfashionImageLocationPolygon;
import io.aetherit.kfashion.ws.model.KfashionImageLocationPolygonPoint;
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

    public String insertLocationPolygonPoint(KfashionImageLocationPolygonPoint polygonPoint) {
        String msg ="";
        repository.insertLocationPolygonPoint(polygonPoint);
        return msg="success";
    }
}

package io.aetherit.kfashion.ws.service;

import io.aetherit.kfashion.ws.model.KfashionImageLocationPolygon;
import io.aetherit.kfashion.ws.repository.KfashionImageLocationPolygonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KfashionImageLocationPolygonService {
    private KfashionImageLocationPolygonRepository repository;

    @Autowired
    public KfashionImageLocationPolygonService(KfashionImageLocationPolygonRepository repository) {
        this.repository = repository;
    }

    public String insertLocationPolygon(KfashionImageLocationPolygon polygon) {
        String msg="";
        repository.insertLocationPolygon(polygon);
        return msg;
    }

}

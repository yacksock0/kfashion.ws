package io.aetherit.kfashion.ws.service;

import io.aetherit.kfashion.ws.model.KfashionImageLocationPolygon;
import io.aetherit.kfashion.ws.model.KfashionImageLocationPolygonPoint;
import io.aetherit.kfashion.ws.repository.KfashionImageLocationPolygonPointRepository;
import io.aetherit.kfashion.ws.repository.KfashionImageLocationPolygonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

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

    public List<KfashionImageLocationPolygonPoint> selectPolyNoList(Long workNo) {
        return repository.selectPolyNoList(workNo);
    }

    public List<KfashionImageLocationPolygonPoint> selectLocationPolygonList(KfashionImageLocationPolygonPoint polygon) {
        return repository.selectLocationPolygonList(polygon);
    }

    public List<Integer> selectPolyNo(Long workNo) {
        return repository.selectPolyNo(workNo);
    }
}

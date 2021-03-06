package io.aetherit.kfashion.ws.service;

import io.aetherit.kfashion.ws.model.KfashionImage;
import io.aetherit.kfashion.ws.model.KfashionImageLocationPolygonPoint;
import io.aetherit.kfashion.ws.repository.KfashionImageLocationPolygonPointRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class KfashionImageLocationPolygonPointService {
    private KfashionImageLocationPolygonPointRepository repository;

    @Autowired
    public KfashionImageLocationPolygonPointService(KfashionImageLocationPolygonPointRepository repository) {
        this.repository = repository;
    }

    public String insertLocationPolygonPoint(KfashionImageLocationPolygonPoint polygonPoint) {
        String msg = "";
        repository.insertLocationPolygonPoint(polygonPoint);
        return msg = "success";
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

    public int[] selectLabelNo(Long workNo) {
        return repository.selectLabelNo(workNo);
    }

    public void deletePolyPoint(Map<String, Object> deleteMap) {
        repository.deletePolyPoint(deleteMap);
    }

    public List<KfashionImageLocationPolygonPoint> selectPolygonList(KfashionImageLocationPolygonPoint polygon) {
        return repository.selectPolygonList(polygon);
    }

    public void deletePolyPointAll(KfashionImage workImage) {
        repository.deletePolyPointAll(workImage);
    }
}

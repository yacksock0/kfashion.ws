package io.aetherit.kfashion.ws.service;

import io.aetherit.kfashion.ws.model.KfashionImage;
import io.aetherit.kfashion.ws.model.KfashionImageLocationPolygon;
import io.aetherit.kfashion.ws.model.KfashionImageLocationPolygonPoint;
import io.aetherit.kfashion.ws.repository.KfashionImageLocationPolygonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@Service
public class KfashionImageLocationPolygonService {

    private KfashionImageLocationPolygonRepository repository;
    private KfashionImageLocationPolygonPointService kfashionImageLocationPolygonPointService;


    @Autowired
    public KfashionImageLocationPolygonService(KfashionImageLocationPolygonRepository repository,
                                               KfashionImageLocationPolygonPointService kfashionImageLocationPolygonPointService) {
        this.repository = repository;
        this.kfashionImageLocationPolygonPointService = kfashionImageLocationPolygonPointService;
    }

//    public String insertLocationPolygon(KfashionImageLocationPolygon polygon) {
//        String msg = "";
//        repository.insertLocationPolygon(polygon);
//        return msg;
//    }

    public void deletePoly(Map<String, Object> deleteMap) {
        repository.deletePoly(deleteMap);
    }

    public void deletePolyAll(KfashionImage workImage) {
        repository.deletePolyAll(workImage);
    }

    @Transactional(rollbackFor = {RuntimeException.class, SQLException.class, Exception.class})
    public void setLocationPolygon(List<KfashionImageLocationPolygonPoint> polygonList) {
        KfashionImageLocationPolygon polygon = new KfashionImageLocationPolygon();
        if (polygonList != null) {
            for (int i = 0; i < polygonList.size(); i++) {
                polygon.setWorkNo(polygonList.get(i).getWorkNo());
                polygon.setWorkStep(polygonList.get(i).getWorkStep());
                polygon.setPolyNo(polygonList.get(i).getPolyNo());
                repository.insertLocationPolygon(polygon);

                KfashionImageLocationPolygonPoint polygonPoint = new KfashionImageLocationPolygonPoint();
                polygonPoint.setWorkNo(polygonList.get(i).getWorkNo());
                polygonPoint.setWorkStep(polygonList.get(i).getWorkStep());
                polygonPoint.setPolyNo(polygonList.get(i).getPolyNo());
                polygonPoint.setNo(polygonList.get(i).getNo());


                for (int j = 1; j < polygonList.get(i).getPoints().size(); j++) {
                    polygonPoint.setNo(j);
                    polygonPoint.setLocationX(polygonList.get(i).getPoints().get(j).getX());
                    polygonPoint.setLocationY(polygonList.get(i).getPoints().get(j).getY());
                    polygonPoint.setLocationSeq(j);
                    kfashionImageLocationPolygonPointService.insertLocationPolygonPoint(polygonPoint);
                }
            }
        }
    }
}

package io.aetherit.kfashion.ws.service;

import io.aetherit.kfashion.ws.model.KfashionImage;
import io.aetherit.kfashion.ws.repository.KfashionImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


@Service
public class KfashionImageService {
    private KfashionImageRepository repository;

    @Autowired
    public KfashionImageService(KfashionImageRepository repository) {
        this.repository = repository;
    }

    public void insertImgUpload(KfashionImage kfashionImage) {
        repository.insertImgUpload(kfashionImage);
    }

    public List<KfashionImage> selectBoundaryList() {
        return repository.selectBoundaryList();
    }

    public Map<String, Object> getByteImage(int workNo) {
      return repository.getByteImage(workNo);
    }

    public List<KfashionImage> selectPolygonList(String createdId) {
        return repository.selectPolygonList(createdId);
    }

    public List<KfashionImage> selectRectList(String createdId) {
        return  repository.selectRectList(createdId);
    }

    public List<KfashionImage> recentlyImg(String createdId) { return repository.recentlyImg(createdId);}

    public void deleteImage(KfashionImage workImage) {
        repository.deleteImage(workImage);
    }

    public List<KfashionImage> selectProfessionalList(String createdId) {
        return repository.selectProfessionalList(createdId);
    }

    public List<KfashionImage> selectInspectionList() {
        return repository.selectInspectionList();
    }

    public List<KfashionImage> selectInspectionHighList() {
        return repository.selectInspectionHighList();
    }
}

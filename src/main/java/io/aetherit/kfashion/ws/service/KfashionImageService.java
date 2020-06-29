package io.aetherit.kfashion.ws.service;

import io.aetherit.kfashion.ws.model.KfashionImage;
import io.aetherit.kfashion.ws.repository.KfashionImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

import java.util.List;


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
}

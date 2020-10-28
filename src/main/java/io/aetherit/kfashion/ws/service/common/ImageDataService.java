package io.aetherit.kfashion.ws.service.common;

import io.aetherit.kfashion.ws.model.KfashionImage;
import io.aetherit.kfashion.ws.repository.common.ImageDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class ImageDataService {
    private ImageDataRepository repository;

    @Autowired
    public ImageDataService(ImageDataRepository repository) {
        this.repository = repository;
    }

    public List<KfashionImage> getAllImageData() throws IOException {
        return repository.selectAllImageData();
    }

    public String getImageWorkName(Long workNo) throws IOException {
        return repository.selectImageWorkName(workNo);
    }



}

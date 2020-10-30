package io.aetherit.kfashion.ws.repository.common;

import io.aetherit.kfashion.ws.model.KfashionImage;
import io.aetherit.kfashion.ws.repository.mapper.common.ImageDataMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ImageDataRepository {
    private ImageDataMapper mapper;

    @Autowired
    public ImageDataRepository(ImageDataMapper mapper) {
        this.mapper = mapper;
    }

    public List<KfashionImage> selectAllImageData() {
        return mapper.selectAllImageData();
    }

    public String selectImageWorkName(Long workNo) {
        return mapper.selectImageWorkName(workNo);
    }
}

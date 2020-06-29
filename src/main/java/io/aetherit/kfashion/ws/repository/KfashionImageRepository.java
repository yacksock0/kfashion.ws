package io.aetherit.kfashion.ws.repository;

import io.aetherit.kfashion.ws.model.KfashionImage;
import io.aetherit.kfashion.ws.repository.mapper.KfashionImageMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class KfashionImageRepository {
    private KfashionImageMapper mapper;

    @Autowired
    public KfashionImageRepository(KfashionImageMapper mapper) {
        this.mapper = mapper;
    }

    public void insertImgUpload(KfashionImage kfashionImage) {
        mapper.insertImgUpload(kfashionImage);
    }

    public List<KfashionImage> selectBoundaryList() {
        return mapper.selectBoundaryList();
    }
}

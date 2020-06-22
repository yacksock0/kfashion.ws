package io.aetherit.kfashion.ws.repository;

import io.aetherit.kfashion.ws.repository.mapper.KfashionImageMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class KfashionImageRepository {
    private KfashionImageMapper mapper;

    @Autowired
    public KfashionImageRepository(KfashionImageMapper mapper) {
        this.mapper = mapper;
    }

    public void insertImgUpload(byte[] imgData) {
        mapper.insertImgUpload(imgData);
    }
}

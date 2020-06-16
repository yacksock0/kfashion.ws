package io.aetherit.kfashion.ws.repository;

import io.aetherit.kfashion.ws.model.KfashionBasic;
import io.aetherit.kfashion.ws.repository.mapper.KfashionBasicMapper;
import io.aetherit.kfashion.ws.repository.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class KfashionBasicRepository {
    private KfashionBasicMapper mapper;

    @Autowired
    public KfashionBasicRepository(KfashionBasicMapper mapper) {
        this.mapper = mapper;
    }


    public void kfashionBasicInsert(KfashionBasic kfashionBasic) {
        mapper.kfashionBasicInsert(kfashionBasic);
    }
}

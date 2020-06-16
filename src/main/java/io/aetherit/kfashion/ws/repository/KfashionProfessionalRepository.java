package io.aetherit.kfashion.ws.repository;

import io.aetherit.kfashion.ws.model.KfashionProfessional;
import io.aetherit.kfashion.ws.repository.mapper.KfashionProfessionalMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class KfashionProfessionalRepository {
    private KfashionProfessionalMapper mapper;

    @Autowired
    public KfashionProfessionalRepository(KfashionProfessionalMapper mapper) {
        this.mapper = mapper;
    }

    public void kfashionProfessionalInsert(KfashionProfessional kfashionProfessional) {
        mapper.kfashionProfessionalInsert(kfashionProfessional);
    }
}

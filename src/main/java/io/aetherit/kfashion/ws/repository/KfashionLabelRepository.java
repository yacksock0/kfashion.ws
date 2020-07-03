package io.aetherit.kfashion.ws.repository;

import io.aetherit.kfashion.ws.model.KfashionLabel;
import io.aetherit.kfashion.ws.repository.mapper.KfashionLabelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class KfashionLabelRepository {
    private KfashionLabelMapper mapper;

    @Autowired
    public KfashionLabelRepository(KfashionLabelMapper mapper) {
        this.mapper = mapper;
    }

    public void insertBasicLabel(KfashionLabel basic) {
        mapper.insertBasicLabel(basic);
    }

    public void insertProfessionalLabel(KfashionLabel professional) {
        mapper.insertProfessionalLabel(professional);
    }
}

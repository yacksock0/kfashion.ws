package io.aetherit.kfashion.ws.service;

import io.aetherit.kfashion.ws.model.KfashionImageLocationPolygon;
import io.aetherit.kfashion.ws.model.KfashionLabel;
import io.aetherit.kfashion.ws.repository.KfashionLabelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KfashionLabelService {
    private KfashionLabelRepository repository;

    @Autowired
    public KfashionLabelService(KfashionLabelRepository repository) {
        this.repository = repository;
    }

    public void insertBasicLabel(KfashionLabel basic) {
        repository.insertBasicLabel(basic);
    }

    public void insertProfessionalLabel(KfashionLabel professional) {
        repository.insertProfessionalLabel(professional);
    }

    public  List<KfashionLabel> selectBasicLabelList(String createdId) {
        return repository.selectBasicLabelList(createdId);
    }
}

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

    public List<KfashionLabel> selectOuterReviewLabelList(Long workNo) {
        return repository.selectOuterReviewLabelList(workNo);
    }

    public List<KfashionLabel> selectTopReviewLabelList(Long workNo) {
        return repository.selectTopReviewLabelList(workNo);
    }

    public List<KfashionLabel> selectPantsReviewLabelList(Long workNo) {
        return repository.selectPantsReviewLabelList(workNo);
    }

    public List<KfashionLabel> selectOnePieceReviewLabelList(Long workNo) {
        return repository.selectOnePieceReviewLabelList(workNo);
    }

    public int[] selectLabelList(Long workNo) {
        return repository.selectLabelList(workNo);
    }
}

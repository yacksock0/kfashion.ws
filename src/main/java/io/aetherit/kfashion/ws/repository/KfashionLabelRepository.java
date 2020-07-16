package io.aetherit.kfashion.ws.repository;

import io.aetherit.kfashion.ws.model.KfashionLabel;
import io.aetherit.kfashion.ws.repository.mapper.KfashionLabelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

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
    public List<KfashionLabel> selectBasicLabelList(String createdId) {
        return mapper.selectBasicLabelList(createdId);
    }

    public List<KfashionLabel> selectOuterReviewLabelList(Long workNo) {
        return mapper.selectOuterReviewLabelList(workNo);
    }

    public List<KfashionLabel> selectTopReviewLabelList(Long workNo) {
        return mapper.selectTopReviewLabelList(workNo);
    }

    public List<KfashionLabel> selectPantsReviewLabelList(Long workNo) {
        return mapper.selectPantsReviewLabelList(workNo);
    }

    public List<KfashionLabel> selectOnePieceReviewLabelList(Long workNo) {
        return mapper.selectOnePieceReviewLabelList(workNo);
    }

    public int[] selectLabelList(Long workNo) {
        return mapper.selectLabelList(workNo);
    }

    public int[] selectHighLabelList(Long workNo) {
        return mapper.selectHighLabelList(workNo);
    }

    public List<KfashionLabel> selectOuterReviewHighLabelList(Long workNo) {
        return mapper.selectOuterReviewHighLabelList(workNo);
    }

    public List<KfashionLabel> selectTopReviewHighLabelList(Long workNo) {
        return mapper.selectTopReviewHighLabelList(workNo);
    }

    public List<KfashionLabel> selectPantsReviewHighLabelList(Long workNo) {
        return mapper.selectPantsReviewHighLabelList(workNo);
    }

    public List<KfashionLabel> selectOnePieceReviewHighLabelList(Long workNo) {
        return mapper.selectOnePieceReviewHighLabelList(workNo);
    }

    public List<KfashionLabel> selectStyleReviewLabelList(Long workNo) {
        return mapper.selectStyleReviewLabelList(workNo);
    }
}

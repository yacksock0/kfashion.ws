package io.aetherit.kfashion.ws.repository.mapper;

import io.aetherit.kfashion.ws.model.KfashionLabel;

import java.util.List;

public interface KfashionLabelMapper {
    void insertBasicLabel(KfashionLabel basic);

    void insertProfessionalLabel(KfashionLabel professional);
    List<KfashionLabel> selectBasicLabelList(String createdId);

    List<KfashionLabel> selectOuterReviewLabelList(Long workNo);

    List<KfashionLabel> selectTopReviewLabelList(Long workNo);

    List<KfashionLabel> selectPantsReviewLabelList(Long workNo);

    List<KfashionLabel> selectOnePieceReviewLabelList(Long workNo);

    int[] selectLabelList(Long workNo);

    int[] selectHighLabelList(Long workNo);

    List<KfashionLabel> selectOuterReviewHighLabelList(Long workNo);

    List<KfashionLabel> selectTopReviewHighLabelList(Long workNo);

    List<KfashionLabel> selectPantsReviewHighLabelList(Long workNo);

    List<KfashionLabel> selectOnePieceReviewHighLabelList(Long workNo);

    List<KfashionLabel> selectStyleReviewLabelList(Long workNo);

    void deleteProfessionalLabel(int workNo);
}

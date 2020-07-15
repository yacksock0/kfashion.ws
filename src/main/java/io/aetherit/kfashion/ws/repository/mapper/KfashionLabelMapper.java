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
}

package io.aetherit.kfashion.ws.repository.mapper;

import io.aetherit.kfashion.ws.model.KfashionLabel;

import java.util.List;

public interface KfashionLabelMapper {
    void insertBasicLabel(KfashionLabel basic);

    void insertProfessionalLabel(KfashionLabel professional);
    List<KfashionLabel> selectBasicLabelList(String createdId);
}

package io.aetherit.kfashion.ws.repository.mapper;

import io.aetherit.kfashion.ws.model.KfashionLabel;

public interface KfashionLabelMapper {
    void insertBasicLabel(KfashionLabel basic);

    void insertProfessionalLabel(KfashionLabel professional);
}

package io.aetherit.kfashion.ws.repository.mapper;

import io.aetherit.kfashion.ws.model.KfashionWork;

public interface KfashionWorkMapper {
    Long insertWork(KfashionWork work);
    void updateWork(KfashionWork work);
    Long selectWorkNo(String workName);

    void updateWorkName(KfashionWork work);
}

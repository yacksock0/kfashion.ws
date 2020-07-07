package io.aetherit.kfashion.ws.repository.mapper;

import io.aetherit.kfashion.ws.model.KfashionImage;
import io.aetherit.kfashion.ws.model.KfashionWorkHistory;

public interface KfashionWorkHistoryMapper {
    void insertWorkHistory(KfashionWorkHistory workHistory);

    void deleteWorkHistory(KfashionImage workImage);
}

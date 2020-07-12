package io.aetherit.kfashion.ws.repository.mapper;

import io.aetherit.kfashion.ws.model.KfashionImage;
import io.aetherit.kfashion.ws.model.KfashionWorkHistory;

import java.util.List;

public interface KfashionWorkHistoryMapper {
    void insertWorkHistory(KfashionWorkHistory workHistory);

    void deleteWorkHistory(KfashionImage workImage);
    List<KfashionWorkHistory> selectWorkAssignment(int workCount);
    int selectWorkProgressRate(String createdId);
}

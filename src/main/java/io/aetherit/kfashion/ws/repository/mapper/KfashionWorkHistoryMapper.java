package io.aetherit.kfashion.ws.repository.mapper;

import io.aetherit.kfashion.ws.model.KfashionImage;
import io.aetherit.kfashion.ws.model.KfashionWorkHistory;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

public interface KfashionWorkHistoryMapper {
    void insertWorkHistory(KfashionWorkHistory workHistory);

    void deleteWorkHistory(KfashionImage workImage);
    List<Long> selectWorkAssignment(HashMap<String, Object> workCount);
    KfashionWorkHistory selectWorkProgressRate(String createdId);
}

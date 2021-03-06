package io.aetherit.kfashion.ws.repository.mapper;

import io.aetherit.kfashion.ws.model.KfashionImage;
import io.aetherit.kfashion.ws.model.KfashionWorkHistory;

import java.util.HashMap;
import java.util.List;

public interface KfashionWorkHistoryMapper {
    void insertWorkHistory(KfashionWorkHistory workHistory);

    void deleteWorkHistory(KfashionImage workImage);

    KfashionWorkHistory selectWorkProgressRate(HashMap<String, Object> createdId);

    void deleteAssignmentCancelWorkHistory(KfashionWorkHistory workHistory);

    String selectReceiveId(Long workNo);

    void deleteProfessionalLabelWorkHistory(HashMap<String, Object> deleteMap);

    void deleteBasicLabelWorkHistory(HashMap<String, Object> deleteMap);

    List<Long> selectWorkNoList();

    Long selectCompleteWork(int workStep);

    Long selectSuccessWorkNo(KfashionWorkHistory workHistory);
}

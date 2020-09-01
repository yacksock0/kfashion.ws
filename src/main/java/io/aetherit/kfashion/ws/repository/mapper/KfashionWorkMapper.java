package io.aetherit.kfashion.ws.repository.mapper;

import io.aetherit.kfashion.ws.model.KfashionImage;
import io.aetherit.kfashion.ws.model.KfashionWork;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface KfashionWorkMapper {
    Long insertWork(KfashionWork work);

    void updateWork(KfashionWork work);

    Long selectWorkNo(String workName);

    void updateWorkName(KfashionWork work);

    String selectFileExtension(KfashionWork work);

    void deleteWork(KfashionImage workImage);

    List<Long> selectWorkAssignment(HashMap<String, Object> workMap);

    int selectWorkQuantity(int workState);

    int selectWorkUserCancelQuantity(Map<String, Object> workCancelQuantityMap);

    List<Long> selectWorkAssignmentCancel(HashMap<String, Object> workAssignmentCancelMap);

    String selectWorkName(Long workNo);

    Long[] selectJsonWorkList();

    Long selectTotalWork();

    String selectWorkDataTime(Long workNo);
}

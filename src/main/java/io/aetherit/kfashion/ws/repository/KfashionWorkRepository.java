package io.aetherit.kfashion.ws.repository;

import io.aetherit.kfashion.ws.model.KfashionImage;
import io.aetherit.kfashion.ws.model.KfashionWork;
import io.aetherit.kfashion.ws.repository.mapper.KfashionWorkMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class KfashionWorkRepository {
    private KfashionWorkMapper mapper;

    @Autowired
    public KfashionWorkRepository(KfashionWorkMapper mapper) {
        this.mapper = mapper;
    }

    public Long insertWork(KfashionWork work) {
        return mapper.insertWork(work);
    }

    public void updateWork(KfashionWork work) {
        mapper.updateWork(work);
    }

    public Long selectWorkNo(String workName) {
        return mapper.selectWorkNo(workName);
    }

    public void updateWorkName(KfashionWork work) {
        mapper.updateWorkName(work);
    }

    public String selectFileExtension(KfashionWork work) {
        return mapper.selectFileExtension(work);
    }

    public void deleteWork(KfashionImage workImage) {
        mapper.deleteWork(workImage);
    }

    public List<Long> selectWorkAssignment(HashMap<String, Object> workMap) {
        return mapper.selectWorkAssignment(workMap);
    }

    public int selectWorkQuantity(int workState) {
        return mapper.selectWorkQuantity(workState);
    }

    public int selectWorkUserCancelQuantity(Map<String, Object> workCancelQuantityMap) {
        return mapper.selectWorkUserCancelQuantity(workCancelQuantityMap);
    }

    public List<Long> selectWorkAssignmentCancel(HashMap<String, Object> workAssignmentCancelMap) {
        return mapper.selectWorkAssignmentCancel(workAssignmentCancelMap);
    }

    public String selectWorkName(Long workNo) {
        return mapper.selectWorkName(workNo);
    }

    public Long[] selectJsonWorkList() {
        return mapper.selectJsonWorkList();
    }

    public Long selectTotalWork() {
        return mapper.selectTotalWork();
    }

    public String selectWorkDataTime(Long workNo) {
        return mapper.selectWorkDataTime(workNo);
    }

    public Long selectFileuploadCount(Long workNo) {
        return mapper.selectFileuploadCount(workNo);
    }
}

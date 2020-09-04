package io.aetherit.kfashion.ws.service;

import io.aetherit.kfashion.ws.model.KfashionImage;
import io.aetherit.kfashion.ws.model.KfashionWork;
import io.aetherit.kfashion.ws.repository.KfashionWorkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class KfashionWorkService {
    private KfashionWorkRepository repository;

    @Autowired
    public KfashionWorkService(KfashionWorkRepository repository) {
        this.repository = repository;
    }


    public Long insertWork(KfashionWork work) {
        return repository.insertWork(work);
    }

    public void updateWork(KfashionWork work) {
        repository.updateWork(work);
    }

    public Long selectWorkNo(String workName) {
        return repository.selectWorkNo(workName);
    }

    public void updateWorkName(KfashionWork work) {
        repository.updateWorkName(work);
    }

    public String selectFileExtension(KfashionWork work) {
        return repository.selectFileExtension(work);
    }

    public void deleteWork(KfashionImage workImage) {
        repository.deleteWork(workImage);
    }

    public List<Long> selectWorkAssignment(HashMap<String, Object> workMap) {
        return repository.selectWorkAssignment(workMap);
    }

    public int selectWorkQuantity(int workState) {
        return repository.selectWorkQuantity(workState);
    }

    public int selectWorkUserCancelQuantity(Map<String, Object> workCancelQuantityMap) {
        return repository.selectWorkUserCancelQuantity(workCancelQuantityMap);
    }

    public List<Long> selectWorkAssignmentCancel(HashMap<String, Object> workAssignmentCancelMap) {
        return repository.selectWorkAssignmentCancel(workAssignmentCancelMap);
    }

    public String selectWorkName(Long workNo) {
        return repository.selectWorkName(workNo);
    }

    public Long[] selectJsonWorkList() {
        return repository.selectJsonWorkList();
    }

    public Long selectTotalWork() {
        return repository.selectTotalWork();
    }

    public String selectWorkDataTime(Long workNo) {
        return repository.selectWorkDataTime(workNo);
    }

    public Long selectFileuploadCount(Long workNo) {
        return repository.selectFileuploadCount(workNo);
    }
}

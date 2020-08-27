package io.aetherit.kfashion.ws.service;

import io.aetherit.kfashion.ws.model.KfashionImage;
import io.aetherit.kfashion.ws.model.KfashionWorkHistory;
import io.aetherit.kfashion.ws.repository.KfashionWorkHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class KfashionWorkHistoryService {
    private KfashionWorkHistoryRepository repository;

    @Autowired
    public KfashionWorkHistoryService(KfashionWorkHistoryRepository repository) {
        this.repository = repository;
    }

    public void insertWorkHistory(KfashionWorkHistory workHistory) {
        repository.insertWorkHistory(workHistory);
    }

    public void deleteWorkHistory(KfashionImage workImage) {
        repository.deleteWorkHistory(workImage);
    }


    public KfashionWorkHistory selectWorkProgressRate(HashMap<String, Object> createdId) {
        return repository.selectWorkProgressRate(createdId);
    }

    public void deleteAssignmentCancelWorkHistory(KfashionWorkHistory workHistory) {
        repository.deleteAssignmentCancelWorkHistory(workHistory);
    }

    public String selectReceiveId(Long workNo) {
        return repository.selectReceiveId(workNo);
    }

    public void deleteProfessionalLabelWorkHistory(HashMap<String, Object> deleteMap) {
        repository.deleteProfessionalLabelWorkHistory(deleteMap);
    }

    public void deleteBasicLabelWorkHistory(HashMap<String, Object> deleteMap) {
        repository.deleteBasicLabelWorkHistory(deleteMap);
    }

    public List<Long> selectWorkNoList() {
        return repository.selectWorkNoList();
    }

    public Long selectCompleteWork(int workStep) {
        return repository.selectCompleteWork(workStep);
    }

    public Long selectSuccessWorkNo(KfashionWorkHistory workHistory) {
        return repository.selectSuccessWorkNo(workHistory);
    }
}

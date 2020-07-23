package io.aetherit.kfashion.ws.service;

import io.aetherit.kfashion.ws.model.KfashionImage;
import io.aetherit.kfashion.ws.model.KfashionWorkHistory;
import io.aetherit.kfashion.ws.repository.KfashionWorkHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;

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

    public void deleteLabelWorkHistory(int workNo, int workStep) {
        repository.deleteLabelWorkHistory(workNo, workStep);
    }

    public  KfashionWorkHistory selectWorkProgressRate(HashMap<String, Object> createdId) {
        return repository.selectWorkProgressRate(createdId);
    }

    public void deleteAssignmentCancelWorkHistory(KfashionWorkHistory workHistory) {
        repository.deleteAssignmentCancelWorkHistory(workHistory);
    }

    public String selectReceiveId(Long workNo) {
        return repository.selectReceiveId(workNo);
    }
}

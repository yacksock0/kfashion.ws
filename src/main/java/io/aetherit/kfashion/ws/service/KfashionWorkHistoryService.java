package io.aetherit.kfashion.ws.service;

import io.aetherit.kfashion.ws.model.KfashionImage;
import io.aetherit.kfashion.ws.model.KfashionWorkHistory;
import io.aetherit.kfashion.ws.repository.KfashionWorkHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public List<KfashionWorkHistory> selectWorkAssignment(int workCount) { return repository.selectWorkAssignment(workCount); }
    public int selectWorkProgressRate(String createdId) { return repository.selectWorkProgressRate(createdId); }
}

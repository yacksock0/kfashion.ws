package io.aetherit.kfashion.ws.service;

import io.aetherit.kfashion.ws.model.KfashionImage;
import io.aetherit.kfashion.ws.model.KfashionWorkHistory;
import io.aetherit.kfashion.ws.repository.KfashionWorkHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}

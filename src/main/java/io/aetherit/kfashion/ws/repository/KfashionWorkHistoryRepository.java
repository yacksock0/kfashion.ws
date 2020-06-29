package io.aetherit.kfashion.ws.repository;

import io.aetherit.kfashion.ws.model.KfashionWorkHistory;
import io.aetherit.kfashion.ws.repository.mapper.KfashionWorkHistoryMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class KfashionWorkHistoryRepository {
    private KfashionWorkHistoryMapper mapper;

    @Autowired
    public KfashionWorkHistoryRepository(KfashionWorkHistoryMapper mapper) {
        this.mapper = mapper;
    }

    public void insertWorkHistory(KfashionWorkHistory workHistory) {
        mapper.insertWorkHistory(workHistory);
    }
}

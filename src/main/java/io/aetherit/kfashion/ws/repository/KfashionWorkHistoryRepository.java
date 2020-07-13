package io.aetherit.kfashion.ws.repository;

import io.aetherit.kfashion.ws.model.KfashionImage;
import io.aetherit.kfashion.ws.model.KfashionWorkHistory;
import io.aetherit.kfashion.ws.repository.mapper.KfashionWorkHistoryMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

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

    public void deleteWorkHistory(KfashionImage workImage) {
        mapper.deleteWorkHistory(workImage);
    }

    public List<Long> selectWorkAssignment(int workCount) {
        return mapper.selectWorkAssignment(workCount);
    }

    public  KfashionWorkHistory selectWorkProgressRate(String createdId) {
        return mapper.selectWorkProgressRate(createdId);
    }
}

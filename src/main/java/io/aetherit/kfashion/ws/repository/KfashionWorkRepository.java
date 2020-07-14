package io.aetherit.kfashion.ws.repository;

import io.aetherit.kfashion.ws.model.KfashionImage;
import io.aetherit.kfashion.ws.model.KfashionWork;
import io.aetherit.kfashion.ws.repository.mapper.KfashionWorkMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

@Repository
public class KfashionWorkRepository {
    private KfashionWorkMapper mapper;

    @Autowired
    public KfashionWorkRepository(KfashionWorkMapper mapper) {
        this.mapper = mapper;
    }

    public Long insertWork(KfashionWork work) {
        return mapper.insertWork(work); }
    public void updateWork(KfashionWork work) { mapper.updateWork(work); }

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
}

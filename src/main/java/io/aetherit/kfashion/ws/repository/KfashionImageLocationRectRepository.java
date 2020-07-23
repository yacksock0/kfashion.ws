package io.aetherit.kfashion.ws.repository;

import io.aetherit.kfashion.ws.model.KfashionCategoryItem;
import io.aetherit.kfashion.ws.model.KfashionImageLocationRect;
import io.aetherit.kfashion.ws.repository.mapper.KfashionImageLocationRectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class KfashionImageLocationRectRepository {
    private KfashionImageLocationRectMapper mapper;

    @Autowired
    public KfashionImageLocationRectRepository(KfashionImageLocationRectMapper mapper) {
        this.mapper = mapper;
    }

    public void insertLocationRect(KfashionImageLocationRect rect) {
        mapper.insertLocationRect(rect);
    }

    public List<KfashionImageLocationRect> selectLocationRectList(KfashionImageLocationRect rect) {
        return mapper.selectLocationRectList(rect);
    }

    public List<KfashionImageLocationRect> selectRectNoList(Long workNo) {
        return mapper.selectRectNoList(workNo);
    }

    public void deleteRect(Map<String, Object> deleteMap) {
        mapper.deleteRect(deleteMap);
    }
}

package io.aetherit.kfashion.ws.repository;

import io.aetherit.kfashion.ws.model.KfashionImage;
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

    public int[] selectRectNo(Long workNo) {
        return mapper.selectRectNo(workNo);
    }

    public List<KfashionImageLocationRect> selectOuterRectList(Long workNo) {
        return mapper.selectOuterRectList(workNo);
    }

    public List<KfashionImageLocationRect> selectTopRectList(Long workNo) {
        return mapper.selectTopRectList(workNo);
    }

    public List<KfashionImageLocationRect> selectPantsRectList(Long workNo) {
        return mapper.selectPantsRectList(workNo);
    }

    public List<KfashionImageLocationRect> selectOnePieceRectList(Long workNo) {
        return mapper.selectOnePieceRectList(workNo);
    }

    public void deleteRectAll(KfashionImage workImage) {
        mapper.deleteRectAll(workImage);
    }
}

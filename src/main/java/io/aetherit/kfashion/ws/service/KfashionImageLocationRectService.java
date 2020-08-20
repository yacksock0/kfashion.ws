package io.aetherit.kfashion.ws.service;

import io.aetherit.kfashion.ws.model.KfashionImage;
import io.aetherit.kfashion.ws.model.KfashionImageLocationRect;
import io.aetherit.kfashion.ws.repository.KfashionImageLocationRectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class KfashionImageLocationRectService {
    private KfashionImageLocationRectRepository repository;

    @Autowired
    public KfashionImageLocationRectService(KfashionImageLocationRectRepository repository) {
        this.repository = repository;
    }

    public String insertLocationRect(KfashionImageLocationRect rect) {
        String msg = "success";
        repository.insertLocationRect(rect);
        return msg;
    }

    public List<KfashionImageLocationRect> selectLocationRectList(KfashionImageLocationRect rect) {
        return repository.selectLocationRectList(rect);
    }

    public List<KfashionImageLocationRect> selectRectNoList(Long workNo) {
        return repository.selectRectNoList(workNo);
    }

    public void deleteRect(Map<String, Object> deleteMap) {
        repository.deleteRect(deleteMap);
    }

    public int[] selectRectNo(Long workNo) {
        return repository.selectRectNo(workNo);
    }

    public List<KfashionImageLocationRect> selectOuterRectList(Long workNo) {
        return repository.selectOuterRectList(workNo);
    }

    public List<KfashionImageLocationRect> selectTopRectList(Long workNo) {
        return repository.selectTopRectList(workNo);
    }

    public List<KfashionImageLocationRect> selectPantsRectList(Long workNo) {
        return repository.selectPantsRectList(workNo);
    }

    public List<KfashionImageLocationRect> selectOnePieceRectList(Long workNo) {
        return repository.selectOnePieceRectList(workNo);
    }

    public void deleteRectAll(KfashionImage workImage) {
        repository.deleteRectAll(workImage);
    }
}

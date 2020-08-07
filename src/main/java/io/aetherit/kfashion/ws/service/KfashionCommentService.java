package io.aetherit.kfashion.ws.service;

import io.aetherit.kfashion.ws.model.KfashionComment;
import io.aetherit.kfashion.ws.repository.KfashionCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class KfashionCommentService {

    private KfashionCommentRepository repository;

    @Autowired
    public KfashionCommentService(KfashionCommentRepository repository) {
        this.repository = repository;
    }


    public void insertHighLabelComment(KfashionComment kfashionComment) {
        repository.insertHighLabelComment(kfashionComment);
    }

    public void insertHighPolyComment(KfashionComment kfashionComment) {
        repository.insertHighPolyComment(kfashionComment);
    }

    public int selectCommentNo(Map<String, Object> selectMap) {
        return repository.selectCommentNo(selectMap);
    }

    public void updateComment(Map<String, Object> updateMap) {
        repository.updateComment(updateMap);
    }

    public String selectComment(Long workNo) {
        return repository.selectComment(workNo);
    }

    public List<Integer> selectWorkTypeList(Long workNo) {
        return repository.selectWorkTypeList(workNo);
    }

    public void updatePolyComment(Map<String, Object> updateMap) {
        repository.updatePolyComment(updateMap);
    }

    public List<KfashionComment> selectCommentWorkNoList() {
        return repository.selectCommentWorkNoList();
    }

    public List<KfashionComment> selectCommentComplete(Long workNo) {
        return repository.selectCommentComplete(workNo);
    }
}

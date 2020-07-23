package io.aetherit.kfashion.ws.service;

import io.aetherit.kfashion.ws.model.KfashionComment;
import io.aetherit.kfashion.ws.repository.KfashionCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}

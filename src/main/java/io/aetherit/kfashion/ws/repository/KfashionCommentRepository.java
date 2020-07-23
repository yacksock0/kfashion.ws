package io.aetherit.kfashion.ws.repository;

import io.aetherit.kfashion.ws.model.KfashionComment;
import io.aetherit.kfashion.ws.repository.mapper.KfashionCommentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class KfashionCommentRepository {

    private KfashionCommentMapper mapper;

    @Autowired
    public KfashionCommentRepository(KfashionCommentMapper mapper) {
        this.mapper = mapper;
    }


    public void insertHighLabelComment(KfashionComment kfashionComment) {
        mapper.insertHighLabelComment(kfashionComment);
    }

    public void insertHighPolyComment(KfashionComment kfashionComment) {
        mapper.insertHighPolyComment(kfashionComment);
    }
}

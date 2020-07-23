package io.aetherit.kfashion.ws.repository.mapper;

import io.aetherit.kfashion.ws.model.KfashionComment;

public interface KfashionCommentMapper {

    void insertHighLabelComment(KfashionComment kfashionComment);

    void insertHighPolyComment(KfashionComment kfashionComment);
}

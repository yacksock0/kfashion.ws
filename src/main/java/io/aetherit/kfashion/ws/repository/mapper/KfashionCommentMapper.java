package io.aetherit.kfashion.ws.repository.mapper;

import io.aetherit.kfashion.ws.model.KfashionComment;

import java.util.Map;

public interface KfashionCommentMapper {

    void insertHighLabelComment(KfashionComment kfashionComment);

    void insertHighPolyComment(KfashionComment kfashionComment);

    int selectCommentNo(Map<String, Object> selectMap);

    void updateComment(Map<String, Object> updateMap);

    String selectComment(Long workNo);
}

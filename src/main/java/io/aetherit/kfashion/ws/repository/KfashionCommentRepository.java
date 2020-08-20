package io.aetherit.kfashion.ws.repository;

import io.aetherit.kfashion.ws.model.KfashionComment;
import io.aetherit.kfashion.ws.model.KfashionImage;
import io.aetherit.kfashion.ws.repository.mapper.KfashionCommentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

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

    public int selectCommentNo(Map<String, Object> selectMap) {
        return mapper.selectCommentNo(selectMap);
    }

    public void updateComment(Map<String, Object> updateMap) {
        mapper.updateComment(updateMap);
    }

    public String selectComment(Long workNo) {
        return mapper.selectComment(workNo);
    }

    public List<Integer> selectWorkTypeList(Long workNo) {
        return mapper.selectWorkTypeList(workNo);
    }

    public void updatePolyComment(Map<String, Object> updateMap) {
        mapper.updatePolyComment(updateMap);
    }

    public List<KfashionComment> selectCommentWorkNoList() {
        return mapper.selectCommentWorkNoList();
    }

    public List<KfashionComment> selectCommentComplete(Long workNo) {
        return mapper.selectCommentComplete(workNo);
    }

    public void deleteCommentAll(KfashionImage workImage) {
        mapper.deleteCommentAll(workImage);
    }
}

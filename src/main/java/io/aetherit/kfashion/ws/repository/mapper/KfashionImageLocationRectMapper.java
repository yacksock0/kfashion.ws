package io.aetherit.kfashion.ws.repository.mapper;

import io.aetherit.kfashion.ws.model.KfashionImageLocationRect;

import java.util.List;
import java.util.Map;

public interface KfashionImageLocationRectMapper {
    void insertLocationRect(KfashionImageLocationRect rect);

    List<KfashionImageLocationRect> selectLocationRectList(KfashionImageLocationRect rect);

    List<KfashionImageLocationRect> selectRectNoList(Long workNo);

    void deleteRect(Map<String, Object> deleteMap);

    int[] selectRectNo(Long workNo);

    List<KfashionImageLocationRect> selectOuterRectList(Long workNo);

    List<KfashionImageLocationRect> selectTopRectList(Long workNo);

    List<KfashionImageLocationRect> selectPantsRectList(Long workNo);

    List<KfashionImageLocationRect> selectOnePieceRectList(Long workNo);
}

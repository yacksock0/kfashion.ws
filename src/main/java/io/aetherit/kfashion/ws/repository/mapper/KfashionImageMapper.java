package io.aetherit.kfashion.ws.repository.mapper;

import io.aetherit.kfashion.ws.model.KfashionImage;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface KfashionImageMapper {
    void insertImgUpload(KfashionImage kfashionImage);

    List<KfashionImage> selectBoundaryList();

    Map<String, Object> getByteImage(Long workNo);

    List<KfashionImage> selectPolygonList(String createdId);

    List<KfashionImage> selectRectList(String createdId);

    void deleteImage(KfashionImage workNo);

    List<KfashionImage> selectProfessionalList(HashMap<String, Object> map);

    List<KfashionImage> selectInspectionList(String createdId);

    List<KfashionImage> recentlyImg(String createdId);

    List<KfashionImage> selectInspectionHighList(Long workNo);

    int selectTotalCount(HashMap<String, Object> map);
}

package io.aetherit.kfashion.ws.repository.mapper;

import io.aetherit.kfashion.ws.model.KfashionImage;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface KfashionImageMapper {
    void insertImgUpload(KfashionImage kfashionImage);

    List<KfashionImage> selectBoundaryList();

    Map<String, Object> getByteImage(Long workNo);

    List<KfashionImage> selectPolygonList(HashMap<String, Object> pageMap);

    List<KfashionImage> selectRectList(HashMap<String, Object> pageMap);

    void deleteImage(KfashionImage workNo);

    List<KfashionImage> selectProfessionalList(HashMap<String, Object> pageMap);

    List<KfashionImage> selectInspectionList(Map<String, Object> pageMap);

    List<KfashionImage> recentlyImg(String createdId);

    List<KfashionImage> selectInspectionHighList(HashMap<String, Object> pageMap);

    int selectTotalCount(HashMap<String, Object> map);

    List<KfashionImage> selectSuccessList(HashMap<String, Object> pageMap);

    Long selectInspectionListTotal(Map<String, Object> pageMap);

    List<KfashionImage> selectProfessionalInspectionList(Map<String, Object> pageMap);

    Long selectProfessionalInspectionListTotal(Map<String, Object> pageMap);

    Long selectProfessionalListTotal(HashMap<String, Object> pageMap);

    Long selectSuccessListTotal(HashMap<String, Object> pageMap);

    Long selectRectListTotal(HashMap<String, Object> pageMap);

    List<KfashionImage> selectPolygonListTotal(HashMap<String, Object> pageMap);

    Long selectInspectionHighListTotal(HashMap<String, Object> pageMap);
}

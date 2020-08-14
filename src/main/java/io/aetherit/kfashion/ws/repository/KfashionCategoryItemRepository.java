package io.aetherit.kfashion.ws.repository;

import io.aetherit.kfashion.ws.model.KfashionCategoryItem;
import io.aetherit.kfashion.ws.repository.mapper.KfashionCategoryItemMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class KfashionCategoryItemRepository {

    private KfashionCategoryItemMapper mapper;

    @Autowired
    public KfashionCategoryItemRepository(KfashionCategoryItemMapper mapper) {
        this.mapper = mapper;
    }


    public List<KfashionCategoryItem> selectColorList1() {
        return mapper.selectColorList1();
    }

    public List<KfashionCategoryItem> selectColorList2() {
        return mapper.selectColorList2();
    }

    public List<KfashionCategoryItem> selectColorList3() {
        return mapper.selectColorList3();
    }

    public List<KfashionCategoryItem> selectColorList4() {
        return mapper.selectColorList4();
    }

    public List<KfashionCategoryItem> selectSleeveLengthList1() {
        return mapper.selectSleeveLengthList1();
    }

    public List<KfashionCategoryItem> selectSleeveLengthList2() {
        return mapper.selectSleeveLengthList2();
    }

    public List<KfashionCategoryItem> selectSleeveLengthList4() {
        return mapper.selectSleeveLengthList4();
    }

    public List<KfashionCategoryItem> selectStyleList() {
        return mapper.selectStyleList();
    }

    public List<KfashionCategoryItem> selectCategoryList1() {
        return mapper.selectCategoryList1();
    }

    public List<KfashionCategoryItem> selectCategoryList2() {
        return mapper.selectCategoryList2();
    }

    public List<KfashionCategoryItem> selectCategoryList3() {
        return mapper.selectCategoryList3();
    }

    public List<KfashionCategoryItem> selectCategoryList4() {
        return mapper.selectCategoryList4();
    }

    public List<KfashionCategoryItem> selectDetailList1() {
        return mapper.selectDetailList1();
    }

    public List<KfashionCategoryItem> selectDetailList2() {
        return mapper.selectDetailList2();
    }

    public List<KfashionCategoryItem> selectDetailList3() {
        return mapper.selectDetailList3();
    }

    public List<KfashionCategoryItem> selectDetailList4() {
        return mapper.selectDetailList4();
    }

    public List<KfashionCategoryItem> selectPrintList1() {
        return mapper.selectPrintList1();
    }

    public List<KfashionCategoryItem> selectPrintList2() {
        return mapper.selectPrintList2();
    }

    public List<KfashionCategoryItem> selectPrintList3() {
        return mapper.selectPrintList3();
    }

    public List<KfashionCategoryItem> selectPrintList4() {
        return mapper.selectPrintList4();
    }

    public List<KfashionCategoryItem> selectTextureList1() {
        return mapper.selectTextureList1();
    }

    public List<KfashionCategoryItem> selectTextureList2() {
        return mapper.selectTextureList2();
    }

    public List<KfashionCategoryItem> selectTextureList3() {
        return mapper.selectTextureList3();
    }

    public List<KfashionCategoryItem> selectTextureList4() {
        return mapper.selectTextureList4();
    }

    public List<KfashionCategoryItem> selectLengthList1() {
        return mapper.selectLengthList1();
    }

    public List<KfashionCategoryItem> selectLengthList2() {
        return mapper.selectLengthList2();
    }

    public List<KfashionCategoryItem> selectLengthList3() {
        return mapper.selectLengthList3();
    }

    public List<KfashionCategoryItem> selectLengthList4() {
        return mapper.selectLengthList4();
    }

    public List<KfashionCategoryItem> selectNeckLineList1() {
        return mapper.selectNeckLineList1();
    }

    public List<KfashionCategoryItem> selectNeckLineList2() {
        return mapper.selectNeckLineList2();
    }

    public List<KfashionCategoryItem> selectNeckLineList4() {
        return mapper.selectNeckLineList4();
    }

    public List<KfashionCategoryItem> selectKaraList1() {
        return mapper.selectKaraList1();
    }

    public List<KfashionCategoryItem> selectKaraList2() {
        return mapper.selectKaraList2();
    }

    public List<KfashionCategoryItem> selectKaraList4() {
        return mapper.selectKaraList4();
    }

    public List<KfashionCategoryItem> selectFitList1() {
        return mapper.selectFitList1();
    }

    public List<KfashionCategoryItem> selectFitList2() {
        return mapper.selectFitList2();
    }

    public List<KfashionCategoryItem> selectFitList3() {
        return mapper.selectFitList3();
    }

    public List<KfashionCategoryItem> selectFitList4() {
        return mapper.selectFitList4();
    }

}

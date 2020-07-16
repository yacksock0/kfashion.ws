package io.aetherit.kfashion.ws.service;

import io.aetherit.kfashion.ws.model.KfashionCategoryItem;
import io.aetherit.kfashion.ws.repository.KfashionCategoryItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class KfashionCategoryItemService {
    private KfashionCategoryItemRepository repository;

    @Autowired
    public KfashionCategoryItemService(KfashionCategoryItemRepository repository) {
        this.repository = repository;
    }

    public List<KfashionCategoryItem> selectColorList1() {
       return repository.selectColorList1();
    }
    public List<KfashionCategoryItem> selectColorList2() {
       return repository.selectColorList2();
    }
    public List<KfashionCategoryItem> selectColorList3() {
       return repository.selectColorList3();
    }
    public List<KfashionCategoryItem> selectColorList4() {
       return repository.selectColorList4();
    }

    public List<KfashionCategoryItem> selectSleeveLengthList1(){
       return repository.selectSleeveLengthList1();
    }
    public List<KfashionCategoryItem> selectSleeveLengthList2(){
       return repository.selectSleeveLengthList2();
    }
    public List<KfashionCategoryItem> selectSleeveLengthList4(){
       return repository.selectSleeveLengthList4();
    }

    public List<KfashionCategoryItem> selectStyleList() {
        return repository.selectStyleList();
    }

    public List<KfashionCategoryItem> selectCategoryList1() {
        return repository.selectCategoryList1();
    }
    public List<KfashionCategoryItem> selectCategoryList2() {
        return repository.selectCategoryList2();
    }
    public List<KfashionCategoryItem> selectCategoryList3() {
        return repository.selectCategoryList3();
    }
    public List<KfashionCategoryItem> selectCategoryList4() {
        return repository.selectCategoryList4();
    }

    public List<KfashionCategoryItem> selectDetailList1() {
        return repository.selectDetailList1();
    }
    public List<KfashionCategoryItem> selectDetailList2() {
        return repository.selectDetailList2();
    }
    public List<KfashionCategoryItem> selectDetailList3() {
        return repository.selectDetailList3();
    }
    public List<KfashionCategoryItem> selectDetailList4() {
        return repository.selectDetailList4();
    }

    public List<KfashionCategoryItem> selectPrintList1() {
        return repository.selectPrintList1();
    }
    public List<KfashionCategoryItem> selectPrintList2() {
        return repository.selectPrintList2();
    }
    public List<KfashionCategoryItem> selectPrintList3() {
        return repository.selectPrintList3();
    }
    public List<KfashionCategoryItem> selectPrintList4() {
        return repository.selectPrintList4();
    }

    public List<KfashionCategoryItem> selectTextureList1() {
        return repository.selectTextureList1();
    }
    public List<KfashionCategoryItem> selectTextureList2() {
        return repository.selectTextureList2();
    }
    public List<KfashionCategoryItem> selectTextureList3() {
        return repository.selectTextureList3();
    }
    public List<KfashionCategoryItem> selectTextureList4() {
        return repository.selectTextureList4();
    }

    public List<KfashionCategoryItem> selectLengthList1() {
        return repository.selectLengthList1();
    }
    public List<KfashionCategoryItem> selectLengthList2() {
        return repository.selectLengthList2();
    }
    public List<KfashionCategoryItem> selectLengthList3() { return repository.selectLengthList3(); }
    public List<KfashionCategoryItem> selectLengthList4() {
        return repository.selectLengthList4();
    }

    public List<KfashionCategoryItem> selectNeckLineList1() {
        return repository.selectNeckLineList1();
    }
    public List<KfashionCategoryItem> selectNeckLineList2() {
        return repository.selectNeckLineList2();
    }
    public List<KfashionCategoryItem> selectNeckLineList4() {
        return repository.selectNeckLineList4();
    }

    public List<KfashionCategoryItem> selectKaraList1() {
        return repository.selectKaraList1();
    }
    public List<KfashionCategoryItem> selectKaraList2() {
        return repository.selectKaraList2();
    }
    public List<KfashionCategoryItem> selectKaraList4() {
        return repository.selectKaraList4();
    }

    public List<KfashionCategoryItem> selectFitList1() {
        return repository.selectFitList1();
    }
    public List<KfashionCategoryItem> selectFitList2() {
        return repository.selectFitList2();
    }
    public List<KfashionCategoryItem> selectFitList3() {
        return repository.selectFitList3();
    }
    public List<KfashionCategoryItem> selectFitList4() {
        return repository.selectFitList4();
    }


}

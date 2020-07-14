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

    public List<KfashionCategoryItem> selectColorList() {
       return repository.selectColorList();
    }

    public List<KfashionCategoryItem> selectSleeveLengthList(){
       return repository.selectSleeveLengthList();
    }

    public List<KfashionCategoryItem> selectStyleList() {
        return repository.selectStyleList();
    }

    public List<KfashionCategoryItem> selectCategoryList0() {
        return repository.selectCategoryList0();
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

    public List<KfashionCategoryItem> selectDetailList() {
        return repository.selectDetailList();
    }

    public List<KfashionCategoryItem> selectPrintList() {
        return repository.selectPrintList();
    }

    public List<KfashionCategoryItem> selectTextureList() {
        return repository.selectTextureList();
    }

    public List<KfashionCategoryItem> selectLengthList0() {
        return repository.selectLengthList0();
    }
    public List<KfashionCategoryItem> selectLengthList1() {
        return repository.selectLengthList1();
    }
    public List<KfashionCategoryItem> selectLengthList2() {
        return repository.selectLengthList2();
    }
    public List<KfashionCategoryItem> selectLengthList3() { return repository.selectLengthList3(); }

    public List<KfashionCategoryItem> selectNeckLineList() {
        return repository.selectNeckLineList();
    }

    public List<KfashionCategoryItem> selectKaraList() {
        return repository.selectKaraList();
    }

    public List<KfashionCategoryItem> selectFitList0() {
        return repository.selectFitList0();
    }
    public List<KfashionCategoryItem> selectFitList3() {
        return repository.selectFitList3();
    }

    public List<KfashionCategoryItem> selectSafeList() {
        return repository.selectSafeList();
    }

    public List<KfashionCategoryItem> selectSilhouetteList() {
        return repository.selectSilhouetteList();
    }

}

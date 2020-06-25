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

    public List<KfashionCategoryItem> selectCategoryList() {
        return repository.selectCategoryList();
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

    public List<KfashionCategoryItem> selectLengthList() {
        return repository.selectLengthList();
    }

    public List<KfashionCategoryItem> selectNeckLineList() {
        return repository.selectNeckLineList();
    }

    public List<KfashionCategoryItem> selectKaraList() {
        return repository.selectKaraList();
    }

    public List<KfashionCategoryItem> selectFitList() {
        return repository.selectFitList();
    }

    public List<KfashionCategoryItem> selectSafeList() {
        return repository.selectSafeList();
    }

    public List<KfashionCategoryItem> selectSilhouetteList() {
        return repository.selectSilhouetteList();
    }
}

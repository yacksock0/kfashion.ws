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

    public List<KfashionCategoryItem> selectCategoryItem() {
        return repository.selectCategoryItem();
    }

    public List<KfashionCategoryItem> selectColorList() {
       return repository.selectColorList();
    }
    public List<KfashionCategoryItem> selectSleeveLengthList(){
       return repository.selectSleeveLengthList();
    }

}

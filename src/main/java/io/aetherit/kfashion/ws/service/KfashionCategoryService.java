package io.aetherit.kfashion.ws.service;

import io.aetherit.kfashion.ws.model.KfashionBasic;
import io.aetherit.kfashion.ws.model.KfashionCategory;
import io.aetherit.kfashion.ws.repository.KfashionBasicRepository;
import io.aetherit.kfashion.ws.repository.KfashionCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KfashionCategoryService {

    private KfashionCategoryRepository repository;

    @Autowired
    public KfashionCategoryService(KfashionCategoryRepository repository) {
        this.repository = repository;
    }

    public List<KfashionCategory> categoryList() {
        return repository.categoryList();
    }
}

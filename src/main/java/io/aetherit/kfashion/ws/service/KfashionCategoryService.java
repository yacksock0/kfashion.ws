package io.aetherit.kfashion.ws.service;

import io.aetherit.kfashion.ws.repository.KfashionCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KfashionCategoryService {

    private KfashionCategoryRepository repository;

    @Autowired
    public KfashionCategoryService(KfashionCategoryRepository repository) {
        this.repository = repository;
    }


}

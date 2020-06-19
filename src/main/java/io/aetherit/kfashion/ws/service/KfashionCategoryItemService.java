package io.aetherit.kfashion.ws.service;

import io.aetherit.kfashion.ws.repository.KfashionCategoryItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KfashionCategoryItemService {
    private KfashionCategoryItemRepository repository;

    @Autowired
    public KfashionCategoryItemService(KfashionCategoryItemRepository repository) {
        this.repository = repository;
    }
}

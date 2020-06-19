package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.service.KfashionCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/")
public class KfashionCategoryController {
    private KfashionCategoryService kfashionCategoryService;

    @Autowired
    public KfashionCategoryController(KfashionCategoryService kfashionCategoryService) {
        this.kfashionCategoryService = kfashionCategoryService;
    }
}

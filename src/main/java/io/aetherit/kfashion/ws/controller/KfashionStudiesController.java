package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.model.KfashionProfessional;
import io.aetherit.kfashion.ws.model.KfashionStudies;
import io.aetherit.kfashion.ws.service.KfashionStudiesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/studies")
public class KfashionStudiesController {
    private KfashionStudiesService kfashionStudiesService;

    @Autowired
    public KfashionStudiesController(KfashionStudiesService kfashionStudiesService) {
        this.kfashionStudiesService = kfashionStudiesService;
    }

    @PostMapping("/studiesInsert")
    public void kfashionStudiesInsert(KfashionStudies kfashionStudies) {
        kfashionStudiesService.kfashionStudiesInsert(kfashionStudies);
    }
}

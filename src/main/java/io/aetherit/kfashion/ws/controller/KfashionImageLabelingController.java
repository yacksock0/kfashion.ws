package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.service.KfashionImageLabelingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/authentications/")
public class KfashionImageLabelingController {

    private KfashionImageLabelingService kfashionImageLabelingService;

    @Autowired
    public KfashionImageLabelingController(KfashionImageLabelingService kfashionImageLabelingService) {
        this.kfashionImageLabelingService = kfashionImageLabelingService;
    }
}

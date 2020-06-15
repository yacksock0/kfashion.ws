package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.service.KfashionBasicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/authentications/")
public class KfashionBasicController {

    private KfashionBasicService kfashionBasicService;

    @Autowired
    public KfashionBasicController(KfashionBasicService kfashionBasicService) {
        this.kfashionBasicService = kfashionBasicService;
    }
}

package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.service.KfashionEmailAuthorityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/")
public class KfashionEmailAuthorityController {

    private KfashionEmailAuthorityService kfashionEmailAuthorityService;

    @Autowired
    public KfashionEmailAuthorityController(KfashionEmailAuthorityService kfashionEmailAuthorityService) {
        this.kfashionEmailAuthorityService = kfashionEmailAuthorityService;
    }
}

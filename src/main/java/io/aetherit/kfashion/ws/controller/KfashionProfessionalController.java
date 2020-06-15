package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.service.KfashionProfessionalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/authentications/")
public class KfashionProfessionalController {

    private KfashionProfessionalService kfashionProfessionalService;

    @Autowired
    public KfashionProfessionalController(KfashionProfessionalService kfashionProfessionalService) {
        this.kfashionProfessionalService = kfashionProfessionalService;
    }
}

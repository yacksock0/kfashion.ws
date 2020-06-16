package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.model.KfashionBasic;
import io.aetherit.kfashion.ws.model.KfashionProfessional;
import io.aetherit.kfashion.ws.service.KfashionProfessionalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/v1/professional")
public class KfashionProfessionalController {

    private KfashionProfessionalService kfashionProfessionalService;

    @Autowired
    public KfashionProfessionalController(KfashionProfessionalService kfashionProfessionalService) {
        this.kfashionProfessionalService = kfashionProfessionalService;
    }

    @PostMapping("professionalInsert")
    public void kfashionProfessionalInsert(KfashionProfessional kfashionProfessional) {
        kfashionProfessionalService.kfashionProfessionalInsert(kfashionProfessional);
    }

}

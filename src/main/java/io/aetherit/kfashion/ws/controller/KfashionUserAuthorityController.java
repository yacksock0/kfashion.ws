package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.service.KfashionLabelService;
import io.aetherit.kfashion.ws.service.KfashionUserAuthorityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/")
public class KfashionUserAuthorityController {

        private KfashionUserAuthorityService kfashionUserAuthorityService;

        @Autowired
        public KfashionUserAuthorityController(KfashionUserAuthorityService kfashionUserAuthorityService) {
            this.kfashionUserAuthorityService = kfashionUserAuthorityService;
        }
}

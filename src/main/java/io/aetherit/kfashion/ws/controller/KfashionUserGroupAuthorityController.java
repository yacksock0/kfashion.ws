package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.service.KfashionUserAuthorityService;
import io.aetherit.kfashion.ws.service.KfashionUserGroupAuthorityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/")
public class KfashionUserGroupAuthorityController {

        private KfashionUserGroupAuthorityService kfashionUserGroupAuthorityService;

        @Autowired
        public KfashionUserGroupAuthorityController(KfashionUserGroupAuthorityService kfashionUserGroupAuthorityService) {
            this.kfashionUserGroupAuthorityService = kfashionUserGroupAuthorityService;
        }
}

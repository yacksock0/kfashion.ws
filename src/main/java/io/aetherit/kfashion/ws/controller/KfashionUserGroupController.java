package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.service.KfashionUserGroupAuthorityService;
import io.aetherit.kfashion.ws.service.KfashionUserGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/v1/")
public class KfashionUserGroupController {

        private KfashionUserGroupService kfashionUserGroupService;

        @Autowired
        public KfashionUserGroupController(KfashionUserGroupService kfashionUserGroupService) {
            this.kfashionUserGroupService = kfashionUserGroupService;
        }
    }

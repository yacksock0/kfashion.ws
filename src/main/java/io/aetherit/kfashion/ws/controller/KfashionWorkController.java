package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.service.KfashionUserInfoService;
import io.aetherit.kfashion.ws.service.KfashionWorkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/")
public class KfashionWorkController {

        private KfashionWorkService kfashionWorkService;

        @Autowired
        public KfashionWorkController(KfashionWorkService kfashionWorkService) {
            this.kfashionWorkService = kfashionWorkService;
        }
    }


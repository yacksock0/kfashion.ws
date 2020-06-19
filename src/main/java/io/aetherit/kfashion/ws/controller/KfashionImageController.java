package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.service.KfashionImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/")
public class KfashionImageController {

        private KfashionImageService kfashionImageService;

        @Autowired
        public KfashionImageController(KfashionImageService kfashionImageService) {
            this.kfashionImageService = kfashionImageService;
        }
}

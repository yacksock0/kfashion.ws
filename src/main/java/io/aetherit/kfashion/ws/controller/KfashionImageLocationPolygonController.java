package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.service.KfashionEmailAuthorityService;
import io.aetherit.kfashion.ws.service.KfashionImageLocationPolygonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/v1/")
public class KfashionImageLocationPolygonController {

        private KfashionImageLocationPolygonService kfashionImageLocationPolygonService;

        @Autowired
        public KfashionImageLocationPolygonController(KfashionImageLocationPolygonService kfashionImageLocationPolygonService) {
            this.kfashionImageLocationPolygonService = kfashionImageLocationPolygonService;
        }
}

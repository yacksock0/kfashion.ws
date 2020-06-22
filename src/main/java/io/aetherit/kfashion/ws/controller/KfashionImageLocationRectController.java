package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.service.KfashionImageLocationPolygonService;
import io.aetherit.kfashion.ws.service.KfashionImageLocationRectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/v1/")
public class KfashionImageLocationRectController {

        private KfashionImageLocationRectService kfashionImageLocationRectService;

        @Autowired
        public KfashionImageLocationRectController(KfashionImageLocationRectService kfashionImageLocationRectService) {
            this.kfashionImageLocationRectService = kfashionImageLocationRectService;
        }

}

package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.service.KfashionLabelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/label")
public class KfashionLabelController {

        private KfashionLabelService kfashionLabelService;

        @Autowired
        public KfashionLabelController(KfashionLabelService kfashionLabelService) {
            this.kfashionLabelService = kfashionLabelService;
        }


        @PostMapping(value = "/basicLabel")
        public void basicLabel() {

        }

        @PostMapping(value = "/professionalLabel")
        public void professionalLabel() {


        }


}

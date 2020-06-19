package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.service.KfashionWorkHistoryService;
import io.aetherit.kfashion.ws.service.KfashionWorkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/v1/")
public class KfashionWorkHistoryController {

        private KfashionWorkHistoryService kfashionWorkHistoryService;

        @Autowired
        public KfashionWorkHistoryController(KfashionWorkHistoryService kfashionWorkHistoryService) {
            this.kfashionWorkHistoryService = kfashionWorkHistoryService;
        }
}

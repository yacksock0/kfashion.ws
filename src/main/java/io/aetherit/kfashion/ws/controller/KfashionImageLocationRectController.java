package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.model.KfashionImageLocationPolygon;
import io.aetherit.kfashion.ws.model.KfashionImageLocationRect;
import io.aetherit.kfashion.ws.service.KfashionImageLocationPolygonService;
import io.aetherit.kfashion.ws.service.KfashionImageLocationRectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;


@RestController
@RequestMapping("/api/v1/kfashion/rect")
public class KfashionImageLocationRectController {

        private KfashionImageLocationRectService kfashionImageLocationRectService;

        @Autowired
        public KfashionImageLocationRectController(KfashionImageLocationRectService kfashionImageLocationRectService) {
            this.kfashionImageLocationRectService = kfashionImageLocationRectService;
        }

    @PostMapping(value="/")
    public ResponseEntity<String> insertLocationRect(HttpServletRequest httpServletRequest,
                                                        @RequestBody @Valid KfashionImageLocationRect rect) throws Exception {
        return new ResponseEntity<String>(kfashionImageLocationRectService.insertLocationRect(rect), HttpStatus.OK);
    }

}

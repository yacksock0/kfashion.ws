package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.model.KfashionImageLocationPolygon;
import io.aetherit.kfashion.ws.model.KfashionUserInfo;
import io.aetherit.kfashion.ws.service.KfashionEmailAuthorityService;
import io.aetherit.kfashion.ws.service.KfashionImageLocationPolygonPointService;
import io.aetherit.kfashion.ws.service.KfashionImageLocationPolygonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;


@RestController
@RequestMapping("/api/v1/kfashion/polygon")
public class KfashionImageLocationPolygonController {

        private KfashionImageLocationPolygonService kfashionImageLocationPolygonService;
        private KfashionImageLocationPolygonPointService kfashionImageLocationPolygonPointService;

        @Autowired
        public KfashionImageLocationPolygonController(KfashionImageLocationPolygonService kfashionImageLocationPolygonService,
                                                      KfashionImageLocationPolygonPointService kfashionImageLocationPolygonPointService) {
            this.kfashionImageLocationPolygonService = kfashionImageLocationPolygonService;
            this.kfashionImageLocationPolygonPointService = kfashionImageLocationPolygonPointService;
        }

        @PostMapping(value="/")
        public ResponseEntity<String> insertLocationPolygon(HttpServletRequest httpServletRequest,
                                                            @RequestBody @Valid KfashionImageLocationPolygon polygon,
                                                            @RequestParam("locationX") int[] locationsX,
                                                            @RequestParam("locationY") int[] locationsY) throws Exception {
            String msg="";
                    msg=kfashionImageLocationPolygonService.insertLocationPolygon(polygon);
            return new ResponseEntity<String>(msg, HttpStatus.OK);
        }
}

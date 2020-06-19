package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.service.KfashionCategoryItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;

@RestController
@RequestMapping("/api/v1/category/item")
public class KfashionCategoryItemController {

    private KfashionCategoryItemService kfashionCategoryItemService;

    @Autowired
    public KfashionCategoryItemController(KfashionCategoryItemService kfashionCategoryItemService) {
        this.kfashionCategoryItemService = kfashionCategoryItemService;

    }

        @GetMapping(value = "/basic/category")
        public ResponseEntity<Object> categoryList(HttpServletRequest httpRequest) {
            HashMap<String, Object> resultMap = new HashMap<String, Object>();

            return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
        }

        @GetMapping (value = "/basic/color")
        public ResponseEntity<Object> colorList(HttpServletRequest httpRequest) {
            HashMap<String, Object> resultMap = new HashMap<String, Object>();

            return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
        }

        @GetMapping (value = "/basic/sleeve")
        public ResponseEntity<Object> sleeveList(HttpServletRequest httpRequest) {
            HashMap<String, Object> resultMap = new HashMap<String, Object>();

            return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
        }

        @GetMapping (value = "/basic/cloth")
        public ResponseEntity<Object> clothList(HttpServletRequest httpRequest) {
            HashMap<String, Object> resultMap = new HashMap<String, Object>();

            return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
        }

        @GetMapping (value = "/basic/print")
        public ResponseEntity<Object> printList(HttpServletRequest httpRequest) {
            HashMap<String, Object> resultMap = new HashMap<String, Object>();

            return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
        }

}

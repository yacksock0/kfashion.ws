package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.model.KfashionBasic;
import io.aetherit.kfashion.ws.model.KfashionCategory;
import io.aetherit.kfashion.ws.model.KfashionColor;
import io.aetherit.kfashion.ws.service.KfashionBasicService;
import io.aetherit.kfashion.ws.service.KfashionCategoryService;
import io.aetherit.kfashion.ws.service.KfashionColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/v1/basic")
public class KfashionBasicController {

    private KfashionBasicService kfashionBasicService;
    private KfashionCategoryService kfashionCategoryService;
    private KfashionColorService kfashionColorService;

    @Autowired
    public KfashionBasicController(KfashionBasicService kfashionBasicService,
                                   KfashionCategoryService kfashionCategoryService,
                                   KfashionColorService kfashionColorService) {

        this.kfashionBasicService = kfashionBasicService;
        this.kfashionCategoryService =kfashionCategoryService;
        this.kfashionColorService=kfashionColorService;
    }

    @GetMapping(value = "")
    public ResponseEntity<Object> getUserMembers(HttpServletRequest httpRequest) {
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        List<KfashionCategory> categoryList=kfashionCategoryService.categoryList();
        List<KfashionColor> colorList=kfashionColorService.colorList();
        System.out.println(colorList);
        System.out.println(categoryList);
        resultMap.put("categoryList",categoryList);
        resultMap.put("colorList",colorList);
        return new ResponseEntity<Object>(resultMap,HttpStatus.OK);
    }

    @PostMapping("/basicInsert")
    public void kfashionBasicInsert(KfashionBasic kfashionBasic) {
        kfashionBasicService.kfashionBasicInsert(kfashionBasic);
    }



}

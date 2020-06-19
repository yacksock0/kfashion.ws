package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.model.KfashionAuthMail;
import io.aetherit.kfashion.ws.model.KfashionEmailAuthority;
import io.aetherit.kfashion.ws.model.KfashionUser;
import io.aetherit.kfashion.ws.model.KfashionUserInfo;
import io.aetherit.kfashion.ws.service.KfashionUserGroupService;
import io.aetherit.kfashion.ws.service.KfashionUserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.HashMap;

@RestController
@RequestMapping("/api/v1/")
public class KfashionUserInfoController {

    private KfashionUserInfoService kfashionUserInfoService;

    @Autowired
    public KfashionUserInfoController(KfashionUserInfoService kfashionUserInfoService) {
        this.kfashionUserInfoService = kfashionUserInfoService;
    }



}

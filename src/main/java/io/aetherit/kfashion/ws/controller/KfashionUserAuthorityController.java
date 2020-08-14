package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.model.KfashionUserAuthority;
import io.aetherit.kfashion.ws.service.KfashionUserAuthorityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/v1/kfashion/user")
public class KfashionUserAuthorityController {

    private KfashionUserAuthorityService kfashionUserAuthorityService;

    @Autowired
    public KfashionUserAuthorityController(KfashionUserAuthorityService kfashionUserAuthorityService) {
        this.kfashionUserAuthorityService = kfashionUserAuthorityService;
    }

    /**
     * 그룹 권한 리스트
     *
     * @param httpRequest
     * @return ResponseEntity
     * @throws
     */
    @GetMapping(value = "/authority")
    public ResponseEntity<Object> userAuthorityList(HttpServletRequest httpRequest) {
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        List<KfashionUserAuthority> userAuthorityList = kfashionUserAuthorityService.selectUserAuthority();
        resultMap.put("userAuthorityList", userAuthorityList);
        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }

}

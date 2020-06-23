package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.model.KfashionUserInfo;
import io.aetherit.kfashion.ws.service.KfashionUserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.HashMap;

@RestController
@RequestMapping("/api/v1/kfashion/users")
public class KfashionUserInfoController {

    private KfashionUserInfoService kfashionUserInfoService;

    @Autowired
    public KfashionUserInfoController(KfashionUserInfoService kfashionUserInfoService) {
        this.kfashionUserInfoService = kfashionUserInfoService;
    }

    /**
         * 사용자 등록
         * @param user
         * @return
         * @throws Exception
     */
    @PostMapping(value = "/signup")
    public ResponseEntity<String> signUp(HttpServletRequest httpServletRequest, @RequestBody @Valid KfashionUserInfo user)
            throws Exception {
        return new ResponseEntity<String>(kfashionUserInfoService.createNewUser(user), HttpStatus.OK);
    }

    /**
     * 사용자 조회 : 기가입 여부 확인용
     * @param httpRequest
     * @param userId
     * @return
     * @throws Exception
     */
    @GetMapping(value = "/signupcheck/email")
    public ResponseEntity<Object> getEmailCheck(HttpServletRequest httpRequest, @RequestParam(value = "email", required=true) String email) throws Exception{
        KfashionUserInfo user = kfashionUserInfoService.selectUserByEmail(email);
        boolean result = false;
        if(user!=null) result = true;
        HashMap<String,Object> resultMap = new HashMap<String,Object>();
        resultMap.put("result", result);
        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }

    @GetMapping(value = "/signupcheck/id")
    public ResponseEntity<Object> getIdCheck(HttpServletRequest httpRequest, @RequestParam(value = "id", required=true) String id) throws Exception{
        KfashionUserInfo user = kfashionUserInfoService.selectUserById(id);
        boolean result = false;
        if(user!=null) result = true;
        HashMap<String,Object> resultMap = new HashMap<String,Object>();
        resultMap.put("result", result);
        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }







}

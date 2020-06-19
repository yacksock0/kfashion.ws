package io.aetherit.kfashion.ws.controller;


import io.aetherit.kfashion.ws.model.KfashionAuthMail;
import io.aetherit.kfashion.ws.model.KfashionUser;
import io.aetherit.kfashion.ws.service.AuthenticationService;
import io.aetherit.kfashion.ws.service.KfashionUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.HashMap;

@RestController
@RequestMapping("/api/v1/users")
public class KfashionUserController {
    private KfashionUserService kfashionUserService;

    private AuthenticationService authenticationService;


    @Autowired
    public KfashionUserController(KfashionUserService kfashionUserService, AuthenticationService authenticationService) {
        this.kfashionUserService = kfashionUserService;
        this.authenticationService = authenticationService;
    }

    /**
     * 사용자 등록
     * @param user
     * @return
     * @throws Exception
     */
    @PostMapping(value = "/signup")
    public ResponseEntity<String> signup(HttpServletRequest httpServletRequest, @RequestBody @Valid KfashionUser user) throws Exception{
        return new ResponseEntity<String>(kfashionUserService.createNewUser(user), HttpStatus.OK);
    }

    /**
     * 이메일 인증 : 사용자 등록
     * @param authMail
     * @return
     * @throws Exception
     */
    @PutMapping(value = "/signup")
    public ResponseEntity<String> signupAuth(HttpServletRequest httpServletRequest, @RequestBody KfashionAuthMail authMail) throws Exception{
        return kfashionUserService.signupAuthMailVerify(authMail);
    }


    /**
     * 사용자 조회 : 기가입 여부 확인용
     * @param httpRequest
     * @return
     * @throws Exception
     */
    @GetMapping(value = "/signupcheck")
    public ResponseEntity<Object> getUserCheck(HttpServletRequest httpRequest, @RequestParam(value = "email", required=true) String email) throws Exception{
        KfashionUser user = kfashionUserService.getUserByEmail(email);
        boolean result = false;
        if(user!=null) result = true;
        HashMap<String,Object> resultMap = new HashMap<String,Object>();
        resultMap.put("result", result);
        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }
}

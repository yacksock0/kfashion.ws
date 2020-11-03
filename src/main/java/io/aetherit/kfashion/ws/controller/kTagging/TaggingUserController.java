package io.aetherit.kfashion.ws.controller.kTagging;

import io.aetherit.kfashion.ws.model.kSearching.SearchingUser;
import io.aetherit.kfashion.ws.model.kTagging.TaggingUser;
import io.aetherit.kfashion.ws.service.KfashionEmailAuthorityService;
import io.aetherit.kfashion.ws.service.KfashionUserGroupAdminService;
import io.aetherit.kfashion.ws.service.KfashionWorkHistoryService;
import io.aetherit.kfashion.ws.service.kTagging.TaggingUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;

@RestController
@RequestMapping("/api/v1/kTagging/users")
public class TaggingUserController {

    private TaggingUserService taggingUserService;
    private JavaMailSender mailSender;
    private KfashionUserGroupAdminService kfashionUserGroupAdminService;
    private KfashionEmailAuthorityService kfashionEmailAuthorityService;
    private KfashionWorkHistoryService kfashionWorkHistoryService;


    @Autowired
    public TaggingUserController(TaggingUserService taggingUserService,
                                 JavaMailSender mailSender,
                                 KfashionUserGroupAdminService kfashionUserGroupAdminService,
                                 KfashionEmailAuthorityService kfashionEmailAuthorityService,
                                 KfashionWorkHistoryService kfashionWorkHistoryService) {
        this.taggingUserService = taggingUserService;
        this.mailSender = mailSender;
        this.kfashionUserGroupAdminService = kfashionUserGroupAdminService;
        this.kfashionEmailAuthorityService = kfashionEmailAuthorityService;
        this.kfashionWorkHistoryService = kfashionWorkHistoryService;
    }

    /**
     * 사용자 등록
     *
     * @param user
     * @return ResponseEntity
     * @throws Exception
     */
    @PostMapping(value = "/signup")
    public ResponseEntity<String> signUpTagging(HttpServletRequest httpServletRequest, @RequestBody TaggingUser user)
            throws Exception {
        String str = taggingUserService.createNewUser(user);
        return new ResponseEntity<String>( HttpStatus.OK);
    }

    /**
     * 사용자 조회 : 기가입 여부 확인용
     *
     * @param httpRequest
     * @param id
     * @return boolean
     * @throws Exception
     */
    @GetMapping(value = "/signupcheck/id")
    public ResponseEntity<Object> getIdCheckTagging(HttpServletRequest httpRequest, @RequestParam(value = "id", required = true) String id) throws Exception {
        TaggingUser user = taggingUserService.selectUserById(id);
        boolean result = false;
        if (user != null) result = true;
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        resultMap.put("result", result);
        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }
    //닉네임 중복확
    @GetMapping(value = "/signupcheck/nickname")
    public ResponseEntity<Object> getNickNameCheckTagging(HttpServletRequest httpRequest, @RequestParam(value = "nickName", required = true) String nickName) throws Exception {
        System.out.println("@@");
        TaggingUser user = taggingUserService.selectUserByNickName(nickName);
        boolean result = false;
        if (user != null) result = true;
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        resultMap.put("result", result);
        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }

    /**
     * 회원 정보 찾기
     */
    @PostMapping(value = "/find")
    public ResponseEntity<Object> findIdTagging(HttpServletRequest httpRequest, @RequestBody TaggingUser user) throws Exception {

        TaggingUser result = taggingUserService.findTaggingUser(user);
        System.out.println("@@@@@@@@@@" +result);
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        resultMap.put("result", result);
        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }


    @PostMapping(value = "/nameck")
    public ResponseEntity<Object> nameCkTaggingUser(HttpServletRequest httpRequest, @RequestBody TaggingUser user) throws Exception {
        TaggingUser result = taggingUserService.nameCkTaggingUser(user);
        System.out.println("@@@@@@@@@@" +result);
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        resultMap.put("result", result);
        System.out.println(resultMap);
        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }


    @PostMapping(value = "/changepassword")
    public ResponseEntity<String> changepassword(HttpServletRequest httpRequest, @RequestBody TaggingUser user) throws Exception {
        System.out.println("@@"+user);
        String str = taggingUserService.changePassword(user);
        return new ResponseEntity<String>( HttpStatus.OK);
    }

}

package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.model.KfashionEmailAuthority;
import io.aetherit.kfashion.ws.model.KfashionUserInfo;
import io.aetherit.kfashion.ws.service.KfashionUserGroupAdminService;
import io.aetherit.kfashion.ws.service.KfashionUserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/v1/kfashion/users")
public class KfashionUserInfoController {

    private KfashionUserInfoService kfashionUserInfoService;
    private JavaMailSender mailSender;
    private KfashionUserGroupAdminService kfashionUserGroupAdminService;




    @Autowired
    public KfashionUserInfoController(KfashionUserInfoService kfashionUserInfoService,
                                      JavaMailSender mailSender,
                                      KfashionUserGroupAdminService kfashionUserGroupAdminService) {
        this.kfashionUserInfoService = kfashionUserInfoService;
        this.mailSender = mailSender;
        this.kfashionUserGroupAdminService = kfashionUserGroupAdminService;
    }

    /**
         * 사용자 등록
         * @param user
         * @return ResponseEntity
         * @throws Exception
     */
    @PostMapping(value = "/signup")
    public ResponseEntity<String> signUp(HttpServletRequest httpServletRequest, @RequestBody @Valid KfashionUserInfo user)
            throws Exception {
        return new ResponseEntity<String>(kfashionUserInfoService.createNewUser(user), HttpStatus.OK);
    }
    /**
     * 이메일 인증 : 사용자 등록
     * @param userId
     * @param authKey
     * @return sendMail
     * @throws Exception
     */
    @GetMapping(value = "/signup/confirm")
    public ResponseEntity<Object> signupAuth(HttpServletResponse response,
                                             HttpServletRequest httpServletRequest, @RequestParam(value= "userId", required = true)String userId,
                                                                                    @RequestParam(value= "authKey", required = true)String authKey) throws Exception{
        KfashionEmailAuthority authMail = new KfashionEmailAuthority();
        authMail.setUserId(userId);
        authMail.setAuthKey(authKey);
        response.sendRedirect("http://localhost:3000/sign/success");
        return kfashionUserInfoService.signupAuthMailVerify(authMail);
    }


    /**
     * 사용자 조회 : 기가입 여부 확인용
     * @param httpRequest
     * @param email
     * @return boolean
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

    /**
     * 사용자 조회 : 기가입 여부 확인용
     * @param httpRequest
     * @param id
     * @return boolean
     * @throws Exception
     */
    @GetMapping(value = "/signupcheck/id")
    public ResponseEntity<Object> getIdCheck(HttpServletRequest httpRequest, @RequestParam(value = "id", required=true) String id) throws Exception{
        KfashionUserInfo user = kfashionUserInfoService.selectUserById(id);
        boolean result = false;
        if(user!=null) result = true;
        HashMap<String,Object> resultMap = new HashMap<String,Object>();
        resultMap.put("result", result);
        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }

    /**
     * 회원가입 인증 완료 후 그룹 넘버 없는 회원 리스트 출력
     * @param httpRequest
     * @return List
     * @throws Exception
     */

    @GetMapping(value = "/userList")
    public ResponseEntity<Object> userList(HttpServletRequest httpRequest) throws Exception{
        HashMap<String,Object> resultMap = new HashMap<String,Object>();
        List<KfashionUserInfo> userList = kfashionUserInfoService.selectUserList();
        resultMap.put("userList", userList);
        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }

    /**
     * 그룹 지정된 회원 리스트
     * @param httpRequest
     * @return List
     * @throws Exception
     */
    @GetMapping(value="/groupUserList")
    public ResponseEntity<Object> groupUserList(HttpServletRequest httpRequest,
                                                @RequestParam(value="groupNo", required=true) int groupNo) throws Exception {
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        String id = kfashionUserGroupAdminService.selectGroupAdminId(groupNo);
        KfashionUserInfo user = new KfashionUserInfo();
        user.setGroupNo(groupNo);
        user.setId(id);
        List<KfashionUserInfo> groupUserList = kfashionUserInfoService.selectGroupUserList(user);
        resultMap.put("groupUserList", groupUserList);
        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }

    /**
     * 그룹 지정된 회원 리스트
     * @param httpServletRequest
     * @return List
     * @throws Exception
     */

    @PostMapping(value="/createGroupUser")
    public ResponseEntity<Object> createGroupUser(HttpServletRequest httpServletRequest,
                                            @RequestBody KfashionUserInfo user) throws Exception{
        kfashionUserInfoService.createGroupUser(user);
        return new ResponseEntity<Object>("success",HttpStatus.OK);
    }

    /**
     * 그룹 유저 탈퇴
     * @param httpRequest
     * @param id
     * @return List
     * @throws Exception
     */

    @DeleteMapping("/deleteGroupUser")
    public ResponseEntity<Object> deleteGroupUser(HttpServletRequest httpRequest,
                                                   @RequestParam(value="userId")String id) {
        kfashionUserInfoService.deleteGroupUser(id);
        return new ResponseEntity<Object>("success",HttpStatus.OK);
    }

    /**
     * 그룹 어드민 탈퇴
     * @param httpRequest
     * @param id
     * @return List
     * @throws Exception
     */

    @DeleteMapping("/deleteGroupAdminUser/{userId}")
    public ResponseEntity<Object> deleteGroupAdminUser (HttpServletRequest httpRequest,
                                                   @RequestParam(value="userId")String id) {
        kfashionUserInfoService.deleteGroupAdminUser(id);
        return new ResponseEntity<Object>("success",HttpStatus.OK);
    }







}

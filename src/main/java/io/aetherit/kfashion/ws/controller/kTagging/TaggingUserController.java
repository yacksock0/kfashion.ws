package io.aetherit.kfashion.ws.controller.kTagging;

import io.aetherit.kfashion.ws.model.KfashionEmailAuthority;
import io.aetherit.kfashion.ws.model.KfashionUserInfo;
import io.aetherit.kfashion.ws.model.kTagging.TaggingUser;
import io.aetherit.kfashion.ws.service.KfashionEmailAuthorityService;
import io.aetherit.kfashion.ws.service.KfashionUserGroupAdminService;
import io.aetherit.kfashion.ws.service.KfashionUserInfoService;
import io.aetherit.kfashion.ws.service.KfashionWorkHistoryService;
import io.aetherit.kfashion.ws.service.kTagging.TaggingUserService;
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
import java.util.Map;

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
        System.out.println("1111111");
        String str = taggingUserService.createNewUser(user);
        System.out.println("@@@@@@@");
        return new ResponseEntity<String>( HttpStatus.OK);
    }

    /**
     * 이메일 인증 : 사용자 등록
     *
     * @param userId
     * @param authKey
     * @return sendMail
     * @throws Exception
     */
//    @GetMapping(value = "/signup/confirm")
//    public ResponseEntity<Object> signupAuth(HttpServletResponse response,
//                                             HttpServletRequest httpServletRequest, @RequestParam(value = "userId", required = true) String userId,
//                                             @RequestParam(value = "authKey", required = true) String authKey) throws Exception {
//        KfashionEmailAuthority authMail = new KfashionEmailAuthority();
//        authMail.setUserId(userId);
//        authMail.setAuthKey(authKey);
//        response.sendRedirect("http://localhost:80/sign/success");
//        return taggingUserService.signupAuthMailVerify(authMail);
//    }

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

    /**
     * 회원가입 인증 완료 후 그룹 넘버 없는 회원 리스트 출력
     *
     * @param httpRequest
     * @return List
     * @throws Exception
     */
//
//    @GetMapping(value = "/userList")
//    public ResponseEntity<Object> userList(HttpServletRequest httpRequest) throws Exception {
//        HashMap<String, Object> resultMap = new HashMap<String, Object>();
//        List<KfashionUserInfo> userList = taggingUserService.selectUserList();
//        resultMap.put("userList", userList);
//        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
//    }

//    /**
//     * 그룹 지정된 회원 리스트
//     *
//     * @param httpRequest
//     * @return List
//     * @throws Exception
//     */
//    @GetMapping(value = "/groupUserList")
//    public ResponseEntity<Object> groupUserList(HttpServletRequest httpRequest,
//                                                @RequestParam(value = "groupNo", required = true) int groupNo) throws Exception {
//        HashMap<String, Object> resultMap = new HashMap<String, Object>();
//        List<String> adminIdList = kfashionUserGroupAdminService.selectGroupAdminId(groupNo);
//        Map<String, Object> adminMap = new HashMap<>();
//        adminMap.put("groupNo", groupNo);
//        adminMap.put("adminIdList", adminIdList);
//
//        List<KfashionUserInfo> groupUserList = kfashionUserInfoService.selectGroupUserList(adminMap);
//        resultMap.put("groupUserList", groupUserList);
//        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
//    }

    /**
     * 그룹 지정된 회원 리스트
     *
     * @param httpRequest
     * @return List
     * @throws Exception
     */
//    @GetMapping(value = "/groupUserList")
//    public ResponseEntity<Object> testUserList(HttpServletRequest httpRequest,
//                                                @RequestParam(value = "groupNo", required = true) int groupNo,
//                                                @RequestParam(value="pageSize",required = true,defaultValue = "10") int pageSize,
//                                                @RequestParam(value="page",required =  true,defaultValue = "0")int page,
//                                                @RequestParam(value = "keyword",required = true, defaultValue = "")String keyword) throws Exception {
//        HashMap<String, Object> resultMap = new HashMap<String, Object>();
//        int startPage = page * pageSize;
//        List<String> adminIdList = kfashionUserGroupAdminService.selectGroupAdminId(groupNo);
//        Map<String, Object> adminMap = new HashMap<>();
//        adminMap.put("pageSize",pageSize);
//        adminMap.put("startPage",startPage);
//        adminMap.put("groupNo", groupNo);
//        adminMap.put("keyword",keyword);
//        adminMap.put("adminIdList", adminIdList);
//
//        List<KfashionUserInfo> groupUserList = taggingUserService.selectGroupUserList(adminMap);
//        Map<String, Object> totalMap = new HashMap<>();
//        totalMap.put("groupNo", groupNo);
//        totalMap.put("adminIdList", adminIdList);
//        totalMap.put("keyword",keyword);
//        long totalCount = taggingUserService.selectGroupUserListTotal(totalMap);
//        resultMap.put("groupUserList", groupUserList);
//        resultMap.put("page", page);
//        resultMap.put("pageSize", pageSize);
//        resultMap.put("totalCount", totalCount);
//
//        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
//    }

    /**
     * 그룹 지정된 회원 리스트
     *
     * @param httpServletRequest
     * @return List
     * @throws Exception
     */
//
//    @PostMapping(value = "/createGroupUser")
//    public ResponseEntity<Object> createGroupUser(HttpServletRequest httpServletRequest,
//                                                  @RequestBody KfashionUserInfo user) throws Exception {
//        taggingUserService.createGroupUser(user);
//        return new ResponseEntity<Object>(HttpStatus.OK);
//    }

    /**
     * 그룹 유저 탈퇴
     *
     * @param httpRequest
     * @param user
     * @return List
     * @throws Exception
     */
//
//    @DeleteMapping("/deleteGroupUser/{id}")
//    public ResponseEntity<Object> deleteGroupUser(HttpServletRequest httpRequest,
//                                                  @RequestBody KfashionUserInfo user) {
//        taggingUserService.deleteGroupUser(user);
//        return new ResponseEntity<Object>(HttpStatus.OK);
//    }

    /**
     * 그룹 어드민 탈퇴
     *
     * @param httpRequest
     * @param user
     * @return List
     * @throws Exception
     */

//    @DeleteMapping("/deleteGroupAdminUser/{id}")
//    public ResponseEntity<Object> deleteGroupAdminUser(HttpServletRequest httpRequest,
//                                                       @RequestBody KfashionUserInfo user) {
//        kfashionEmailAuthorityService.deleteUserId(user);
//        taggingUserService.deleteGroupAdminUser(user);
//        return new ResponseEntity<Object>(HttpStatus.OK);
//    }


//    @PutMapping("/updateGroupUser")
//    public ResponseEntity<Object> updateGroupUser(HttpServletRequest httpRequest,
//                                                       @RequestBody KfashionUserInfo user) {
//        if(user.getPassword() != null) {
//            taggingUserService.updateGroupUser(user);
//        }else {
//            taggingUserService.updateGroupUserName(user);
//        }
//        return new ResponseEntity<Object>("success", HttpStatus.OK);
//    }


}

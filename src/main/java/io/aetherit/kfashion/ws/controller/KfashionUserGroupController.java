package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.model.KfashionUserGroup;
import io.aetherit.kfashion.ws.model.KfashionUserGroupAdmin;
import io.aetherit.kfashion.ws.model.KfashionUserGroupAuthority;
import io.aetherit.kfashion.ws.model.KfashionUserInfo;
import io.aetherit.kfashion.ws.service.KfashionUserGroupAdminService;
import io.aetherit.kfashion.ws.service.KfashionUserGroupAuthorityService;
import io.aetherit.kfashion.ws.service.KfashionUserGroupService;
import io.aetherit.kfashion.ws.service.KfashionUserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.net.URI;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/v1/kfashion/group")
public class KfashionUserGroupController {

        private KfashionUserGroupService kfashionUserGroupService;
        private KfashionUserInfoService kfashionUserInfoService;
        private KfashionUserGroupAdminService kfashionUserGroupAdminService;
        private KfashionUserGroupAuthorityService kfashionUserGroupAuthorityService;

        @Autowired
        public KfashionUserGroupController(KfashionUserGroupService kfashionUserGroupService,
                                           KfashionUserInfoService kfashionUserInfoService,
                                           KfashionUserGroupAdminService kfashionUserGroupAdminService,
                                           KfashionUserGroupAuthorityService kfashionUserGroupAuthorityService) {
            this.kfashionUserGroupService = kfashionUserGroupService;
            this.kfashionUserInfoService = kfashionUserInfoService;
            this.kfashionUserGroupAdminService = kfashionUserGroupAdminService;
            this.kfashionUserGroupAuthorityService = kfashionUserGroupAuthorityService;
        }

        /**
         * 유저그룹 생성
         * @param httpRequest
         * @param userGroup
         * @return
         * @throws Exception
         */

        @PostMapping(value ="/create")
        public ResponseEntity<String> createUserGroup(HttpServletRequest httpServletRequest,
                                                      @RequestBody @Valid KfashionUserGroup userGroup) throws Exception{
            return new ResponseEntity<String>(kfashionUserGroupService.createUserGroup(userGroup), HttpStatus.OK);
        }

        /**
         * 유저그룹 리스트
         * @param httpRequest
         * @return groupList
         * @throws Exception
         */

        @GetMapping (value = "/groupList")
        public ResponseEntity<Object> groupList(HttpServletRequest httpRequest) throws Exception{
            HashMap<String, Object> resultMap = new HashMap<String, Object>();
            List<KfashionUserGroup> groupList = kfashionUserGroupService.selectGroupList();
            resultMap.put("groupList", groupList);
            return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
         }

        /**
         * 유저그룹 지정
         * @param httpRequest
         * @return groupList
         * @throws Exception
         */
         @PostMapping(value ="/updateUser")
         public ResponseEntity<Object> updateUserGroup(HttpServletRequest httpServletRequest,
                                                       @RequestParam(value ="groupNo", required = true) int groupNo,
                                                       @RequestParam(value ="authorityNo", required = true) int authorityNo ,
                                                       @RequestParam(value ="id", required = true) String id) throws Exception{
             kfashionUserInfoService.updateUserGroup(groupNo,id);
             KfashionUserGroupAdmin groupAdmin = new KfashionUserGroupAdmin();
             groupAdmin.setGroupNo(groupNo);
             groupAdmin.setUserId(id);
             kfashionUserGroupAdminService.insertUserAdminGroup(groupAdmin);
             KfashionUserGroupAuthority userGroupAuthority = new KfashionUserGroupAuthority();
             userGroupAuthority.setAuthorityNo(authorityNo);
             userGroupAuthority.setGroupNo(groupNo);
             kfashionUserGroupAuthorityService.insertUserGroupAuthority(userGroupAuthority);
             return new ResponseEntity<Object>(HttpStatus.OK);
         }









}

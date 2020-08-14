package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.model.KfashionUserGroup;
import io.aetherit.kfashion.ws.model.KfashionUserGroupAdmin;
import io.aetherit.kfashion.ws.model.KfashionUserGroupAuthority;
import io.aetherit.kfashion.ws.service.KfashionUserGroupAdminService;
import io.aetherit.kfashion.ws.service.KfashionUserGroupAuthorityService;
import io.aetherit.kfashion.ws.service.KfashionUserGroupService;
import io.aetherit.kfashion.ws.service.KfashionUserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
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
     *
     * @param httpServletRequest
     * @param groupName
     * @param authorityNo
     * @return ResponseEntity
     * @throws Exception
     */

    @PostMapping(value = "/create")
    public ResponseEntity<String> createUserGroup(HttpServletRequest httpServletRequest,
                                                  @RequestParam(value = "groupName", required = true) String groupName,
                                                  @RequestParam(value = "authorityNo", required = true) int authorityNo) throws Exception {
        KfashionUserGroup userGroup = new KfashionUserGroup();
        userGroup.setGroupName(groupName);
        kfashionUserGroupService.createUserGroup(userGroup);
        int groupNo = kfashionUserGroupService.selectGroupNo(userGroup);
        KfashionUserGroupAuthority userGroupAuthority = new KfashionUserGroupAuthority();
        userGroupAuthority.setAuthorityNo(authorityNo);
        userGroupAuthority.setGroupNo(groupNo);

        return new ResponseEntity<String>(kfashionUserGroupAuthorityService.insertUserGroupAuthority(userGroupAuthority), HttpStatus.OK);
    }

    /**
     * 유저그룹 리스트
     *
     * @param httpRequest
     * @return groupList
     * @throws Exception
     */

    @GetMapping(value = "/groupList")
    public ResponseEntity<Object> groupList(HttpServletRequest httpRequest) throws Exception {
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        List<KfashionUserGroup> groupList = kfashionUserGroupService.selectGroupList();
        resultMap.put("groupList", groupList);
        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }

    /**
     * 유저그룹 지정
     *
     * @param httpServletRequest
     * @param groupNo
     * @param id
     * @return groupList
     * @throws Exception
     */
    @PostMapping(value = "/updateUser")
    public ResponseEntity<Object> updateUserGroup(HttpServletRequest httpServletRequest,
                                                  @RequestParam(value = "groupNo", required = true) int groupNo,
                                                  @RequestParam(value = "id", required = true) String id) throws Exception {

        kfashionUserInfoService.updateUserGroup(groupNo, id);
        KfashionUserGroupAdmin groupAdmin = new KfashionUserGroupAdmin();
        groupAdmin.setGroupNo(groupNo);
        groupAdmin.setUserId(id);
        kfashionUserGroupAdminService.insertUserAdminGroup(groupAdmin);
        return new ResponseEntity<Object>("success", HttpStatus.OK);
    }

}

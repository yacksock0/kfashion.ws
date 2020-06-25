package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.model.KfashionCategoryItem;
import io.aetherit.kfashion.ws.model.KfashionUserGroup;
import io.aetherit.kfashion.ws.model.KfashionUserInfo;
import io.aetherit.kfashion.ws.service.KfashionUserGroupAuthorityService;
import io.aetherit.kfashion.ws.service.KfashionUserGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;


@RestController
@RequestMapping("/api/v1/kfashion/group")
public class KfashionUserGroupController {

        private KfashionUserGroupService kfashionUserGroupService;

        @Autowired
        public KfashionUserGroupController(KfashionUserGroupService kfashionUserGroupService) {
            this.kfashionUserGroupService = kfashionUserGroupService;
        }

        @PostMapping(value ="/create")
        public ResponseEntity<String> createUserGroup(HttpServletRequest httpServletRequest, @RequestBody @Valid KfashionUserGroup userGroup) {
            return new ResponseEntity<String>(kfashionUserGroupService.createUserGroup(userGroup), HttpStatus.OK);
        }

        @GetMapping (value = "/groupList")
        public ResponseEntity<Object> groupList(HttpServletRequest httpRequest) {
            HashMap<String, Object> resultMap = new HashMap<String, Object>();
            List<KfashionUserGroup> groupList = kfashionUserGroupService.selectGroupList();
            resultMap.put("groupList", groupList);
            return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }


}

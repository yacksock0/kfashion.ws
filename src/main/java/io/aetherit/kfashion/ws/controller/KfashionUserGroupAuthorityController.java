package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.model.KfashionCategoryItem;
import io.aetherit.kfashion.ws.service.KfashionUserGroupAuthorityService;
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
@RequestMapping("/api/v1/kfashion/userGroupAuthority")
public class KfashionUserGroupAuthorityController {

        private KfashionUserGroupAuthorityService kfashionUserGroupAuthorityService;

        @Autowired
        public KfashionUserGroupAuthorityController(KfashionUserGroupAuthorityService kfashionUserGroupAuthorityService) {
            this.kfashionUserGroupAuthorityService = kfashionUserGroupAuthorityService;
        }

        /**
         * 유저 그룹 권한 리스트
         * @param httpRequest
         * @return userGroupAuthorityList
         * @throws
         */

    @GetMapping(value="/userGroupAuthorityList")
        public ResponseEntity<Object> userGroupAuthorityList(HttpServletRequest httpRequest) {
            HashMap<String, Object> resultMap = new HashMap<String, Object>();
            List<KfashionCategoryItem> userGroupAuthorityList = kfashionUserGroupAuthorityService.selectUserGroupAuthorityList();
            resultMap.put("userGroupAuthorityList", userGroupAuthorityList);
            System.out.println(userGroupAuthorityList);
            return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
        }
}

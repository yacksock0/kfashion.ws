package io.aetherit.kfashion.ws.controller.kMatching;

import io.aetherit.kfashion.ws.model.kMatching.MatchingUser;
import io.aetherit.kfashion.ws.model.kMatching.MatchingUserToken;
import io.aetherit.kfashion.ws.model.kSearching.SearchingUser;
import io.aetherit.kfashion.ws.service.kMatching.MatchingUserService;
import io.aetherit.kfashion.ws.service.kSearching.SearchingUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;

@RestController
@RequestMapping("/api/v1/kMatching/users")
public class MatchingUserController {

    private MatchingUserService matchingUserService;

    @Autowired
    public MatchingUserController(MatchingUserService matchingUserService) {
        this.matchingUserService = matchingUserService;

    }

    /**
     * 사용자 등록
     *
     * @param user
     * @return ResponseEntity
     * @throws Exception
     */
    @PostMapping(value = "/signup")
    public ResponseEntity<String> signUpTagging(HttpServletRequest httpServletRequest, @RequestBody MatchingUser user)
            throws Exception {
        String str = matchingUserService.createNewUser(user);
        return new ResponseEntity<String>(HttpStatus.OK);
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
        MatchingUser user = matchingUserService.selectUserById(id);
        boolean result = false;
        if (user != null) result = true;
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        resultMap.put("result", result);
        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }

}

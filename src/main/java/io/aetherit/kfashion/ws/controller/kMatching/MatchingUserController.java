package io.aetherit.kfashion.ws.controller.kMatching;

import io.aetherit.kfashion.ws.model.kMatching.MatchingUser;
import io.aetherit.kfashion.ws.model.kMatching.MatchingUserToken;
import io.aetherit.kfashion.ws.model.kSearching.SearchingUser;
import io.aetherit.kfashion.ws.service.kMatching.MatchingUserService;
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

    //닉네임중복확인
    @GetMapping(value = "/signupcheck/nickname")
    public ResponseEntity<Object> getNickNameCheckMatching(HttpServletRequest httpRequest, @RequestParam(value = "nickName", required = true) String nickName) throws Exception {
        System.out.println("@@");
        MatchingUser user = matchingUserService.selectUserByNickName(nickName);
        boolean result = false;
        if (user != null) result = true;
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        resultMap.put("result", result);
        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }

    @PostMapping(value = "/find")
    public ResponseEntity<Object> findIdMatching(HttpServletRequest httpRequest, @RequestBody MatchingUser user) throws Exception {
        MatchingUser result = matchingUserService.findMatchingUser(user);
        System.out.println("@@@@@@@@@@" +result);
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        resultMap.put("result", result);
        System.out.println(resultMap);
        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }


    @PostMapping(value = "/nameck")
    public ResponseEntity<Object> nameCkMatchingUser(HttpServletRequest httpRequest, @RequestBody MatchingUser user) throws Exception {
        MatchingUser result = matchingUserService.nameCkMatchingUser(user);
        System.out.println("@@@@@@@@@@" +result);
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        resultMap.put("result", result);
        System.out.println(resultMap);
        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }

    @PostMapping(value = "/changepassword")
    public ResponseEntity<String> changepassword(HttpServletRequest httpRequest, @RequestBody MatchingUser user) throws Exception {
        System.out.println("@@"+user);
        String str = matchingUserService.changePassword(user);
        return new ResponseEntity<String>( HttpStatus.OK);
    }

}

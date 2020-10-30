package io.aetherit.kfashion.ws.controller.kSearching;

import io.aetherit.kfashion.ws.model.kSearching.SearchingUser;
import io.aetherit.kfashion.ws.model.kTagging.TaggingUser;
import io.aetherit.kfashion.ws.service.kSearching.SearchingUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;

@RestController
@RequestMapping("/api/v1/kSearching/users")
public class SearchingUserController {

    private SearchingUserService searchingUserService;

    @Autowired
    public SearchingUserController(SearchingUserService searchingUserService) {
        this.searchingUserService = searchingUserService;

    }

    /**
     * 사용자 등록
     *
     * @param user
     * @return ResponseEntity
     * @throws Exception
     */
    @PostMapping(value = "/signup")
    public ResponseEntity<String> signUpSearching(HttpServletRequest httpServletRequest, @RequestBody SearchingUser user)
            throws Exception {
        String str = searchingUserService.createNewUser(user);
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
        SearchingUser user = searchingUserService.selectUserById(id);
        boolean result = false;
        if (user != null) result = true;
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        resultMap.put("result", result);
        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
//        System.out.println("1111111");
//        return null;
    }

    @PostMapping(value = "/find")
    public ResponseEntity<Object> findIdSearching(HttpServletRequest httpRequest, @RequestBody SearchingUser user) throws Exception {
        SearchingUser result = searchingUserService.findSearchingUser(user);
        System.out.println("@@@@@@@@@@" +result);
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        resultMap.put("result", result);
        System.out.println(resultMap);
        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }


    @PostMapping(value = "/nameck")
    public ResponseEntity<Object> nameCkSearchingUser(HttpServletRequest httpRequest, @RequestBody SearchingUser user) throws Exception {
        SearchingUser result = searchingUserService.nameCkSearchingUser(user);
        System.out.println("@@@@@@@@@@" +result);
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        resultMap.put("result", result);
        System.out.println(resultMap);
        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }


    @PostMapping(value = "/changepassword")
    public ResponseEntity<String> changepassword(HttpServletRequest httpRequest, @RequestBody SearchingUser user) throws Exception {
        System.out.println("@@"+user);
        String str = searchingUserService.changePassword(user);
        return new ResponseEntity<String>( HttpStatus.OK);
    }


}

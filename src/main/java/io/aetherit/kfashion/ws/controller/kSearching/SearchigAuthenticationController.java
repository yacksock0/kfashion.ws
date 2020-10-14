package io.aetherit.kfashion.ws.controller.kSearching;

import io.aetherit.kfashion.ws.exception.CanNotFoundUserException;
import io.aetherit.kfashion.ws.model.kSearching.SearchingSimpleUser;
import io.aetherit.kfashion.ws.model.kSearching.SearchingUserToken;
import io.aetherit.kfashion.ws.model.kTagging.TaggingSimpleUser;
import io.aetherit.kfashion.ws.model.kTagging.TaggingUser;
import io.aetherit.kfashion.ws.model.kTagging.TaggingUserToken;
import io.aetherit.kfashion.ws.service.kSearching.SearchingAuthenticationService;
import io.aetherit.kfashion.ws.service.kTagging.TaggingAuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/v1/kSearching/authentications/")
public class SearchigAuthenticationController {
    private SearchingAuthenticationService authenticationService;

    @Autowired
    public SearchigAuthenticationController(SearchingAuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    /**
     * 로그인
     * @param account
     * @param session
     * @return ResponseEntity
     * @throws
     */

    @PostMapping("/signin")
    public ResponseEntity<SearchingUserToken> getLoginTokenTagging(HttpServletRequest httpRequest, HttpSession session, @RequestBody TaggingUser account) {
        final SearchingUserToken token = authenticationService.getToken(account.getId(), account.getPassword(), session);
        return new ResponseEntity<>(token, HttpStatus.OK);
    }

    /**
     * 로그아웃
     * @param httpRequest
     * @param resp
     * @return ResponseEntity
     * @throws
     */

    @PostMapping("/signout")
    public ResponseEntity logoutTagging(HttpServletRequest httpRequest, HttpServletResponse resp) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null){
            new SecurityContextLogoutHandler().logout(httpRequest, resp, auth);
        }
        return new ResponseEntity(HttpStatus.OK);
    }

    /**
     * 로그인 체크
     * @param httpRequest
     * @return ResponseEntity
     * @throws
     */

    @GetMapping("/signcheck")
    public ResponseEntity<SearchingSimpleUser> checkTagging(HttpServletRequest httpRequest) {
        final SearchingSimpleUser user = authenticationService.getUser();

        if(user == null) {
            throw new CanNotFoundUserException();
        }

        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}

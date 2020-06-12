package io.aetherit.kfashion.ws.controller;

import io.aetherit.kfashion.ws.exception.CanNotFoundUserException;
import io.aetherit.kfashion.ws.model.KfashionSimpleUser;
import io.aetherit.kfashion.ws.model.KfashionUser;
import io.aetherit.kfashion.ws.model.KfashionUserToken;
import io.aetherit.kfashion.ws.service.AuthenticationService;
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
@RequestMapping("/api/v1/authentications/")
public class AuthenticationController {
    private AuthenticationService authenticationService;

    @Autowired
    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signin")
    public ResponseEntity<KfashionUserToken> getLoginToken(HttpServletRequest httpRequest, HttpSession session, @RequestBody KfashionUser account) {
        final KfashionUserToken token = authenticationService.getToken(account.getId(), account.getPassword(), session);

        return new ResponseEntity<>(token, HttpStatus.OK);
    }

    @PostMapping("/signout")
    public ResponseEntity logout(HttpServletRequest httpRequest, HttpServletResponse resp) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth != null){
            new SecurityContextLogoutHandler().logout(httpRequest, resp, auth);
        }

        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/signcheck")
    public ResponseEntity<KfashionSimpleUser> check(HttpServletRequest httpRequest) {
        final KfashionSimpleUser user = authenticationService.getUser();

        if(user == null) {
            throw new CanNotFoundUserException();
        }

        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}

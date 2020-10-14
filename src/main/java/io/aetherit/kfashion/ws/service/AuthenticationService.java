package io.aetherit.kfashion.ws.service;

import io.aetherit.kfashion.ws.model.KfashionSimpleUser;
import io.aetherit.kfashion.ws.model.KfashionUserToken;
import io.aetherit.kfashion.ws.model.kTagging.TaggingSimpleUser;
import io.aetherit.kfashion.ws.model.kTagging.TaggingUserToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;

@Service
public class AuthenticationService {
    private AuthenticationManager authenticationManager;

    @Autowired
    public AuthenticationService(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    public KfashionUserToken getToken(String id, String rawPassword, HttpSession session) {
        final Authentication request = new UsernamePasswordAuthenticationToken(id, rawPassword);
        final Authentication result = authenticationManager.authenticate(request);

        if ((result != null) && (result.isAuthenticated())) {
            SecurityContextHolder.getContext().setAuthentication(result);
        } else {
            return null;
        }

        return KfashionUserToken.builder()
                .token(session.getId())
                .user((KfashionSimpleUser) result.getDetails())
                .build();
    }

    public KfashionSimpleUser getUser() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        return (KfashionSimpleUser) authentication.getDetails();
    }


}

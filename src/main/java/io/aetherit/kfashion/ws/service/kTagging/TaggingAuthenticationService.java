package io.aetherit.kfashion.ws.service.kTagging;

import io.aetherit.kfashion.ws.model.KfashionSimpleUser;
import io.aetherit.kfashion.ws.model.KfashionUserToken;
import io.aetherit.kfashion.ws.model.kTagging.TaggingSimpleUser;
import io.aetherit.kfashion.ws.model.kTagging.TaggingUserToken;
import io.aetherit.kfashion.ws.model.kTagging.TaggingUsernamePasswordAuthenticationToken;
import io.aetherit.kfashion.ws.service.UserAuthenticationProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;

@Service
public class TaggingAuthenticationService {
    private AuthenticationManager authenticationManager;

    @Autowired
    public TaggingAuthenticationService(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    public TaggingUserToken getToken(String id, String rawPassword, HttpSession session) {
        final Authentication request = new TaggingUsernamePasswordAuthenticationToken(id, rawPassword);
        System.out.println("getAuthorities : " +  request.getAuthorities());
        System.out.println("getCredentials : " +  request.getCredentials());
        System.out.println("getDetails : " +  request.getDetails());
        System.out.println("getPrincipal : " +  request.getPrincipal());
        System.out.println("isAuthenticated : " +  request.isAuthenticated());









        final Authentication result = authenticationManager.authenticate(request);

        if ((result != null) && (result.isAuthenticated())) {
            SecurityContextHolder.getContext().setAuthentication(result);
        } else {
            return null;
        }
        return TaggingUserToken.builder()
                .token(session.getId())
                .user((TaggingSimpleUser) result.getDetails())
                .build();
    }

    public TaggingSimpleUser getUser() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (TaggingSimpleUser) authentication.getDetails();
    }


}

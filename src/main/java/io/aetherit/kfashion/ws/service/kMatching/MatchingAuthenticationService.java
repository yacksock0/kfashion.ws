package io.aetherit.kfashion.ws.service.kMatching;

import io.aetherit.kfashion.ws.model.kMatching.MatchingSimpleUser;
import io.aetherit.kfashion.ws.model.kMatching.MatchingUserToken;
import io.aetherit.kfashion.ws.model.kMatching.MatchingUsernamePasswordAuthenticationToken;
import io.aetherit.kfashion.ws.model.kSearching.SearchingSimpleUser;
import io.aetherit.kfashion.ws.model.kSearching.SearchingUserToken;
import io.aetherit.kfashion.ws.model.kSearching.SearchingUsernamePasswordAuthenticationToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;

@Service
public class MatchingAuthenticationService {
    private AuthenticationManager authenticationManager;

    @Autowired
    public MatchingAuthenticationService(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    public MatchingUserToken getToken(String id, String rawPassword, HttpSession session) {
        final Authentication request = new MatchingUsernamePasswordAuthenticationToken(id, rawPassword);
        final Authentication result = authenticationManager.authenticate(request);

        if ((result != null) && (result.isAuthenticated())) {
            SecurityContextHolder.getContext().setAuthentication(result);
        } else {
            return null;
        }

        MatchingUserToken matchingUserToken =
                MatchingUserToken.builder()
                .token(session.getId())
                .user((MatchingSimpleUser) result.getDetails())
                .build();

        return matchingUserToken;
    }

    public MatchingSimpleUser getUser() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (MatchingSimpleUser) authentication.getDetails();
    }


}

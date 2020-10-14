package io.aetherit.kfashion.ws.service.kSearching;

import io.aetherit.kfashion.ws.model.kSearching.SearchingSimpleUser;
import io.aetherit.kfashion.ws.model.kSearching.SearchingUserToken;
import io.aetherit.kfashion.ws.model.kSearching.SearchingUsernamePasswordAuthenticationToken;
import io.aetherit.kfashion.ws.model.kTagging.TaggingSimpleUser;
import io.aetherit.kfashion.ws.model.kTagging.TaggingUserToken;
import io.aetherit.kfashion.ws.model.kTagging.TaggingUsernamePasswordAuthenticationToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;

@Service
public class SearchingAuthenticationService {
    private AuthenticationManager authenticationManager;

    @Autowired
    public SearchingAuthenticationService(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    public SearchingUserToken getToken(String id, String rawPassword, HttpSession session) {
        final Authentication request = new SearchingUsernamePasswordAuthenticationToken(id, rawPassword);

        final Authentication result = authenticationManager.authenticate(request);

        if ((result != null) && (result.isAuthenticated())) {
            SecurityContextHolder.getContext().setAuthentication(result);
        } else {
            return null;
        }
        return SearchingUserToken.builder()
                .token(session.getId())
                .user((SearchingSimpleUser) result.getDetails())
                .build();
    }

    public SearchingSimpleUser getUser() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (SearchingSimpleUser) authentication.getDetails();
    }


}

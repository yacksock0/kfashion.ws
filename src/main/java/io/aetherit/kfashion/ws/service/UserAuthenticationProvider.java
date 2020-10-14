package io.aetherit.kfashion.ws.service;

import io.aetherit.kfashion.ws.model.KfashionSimpleUser;
import io.aetherit.kfashion.ws.model.KfashionUserInfo;
import io.aetherit.kfashion.ws.model.kMatching.MatchingSimpleUser;
import io.aetherit.kfashion.ws.model.kMatching.MatchingUser;
import io.aetherit.kfashion.ws.model.kMatching.MatchingUsernamePasswordAuthenticationToken;
import io.aetherit.kfashion.ws.model.kSearching.SearchingSimpleUser;
import io.aetherit.kfashion.ws.model.kSearching.SearchingUser;
import io.aetherit.kfashion.ws.model.kSearching.SearchingUsernamePasswordAuthenticationToken;
import io.aetherit.kfashion.ws.model.kTagging.TaggingSimpleUser;
import io.aetherit.kfashion.ws.model.kTagging.TaggingUser;
import io.aetherit.kfashion.ws.model.kTagging.TaggingUsernamePasswordAuthenticationToken;
import io.aetherit.kfashion.ws.service.kMatching.MatchingUserService;
import io.aetherit.kfashion.ws.service.kSearching.SearchingUserService;
import io.aetherit.kfashion.ws.service.kTagging.TaggingUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

import java.util.ArrayList;
import java.util.List;

@Component
public class UserAuthenticationProvider implements AuthenticationProvider {
    private KfashionUserInfoService kfashionUserInfoService;
    private PasswordEncoder passwordEncoder;
    private TaggingUserService taggingUserService;
    private SearchingUserService searchingUserService;
    private MatchingUserService matchingUserService;

    @Autowired
    public UserAuthenticationProvider(KfashionUserInfoService kfashionUserInfoService,
                                      PasswordEncoder passwordEncoder,
                                      TaggingUserService taggingUserService,
                                      SearchingUserService searchingUserService,
                                      MatchingUserService matchingUserService) {
        this.kfashionUserInfoService = kfashionUserInfoService;
        this.passwordEncoder = passwordEncoder;
        this.taggingUserService = taggingUserService;
        this.searchingUserService = searchingUserService;
        this.matchingUserService = matchingUserService;
    }


//    @Override
//    public Authentication authenticate(Authentication request) throws AuthenticationException {
//
//        if(request.toString().indexOf("Tagging") != -1){
//            System.out.println("@@@@@@@@@@@@@@@@@@@@@@@");
//            Assert.isInstanceOf(TaggingUsernamePasswordAuthenticationToken.class, request, "Only UsernamePasswordAuthenticationToken is supported");
//
//            TaggingUsernamePasswordAuthenticationToken result = null;
//            final String userId = (String) request.getPrincipal();
//            final String password = (String) request.getCredentials();
//
//            final TaggingUser user = taggingUserService.getUser(userId);
//            if (user == null) {
//                throw new UsernameNotFoundException("Username not found : " + userId);
//            }
//
//            if (user.getUserType() == "USER") {
//                throw new DisabledException("User is not enabled : " + userId);
//            }
//
//            if ((password != null) && (password.length() > 0) && (passwordEncoder.matches(password, user.getPassword()))) {
//                final List<GrantedAuthority> authorities = new ArrayList<>();
//
//
//                result = new TaggingUsernamePasswordAuthenticationToken(userId, password, authorities);
//                result.setDetails(getSimpleUser(user));
//            } else {
//                throw new BadCredentialsException("Bad credentials");
//            }
//
//            return result;
//        }else if(request.toString().indexOf("Searching") != -1){
//            return null;
//        }else if(request.toString().indexOf("Matching") != -1){
//            return null;
//        }else{
//            Assert.isInstanceOf(UsernamePasswordAuthenticationToken.class, request, "Only UsernamePasswordAuthenticationToken is supported");
//
//            UsernamePasswordAuthenticationToken result = null;
//            final String userId = (String) request.getPrincipal();
//            final String password = (String) request.getCredentials();
//
//            final int groupAdmin = kfashionUserInfoService.getGroupUser(userId);
//
//            if (groupAdmin == 1) {
//                final KfashionUserInfo user = kfashionUserInfoService.getAdmin(userId);
//                if (user == null) {
//                    throw new UsernameNotFoundException("Username not found : " + userId);
//                }
//
//                if (user.getIsApproved() == 'N') {
//                    throw new DisabledException("User is not enabled : " + userId);
//                }
//
//                if ((password != null) && (password.length() > 0) && (passwordEncoder.matches(password, user.getPassword()))) {
//                    final List<GrantedAuthority> authorities = new ArrayList<>();
//
//
//                    result = new UsernamePasswordAuthenticationToken(userId, password, authorities);
//                    result.setDetails(getSimpleUser(user));
//                } else {
//                    throw new BadCredentialsException("Bad credentials");
//                }
//
//                return result;
//            } else {
//                final KfashionUserInfo user = kfashionUserInfoService.getUser(userId);
//                if (user == null) {
//                    throw new UsernameNotFoundException("Username not found : " + userId);
//                }
//
//                if (user.getIsApproved() == 'N') {
//                    throw new DisabledException("User is not enabled : " + userId);
//                }
//
//                if ((password != null) && (password.length() > 0) && (passwordEncoder.matches(password, user.getPassword()))) {
//                    final List<GrantedAuthority> authorities = new ArrayList<>();
//
//
//                    result = new UsernamePasswordAuthenticationToken(userId, password, authorities);
//                    result.setDetails(getSimpleUser(user));
//                } else {
//                    throw new BadCredentialsException("Bad credentials");
//                }
//
//                return result;
//            }
//        }
//    }

    @Override
    public Authentication authenticate(Authentication request) throws AuthenticationException {
        if(request instanceof TaggingUsernamePasswordAuthenticationToken){
            return authenticateTagging(request);
        }else if(request instanceof SearchingUsernamePasswordAuthenticationToken){
            return authenticateSearching(request);
        }else if(request instanceof MatchingUsernamePasswordAuthenticationToken){
            return authenticateMatching(request);
        }else{
            return authenticateKfashion(request);
        }
    }




    // KFshion --
    private Authentication authenticateKfashion(Authentication request) throws AuthenticationException {
        Assert.isInstanceOf(UsernamePasswordAuthenticationToken.class, request, "Only UsernamePasswordAuthenticationToken is supported");

        UsernamePasswordAuthenticationToken result = null;
        final String userId = (String) request.getPrincipal();
        final String password = (String) request.getCredentials();

        final int groupAdmin = kfashionUserInfoService.getGroupUser(userId);

        if (groupAdmin == 1) {
            final KfashionUserInfo user = kfashionUserInfoService.getAdmin(userId);
            if (user == null) {
                throw new UsernameNotFoundException("Username not found : " + userId);
            }

            if (user.getIsApproved() == 'N') {
                throw new DisabledException("User is not enabled : " + userId);
            }
            if ((password != null) && (password.length() > 0) && (passwordEncoder.matches(password, user.getPassword()))) {
                final List<GrantedAuthority> authorities = new ArrayList<>();
                result = new UsernamePasswordAuthenticationToken(userId, password, authorities);
                result.setDetails(getSimpleUser(user));
            } else {
                throw new BadCredentialsException("Bad credentials");
            }

            return result;
        } else {
            final KfashionUserInfo user = kfashionUserInfoService.getUser(userId);
            if (user == null) {
                throw new UsernameNotFoundException("Username not found : " + userId);
            }

            if (user.getIsApproved() == 'N') {
                throw new DisabledException("User is not enabled : " + userId);
            }

            if ((password != null) && (password.length() > 0) && (passwordEncoder.matches(password, user.getPassword()))) {
                final List<GrantedAuthority> authorities = new ArrayList<>();
                result = new UsernamePasswordAuthenticationToken(userId, password, authorities);
                result.setDetails(getSimpleUser(user));
            } else {
                throw new BadCredentialsException("Bad credentials");
            }
            return result;
        }
    }

    // kTagging --
    private Authentication authenticateTagging(Authentication request) throws AuthenticationException {
            Assert.isInstanceOf(TaggingUsernamePasswordAuthenticationToken.class, request, "Only UsernamePasswordAuthenticationToken is supported");
            TaggingUsernamePasswordAuthenticationToken result = null;
            final String userId = (String) request.getPrincipal();
            final String password = (String) request.getCredentials();

            final TaggingUser user = taggingUserService.getUser(userId);
            if (user == null) {
                throw new UsernameNotFoundException("Username not found : " + userId);
            }
            if (user.getUserType() == "USER") {
                throw new DisabledException("User is not enabled : " + userId);
            }
            if ((password != null) && (password.length() > 0) && (passwordEncoder.matches(password, user.getPassword()))) {
                final List<GrantedAuthority> authorities = new ArrayList<>();

                result = new TaggingUsernamePasswordAuthenticationToken(userId, password, authorities);
                result.setDetails(getSimpleUser(user));
            } else {
                throw new BadCredentialsException("Bad credentials");
            }
            return result;
    }

    // kSearching --
    private Authentication authenticateSearching(Authentication request) throws AuthenticationException {
        Assert.isInstanceOf(SearchingUsernamePasswordAuthenticationToken.class, request, "Only UsernamePasswordAuthenticationToken is supported");
        SearchingUsernamePasswordAuthenticationToken result = null;
        final String userId = (String) request.getPrincipal();
        final String password = (String) request.getCredentials();

        final SearchingUser user = searchingUserService.getUser(userId);
        if (user == null) {
            throw new UsernameNotFoundException("Username not found : " + userId);
        }
        if (user.getUserType() == "USER") {
            throw new DisabledException("User is not enabled : " + userId);
        }
        if ((password != null) && (password.length() > 0) && (passwordEncoder.matches(password, user.getPassword()))) {
            final List<GrantedAuthority> authorities = new ArrayList<>();
            result = new SearchingUsernamePasswordAuthenticationToken(userId, password, authorities);
            result.setDetails(getSimpleUser(user));
        } else {
            throw new BadCredentialsException("Bad credentials");
        }

        return result;
    }
    // kMatching --
    private Authentication authenticateMatching(Authentication request) throws AuthenticationException {
        Assert.isInstanceOf(MatchingUsernamePasswordAuthenticationToken.class, request, "Only UsernamePasswordAuthenticationToken is supported");
        MatchingUsernamePasswordAuthenticationToken result = null;
        final String userId = (String) request.getPrincipal();
        final String password = (String) request.getCredentials();

        final MatchingUser user =  matchingUserService.getUser(userId);
        if (user == null) {
            throw new UsernameNotFoundException("Username not found : " + userId);
        }
        if (user.getUserType() == "USER") {
            throw new DisabledException("User is not enabled : " + userId);
        }
        if ((password != null) && (password.length() > 0) && (passwordEncoder.matches(password, user.getPassword()))) {
            final List<GrantedAuthority> authorities = new ArrayList<>();
            result = new MatchingUsernamePasswordAuthenticationToken(userId, password, authorities);
            result.setDetails(getSimpleUser(user));
        } else {
            throw new BadCredentialsException("Bad credentials");
        }

        return result;
    }





    @Override
    public boolean supports(Class<?> aClass) {
        return UsernamePasswordAuthenticationToken.class.isAssignableFrom(aClass);
    }


    private KfashionSimpleUser getSimpleUser(KfashionUserInfo user) {
        return KfashionSimpleUser.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .isAdmin(user.getIsAdmin())
                .isApproved(user.getIsApproved())
                .groupNo(user.getGroupNo())
                .authorityNo(user.getAuthorityNo())
                .groupAdmin(user.getGroupAdmin())
                .createdDatetime(user.getCreatedDatetime())
                .updatedDatetime(user.getUpdatedDatetime())
                .build();
    }

    private TaggingSimpleUser getSimpleUser(TaggingUser user) {
        return TaggingSimpleUser.builder()
                .id(user.getId())
                .name(user.getName())
                .userType(user.getUserType())
                .isPoll(user.getIsPoll())
                .createdDatetime(user.getCreatedDatetime())
                .updatedDatetime(user.getUpdatedDatetime())
                .build();
    }

    private SearchingSimpleUser getSimpleUser(SearchingUser user) {
        return SearchingSimpleUser.builder()
                .id(user.getId())
                .name(user.getName())
                .userType(user.getUserType())
                .isPoll(user.getIsPoll())
                .createdDatetime(user.getCreatedDatetime())
                .updatedDatetime(user.getUpdatedDatetime())
                .build();
    }

    private MatchingSimpleUser getSimpleUser(MatchingUser user) {
        return MatchingSimpleUser.builder()
                .id(user.getId())
                .name(user.getName())
                .userType(user.getUserType())
                .isPoll(user.getIsPoll())
                .createdDatetime(user.getCreatedDatetime())
                .updatedDatetime(user.getUpdatedDatetime())
                .build();
    }
}

package io.aetherit.kfashion.ws.service;

import io.aetherit.kfashion.ws.model.KfashionUserInfo;
import io.aetherit.kfashion.ws.repository.KfashionUserInfoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class KfashionUserInfoService {

    private static final Logger logger = LoggerFactory.getLogger(KfashionUserInfoService.class);

    private static final String DEFAULT_ADMIN_ID = "admin";
    private static final String DEFAULT_ADMIN_PASSWORD = "1234";
    private static final String DEFAULT_ADMIN_NAME = "administrator";
    private static final Map<String, Boolean> notAcceptableIdMap = new HashMap<>();

    static {
        notAcceptableIdMap.put("check", false);
        notAcceptableIdMap.put("signin", false);
        notAcceptableIdMap.put("signout", false);
        notAcceptableIdMap.put("signcheck", false);
        notAcceptableIdMap.put("login", false);
        notAcceptableIdMap.put("logout", false);
        notAcceptableIdMap.put("logincheck", false);
    }
    private KfashionUserInfoRepository repository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public KfashionUserInfoService(KfashionUserInfoRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostConstruct
    public void checkAdmin() {
        boolean checkAdmin = (true);
        final List<KfashionUserInfo> users = getUsers(true);

        if((users == null) || (users.size() < 1)) {
            logger.info("Admin account not exists : create a default admin account");

            final KfashionUserInfo newAdmin = KfashionUserInfo.builder()
                    .id(DEFAULT_ADMIN_ID)
                    .password(DEFAULT_ADMIN_PASSWORD)
                    .name(DEFAULT_ADMIN_NAME)
                    .isAdmin(true)
                    .isApproved(true)
                    .build();

            createNewUser(newAdmin);
        }
    }


    public String createNewUser(KfashionUserInfo user) {
        String msg="";
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        repository.createNewUser(user);
        int sucess =repository.checkUser(user);
        if(sucess == 1) {
            msg = "success";
            return msg;
        }else {
            msg = "fail";
            return msg;
        }
    }

    public KfashionUserInfo getUser(String id) {
        return repository.selectUser(id);
    }

    private boolean isNotAcceptableId(String id) {
        boolean isNotAcceptable = false;

        if((id == null) || (id.length() < 1) || (id.contains(" ")) || (notAcceptableIdMap.containsKey(id.toLowerCase()))) {
            isNotAcceptable = true;
        }

        return isNotAcceptable;
    }

    public List<KfashionUserInfo> getUsers(boolean checkAdmin) {
        return repository.selectUsers(checkAdmin);
    }

    public KfashionUserInfo selectUserById(String id) {
        return repository.selectUserById(id);
    }

    public KfashionUserInfo selectUserByEmail(String email) {
        return repository.selectUserByEmail(email);
    }
}

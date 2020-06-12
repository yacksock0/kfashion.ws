package io.aetherit.kfashion.ws.service;

import io.aetherit.kfashion.ws.exception.NotAcceptableIdException;
import io.aetherit.kfashion.ws.model.KfashionUser;
import io.aetherit.kfashion.ws.model.support.KfashionUserType;
import io.aetherit.kfashion.ws.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

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

    private UserRepository repository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostConstruct
    public void checkAdmin() {
        final List<KfashionUser> users = getUsers(KfashionUserType.Admin);

        if((users == null) || (users.size() < 1)) {
            logger.info("Admin account not exists : create a default admin account");

            final KfashionUser newAdmin = KfashionUser.builder()
                    .id(DEFAULT_ADMIN_ID)
                    .password(DEFAULT_ADMIN_PASSWORD)
                    .name(DEFAULT_ADMIN_NAME)
                    .type(KfashionUserType.Admin)
                    .isEnabled(true)
                    .build();

            createNewUser(newAdmin);
        }
    }

    public KfashionUser getUser(String id) {
        return repository.selectUser(id);
    }

    public List<KfashionUser> getUsers(KfashionUserType type) {
        return repository.selectUsers(type);
    }

    public KfashionUser createNewUser(KfashionUser user) {
        if(isNotAcceptableId(user.getId())) {
            throw new NotAcceptableIdException(user.getId());
        }
        final String encodedPassword = passwordEncoder.encode(user.getPassword());

        user.setPassword(encodedPassword);
        user.setCreatedDatetime(LocalDateTime.now());
        user.setUpdatedDatetime(LocalDateTime.now());

        repository.insertUser(user);

        return user;
    }

    private boolean isNotAcceptableId(String id) {
        boolean isNotAcceptable = false;

        if((id == null) || (id.length() < 1) || (id.contains(" ")) || (notAcceptableIdMap.containsKey(id.toLowerCase()))) {
            isNotAcceptable = true;
        }

        return isNotAcceptable;
    }
}

package io.aetherit.kfashion.ws.service.kMatching;

import io.aetherit.kfashion.ws.model.kMatching.MatchingUser;
import io.aetherit.kfashion.ws.model.kSearching.SearchingUser;
import io.aetherit.kfashion.ws.repository.kMatching.MatchingUserRepository;
import io.aetherit.kfashion.ws.repository.kSearching.SearchingUserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MatchingUserService {

    private static final Logger logger = LoggerFactory.getLogger(MatchingUserService.class);

    private static final String DEFAULT_ADMIN_ID = "admin";
    private static final String DEFAULT_ADMIN_PASSWORD = "fashion@1";
    private static final String DEFAULT_ADMIN_NAME = "admin";
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

    private MatchingUserRepository repository;
    private PasswordEncoder passwordEncoder;
    private JavaMailSender mailSender;

    @Autowired
    public MatchingUserService(MatchingUserRepository repository,
                               PasswordEncoder passwordEncoder,
                               JavaMailSender mailSender) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.mailSender = mailSender;
    }

    @PostConstruct
    public void checkAdmin() {
        String userType = "admin";
        final List<MatchingUser> users = getUsers(userType);

        if ((users == null) || (users.size() < 1)) {
            logger.info("Admin account not exists : create a default admin account");

            final MatchingUser newAdmin = MatchingUser.builder()
                    .id(DEFAULT_ADMIN_ID)
                    .password(passwordEncoder.encode(DEFAULT_ADMIN_PASSWORD))
                    .name(DEFAULT_ADMIN_NAME)
                    .userType("admin")
                    .isPoll("Y")
                    .build();

            createNewAdmin(newAdmin);
        }
    }

    public void createNewAdmin(MatchingUser user) {
        repository.createNewUser(user);
    }


    @Transactional
    public String createNewUser(MatchingUser user) throws Exception {
        String msg = "";
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        repository.createNewUser(user);
        return msg;
    }

    public List<MatchingUser> getUsers(String userType) {
        return repository.selectUsers(userType);
    }


    public MatchingUser getUser(String id) {
        return repository.selectUser(id);
    }

    public MatchingUser getAdmin(String userId) {
        return repository.selectAdmin(userId);
    }

    private boolean isNotAcceptableId(String id) {
        boolean isNotAcceptable = false;

        if ((id == null) || (id.length() < 1) || (id.contains(" ")) || (notAcceptableIdMap.containsKey(id.toLowerCase()))) {
            isNotAcceptable = true;
        }

        return isNotAcceptable;
    }

    public MatchingUser selectUserById(String id) {
        return repository.selectUserById(id);
    }
    public MatchingUser findMatchingUser (MatchingUser user) {
        return repository.findMatchingUser(user);
    }

}

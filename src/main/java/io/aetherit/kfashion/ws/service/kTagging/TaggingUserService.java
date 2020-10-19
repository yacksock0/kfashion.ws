package io.aetherit.kfashion.ws.service.kTagging;

import io.aetherit.kfashion.ws.model.kTagging.TaggingUser;
import io.aetherit.kfashion.ws.repository.KfashionEmailAuthorityRepository;
import io.aetherit.kfashion.ws.repository.kTagging.TaggingUserRepository;
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
public class TaggingUserService {

    private static final Logger logger = LoggerFactory.getLogger(TaggingUserService.class);

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

    private TaggingUserRepository repository;
    private PasswordEncoder passwordEncoder;
    private JavaMailSender mailSender;
    private KfashionEmailAuthorityRepository kfashionEmailAuthorityRepository;

    @Autowired
    public TaggingUserService(TaggingUserRepository repository,
                              PasswordEncoder passwordEncoder,
                              JavaMailSender mailSender,
                              KfashionEmailAuthorityRepository kfashionEmailAuthorityRepository) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.mailSender = mailSender;
        this.kfashionEmailAuthorityRepository = kfashionEmailAuthorityRepository;
    }

    @PostConstruct
    public void checkAdmin() {
        String userType = "admin";
        final List<TaggingUser> users = getUsers(userType);

        if ((users == null) || (users.size() < 1)) {
            logger.info("Admin account not exists : create a default admin account");

            final TaggingUser newAdmin = TaggingUser.builder()
                    .id(DEFAULT_ADMIN_ID)
                    .password(passwordEncoder.encode(DEFAULT_ADMIN_PASSWORD))
                    .name(DEFAULT_ADMIN_NAME)
                    .userType("admin")
                    .isPoll("Y")
                    .build();

            createNewAdmin(newAdmin);
        }
    }

    public void createNewAdmin(TaggingUser user) {
        repository.createNewUser(user);
    }


    @Transactional
    public String createNewUser(TaggingUser user) throws Exception {
        String msg = "";
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        repository.createNewUser(user);
        return msg;
    }


    public List<TaggingUser> getUsers(String userType) {
        return repository.selectUsers(userType);
    }


    public TaggingUser getUser(String id) {
        return repository.selectUser(id);
    }

    public TaggingUser getAdmin(String userId) {
        return repository.selectAdmin(userId);
    }

    private boolean isNotAcceptableId(String id) {
        boolean isNotAcceptable = false;

        if ((id == null) || (id.length() < 1) || (id.contains(" ")) || (notAcceptableIdMap.containsKey(id.toLowerCase()))) {
            isNotAcceptable = true;
        }

        return isNotAcceptable;
    }

    public TaggingUser selectUserById(String id) {
        return repository.selectUserById(id);
    }
}

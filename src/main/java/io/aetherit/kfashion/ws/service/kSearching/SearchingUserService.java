package io.aetherit.kfashion.ws.service.kSearching;

import io.aetherit.kfashion.ws.model.kSearching.SearchingUser;
import io.aetherit.kfashion.ws.model.kTagging.TaggingUser;
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
public class SearchingUserService {

    private static final Logger logger = LoggerFactory.getLogger(SearchingUserService.class);

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

    private SearchingUserRepository repository;
    private PasswordEncoder passwordEncoder;
    private JavaMailSender mailSender;

    @Autowired
    public SearchingUserService(SearchingUserRepository repository,
                                PasswordEncoder passwordEncoder,
                                JavaMailSender mailSender) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.mailSender = mailSender;
    }

    @PostConstruct
    public void checkAdmin() {
        String userType = "admin";
        final List<SearchingUser> users = getUsers(userType);

        if ((users == null) || (users.size() < 1)) {
            logger.info("Admin account not exists : create a default admin account");

            final SearchingUser newAdmin = SearchingUser.builder()
                    .id(DEFAULT_ADMIN_ID)
                    .password(passwordEncoder.encode(DEFAULT_ADMIN_PASSWORD))
                    .name(DEFAULT_ADMIN_NAME)
                    .userType("admin")
                    .isPoll("Y")
                    .build();

            createNewAdmin(newAdmin);
        }
    }

    public void createNewAdmin(SearchingUser user) {
        repository.createNewUser(user);
    }


    @Transactional
    public String createNewUser(SearchingUser user) throws Exception {
        String msg = "";
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        System.out.println("@@"+user.getPassword());
        repository.createNewUser(user);
        System.out.println(user);
        return msg;
    }

    public List<SearchingUser> getUsers(String userType) {
        return repository.selectUsers(userType);
    }


    public SearchingUser getUser(String id) {
        return repository.selectUser(id);
    }

    public SearchingUser getAdmin(String userId) {
        return repository.selectAdmin(userId);
    }

    private boolean isNotAcceptableId(String id) {
        boolean isNotAcceptable = false;

        if ((id == null) || (id.length() < 1) || (id.contains(" ")) || (notAcceptableIdMap.containsKey(id.toLowerCase()))) {
            isNotAcceptable = true;
        }

        return isNotAcceptable;
    }

    public SearchingUser selectUserById(String id) {
        return repository.selectUserById(id);
    }
    public SearchingUser findSearchingUser(SearchingUser user) {
        return repository.findSearchingUser(user);
    }
}

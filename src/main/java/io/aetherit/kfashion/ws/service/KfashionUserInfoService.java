package io.aetherit.kfashion.ws.service;

import io.aetherit.kfashion.ws.model.KfashionEmailAuthority;
import io.aetherit.kfashion.ws.model.KfashionUserInfo;
import io.aetherit.kfashion.ws.repository.KfashionEmailAuthorityRepository;
import io.aetherit.kfashion.ws.repository.KfashionUserInfoRepository;
import io.aetherit.kfashion.ws.util.MailUtils;
import io.aetherit.kfashion.ws.util.TempKey;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class KfashionUserInfoService {

    private static final Logger logger = LoggerFactory.getLogger(KfashionUserInfoService.class);

    private static final String DEFAULT_ADMIN_ID = "admin";
    private static final String DEFAULT_ADMIN_PASSWORD = "fashion@1";
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
    private JavaMailSender mailSender;
    private KfashionEmailAuthorityRepository kfashionEmailAuthorityRepository;

    @Autowired
    public KfashionUserInfoService(KfashionUserInfoRepository repository,
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
        char isAdmin = 'Y';
        final List<KfashionUserInfo> users = getUsers(isAdmin);

        if ((users == null) || (users.size() < 1)) {
            logger.info("Admin account not exists : create a default admin account");

            final KfashionUserInfo newAdmin = KfashionUserInfo.builder()
                    .id(DEFAULT_ADMIN_ID)
                    .password(passwordEncoder.encode(DEFAULT_ADMIN_PASSWORD))
                    .name(DEFAULT_ADMIN_NAME)
                    .isAdmin('Y')
                    .isApproved('Y')
                    .build();

            createNewAdmin(newAdmin);
        }
    }

    public void createNewAdmin(KfashionUserInfo user) {
        repository.createNewUser(user);
    }


    @Transactional
    public String createNewUser(KfashionUserInfo user) throws Exception {
        String msg = "";
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        repository.createNewUser(user);

        String authKey = new TempKey().getKey(30, false);
        KfashionEmailAuthority emailAuthority = new KfashionEmailAuthority();
        emailAuthority.setUserId(user.getId());
        emailAuthority.setAuthKey(authKey);
        kfashionEmailAuthorityRepository.insertAuthkey(emailAuthority);


        // mail 작성 관련
        MailUtils sendMail = new MailUtils(mailSender);

        sendMail.setSubject("[Kfashion] 회원가입 이메일 인증");
        sendMail.setText(new StringBuffer().append("<h1>[이메일 인증]</h1>")
                .append("<p>아래 링크를 클릭하시면 이메일 인증이 완료됩니다.</p>")
                .append("<a href='http://localhost:80/api/v1/kfashion/users/signup/confirm?userId=")
                .append(user.getId())
                .append("&authKey=")
                .append(authKey)
                .append("' target='_blenk'>이메일 인증 확인</a>")
                .toString());
        sendMail.setFrom("yeol6845@gmail.com", "장성열");
        sendMail.setTo(user.getEmail());
        sendMail.send();
        msg = "인증 메일이 발송 되었 습니다.";
        return msg;
    }

    /**
     * 사용자 등록 인증메일 검증
     *
     * @param authMail
     * @return
     * @throws Exception
     */
    public ResponseEntity<Object> signupAuthMailVerify(KfashionEmailAuthority authMail) throws Exception {
        String msg = "";
        try {
            String id = kfashionEmailAuthorityRepository.selectCheckAuthMail(authMail);
            if (id != null) {
                kfashionEmailAuthorityRepository.updateAuthority(authMail);
                repository.updateAuthUser(id);
                URI redirectUri = new URI("http://localhost:80/sign/success");
                HttpHeaders httpHeaders = new HttpHeaders();
                httpHeaders.setLocation(redirectUri);
                return new ResponseEntity<Object>(httpHeaders, HttpStatus.SEE_OTHER);
            } else {
                URI redirectUri = new URI("http://localhost:80/sign/fail");
                HttpHeaders httpHeaders = new HttpHeaders();
                httpHeaders.setLocation(redirectUri);
                return new ResponseEntity<Object>(httpHeaders, HttpStatus.NOT_FOUND);
            }

        } catch (Exception e) {
            e.printStackTrace();
            URI redirectUri = new URI("http://localhost:80/sign/fail");
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.setLocation(redirectUri);
            return new ResponseEntity<Object>(httpHeaders, HttpStatus.NOT_FOUND);
        }

    }


    public KfashionUserInfo getUser(String id) {
        return repository.selectUser(id);
    }

    public KfashionUserInfo getAdmin(String userId) {
        return repository.selectAdmin(userId);
    }

    private boolean isNotAcceptableId(String id) {
        boolean isNotAcceptable = false;

        if ((id == null) || (id.length() < 1) || (id.contains(" ")) || (notAcceptableIdMap.containsKey(id.toLowerCase()))) {
            isNotAcceptable = true;
        }

        return isNotAcceptable;
    }

    public List<KfashionUserInfo> getUsers(char isAdmin) {
        return repository.selectUsers(isAdmin);
    }

    public KfashionUserInfo selectUserById(String id) {
        return repository.selectUserById(id);
    }

    public KfashionUserInfo selectUserByEmail(String email) {
        return repository.selectUserByEmail(email);
    }

    public List<KfashionUserInfo> selectUserList() {
        return repository.selectUserList();
    }

    public void updateUserGroup(int groupNo, String id) {
        repository.updateUserGroup(groupNo, id);
    }

    public List<KfashionUserInfo> selectGroupUserList(Map<String, Object> adminMap) {
        return repository.selectGroupUserList(adminMap);
    }

    public void createGroupUser(KfashionUserInfo user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        repository.createGroupUser(user);
    }

    public void deleteGroupUser(KfashionUserInfo user) {
        repository.deleteGroupUser(user);
    }

    public void deleteGroupAdminUser(KfashionUserInfo user) {
        repository.deleteGroupAdminUser(user);
    }

    public int getGroupUser(String userId) {
        return repository.getGroupUser(userId);
    }


    public void updateGroupUser(KfashionUserInfo user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        repository.updateGroupUser(user);
    }

    public void updateGroupUserName(KfashionUserInfo user) {
        repository.updateGroupUserName(user);
    }

    public long selectGroupUserListTotal(Map<String, Object> totalMap) {
        return repository.selectGroupUserListTotal(totalMap);
    }
}

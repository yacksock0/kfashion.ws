package io.aetherit.kfashion.ws.service;

import com.amazonaws.services.simpleemail.AmazonSimpleEmailService;
import com.amazonaws.services.simpleemail.model.*;
import io.aetherit.kfashion.ws.configuration.support.LiveServerProperties;
import io.aetherit.kfashion.ws.exception.NotAcceptableIdException;
import io.aetherit.kfashion.ws.model.*;
import io.aetherit.kfashion.ws.model.support.KfashionServerMode;
import io.aetherit.kfashion.ws.model.support.KfashionUserStatus;
import io.aetherit.kfashion.ws.model.support.KfashionUserType;
import io.aetherit.kfashion.ws.repository.KfashionUserRepository;
import io.aetherit.kfashion.ws.util.AES256Util;
import io.aetherit.kfashion.ws.util.CommonUtil;
import io.aetherit.kfashion.ws.util.MailTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class KfashionUserService {

    private LiveServerProperties liveServerProperties;

//    private static final long DEFAULT_ADMIN_ID = 99999999;
//    private static final String DEFAULT_ADMIN_EMAIL = "admin@onthe.live";
//    private static final String DEFAULT_ADMIN_PASSWORD = "1234";
//    private static final String DEFAULT_ADMIN_NAME = "administrator";
    private static final String senderEmail = "support@onthe.live";
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


    private KfashionUserRepository kfashionuserRepository;
    private PasswordEncoder passwordEncoder;


    @Autowired
    private MailTemplate mailTemplate;

    @Autowired
    private AES256Util aesUtil;

    @Autowired
    private CommonUtil commonUtil;

    @Autowired
    public KfashionUserService(KfashionUserRepository kfashionuserRepository,PasswordEncoder passwordEncoder,LiveServerProperties liveServerProperties) {
        this.passwordEncoder = passwordEncoder;
        this.kfashionuserRepository = kfashionuserRepository;
        this.liveServerProperties = liveServerProperties;
    }
//    @PostConstruct
//    public void checkAdmin() {
//        final List<KfashionUser> users = getUsers(KfashionUserType.ADMIN);
//
//        if((users == null) || (users.size() < 1)) {
//
//            final KfashionUser newAdmin = KfashionUser.builder()
//                    .userId(DEFAULT_ADMIN_ID)
//                    .email(DEFAULT_ADMIN_EMAIL)
//                    .password(passwordEncoder.encode(DEFAULT_ADMIN_PASSWORD))
//                    .userName(DEFAULT_ADMIN_NAME)
//                    .typeCode(KfashionUserType.ADMIN)
//                    .statusCode(KfashionUserStatus.NORMAL)
//                    .build();
//
//            try {
//                kfashionuserRepository.insertUser(newAdmin);
//            } catch (Exception e) {
//                // TODO Auto-generated catch block
//                e.printStackTrace();
//            }
//        }
//    }

    public KfashionSimpleUser getUser(long userId) {
        KfashionUser user = kfashionuserRepository.selectUser(userId);
        KfashionUserProfile userProfile = kfashionuserRepository.selectUserProfile(userId);
        return KfashionSimpleUser.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .userName(user.getUserName())
                .nickName(kfashionuserRepository.selectUserNickName(user.getUserId()))
                .typeCode(user.getTypeCode())
                .profileUrl(userProfile==null?"":userProfile.getProfileImgDomain()+userProfile.getProfileImgPath())
                .recordFlag(user.isRecordFlag())
                .createdDatetime(user.getCreatedDatetime())
                .modifiedDatetime(user.getModifiedDatetime())
                .build();

    }

    /**
     * 사용자 목록 조회 : 전체
     * @param type
     * @return
     */
    public List<KfashionUser> getUsers(KfashionUserType type) {
        return kfashionuserRepository.selectUsers(type);
    }


    public KfashionUser getUserByEmail(String email) {
        return kfashionuserRepository.selectUserByEmail(email);
    }

    public KfashionUser getUserByNickName(String nickName) {
        return kfashionuserRepository.selectUserByNickName(nickName);
    }

    /**
     * 신규 사용자 생성 및 인증 메일 요청
     * @param user
     * @return
     * @throws Exception
     */
    public String createNewUser(KfashionUser user) throws Exception {
        if(isNotAcceptableId(user.getEmail())) {
            throw new NotAcceptableIdException(user.getEmail());
        }

        KfashionUser signUpUser = getUserByEmail(user.getEmail());
        KfashionUser signUpNickNameUser = getUserByNickName(user.getNickName());
        if(signUpUser == null && signUpNickNameUser == null) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setStatusCode(KfashionUserStatus.SLEEP);
            user.setTypeCode(KfashionUserType.USER);
            user.setAvailablePoint(10010000);				// 임시로 10,010,000 point 지급
            kfashionuserRepository.insertUser(user);

            return sendAuthMail(user);
        }else {
            if(signUpUser.getStatusCode()==KfashionUserStatus.SLEEP) {
                throw new DisabledException("User is not enabled : " + signUpUser.getEmail());
            }else if(signUpUser.getStatusCode()==KfashionUserStatus.BLOCK) {
                throw new DisabledException("User is blocked : " + signUpUser.getEmail());
            }else if(signUpUser.getStatusCode()==KfashionUserStatus.WITHDRAW) {
                throw new DisabledException("User is withdraw : " + signUpUser.getEmail());
            }else {
                throw new Exception("Already Use Email");
            }
        }
    }

    private boolean isNotAcceptableId(String id) {
        boolean isNotAcceptable = false;

        if((id == null) || (id.length() < 1) || (id.contains(" ")) || (notAcceptableIdMap.containsKey(id.toLowerCase()))) {
            isNotAcceptable = true;
        }

        return isNotAcceptable;
    }



    /**
     * 사용자 등록 인증메일 전송
     * @param user
     * @return
     * @throws Exception
     */
    public String sendAuthMail(KfashionUser user) throws Exception {
        String msg = "";
        String authKey = aesUtil.encrypt(user.getEmail() + ":" + user.getUserId()+"");

        if(liveServerProperties.getMode()== KfashionServerMode.SERVER) {
            msg = "회원가입 요청 완료.. ";
        }else {
            try{
                AmazonSimpleEmailService sesClient = commonUtil.getAwsSesMailCredentials();
                Content subjectContent = new Content("[ONTHELIVE]회원가입 인증"); // 메일 제목
                Content bodyContent = new Content(mailTemplate.authMailTemplate(user.getEmail(), authKey)); // 메일 내용
                Body body = new Body().withHtml(bodyContent);
                Destination destination = new Destination(Arrays.asList(user.getEmail()));  // 받는 사람 이메일
                Message message = new Message(subjectContent, body);

                SendEmailRequest request = new SendEmailRequest()
                        .withSource(senderEmail) // 보내는 사람 이메일 (고정)
                        .withDestination(destination)
                        .withMessage(message);
                sesClient.sendEmail(request);

                msg = "회원가입 성공.. 작성하신 이메일로 인증메일을 전송하였습니다.";
            } catch (Exception ex) {
                System.out.println("The email was not sent. Error message: "
                        + ex.getMessage());
                msg = "회원가입 실패";
            }
        }

        return msg;
    }

    /**
     * 사용자 등록 인증메일 검증
     * @param authMail
     * @return
     * @throws Exception
     */
    public ResponseEntity<String> signupAuthMailVerify(KfashionAuthMail authMail) throws Exception {
        String msg = "";
        String email = authMail.getEmail();
        String authKey = authMail.getAuthKey();
        String[] str = aesUtil.decrypt(authKey).split(":");

        try{
            KfashionUser user = kfashionuserRepository.selectUserByEmail(email);

            if(str[0].equalsIgnoreCase(user.getEmail()) && Long.parseLong(str[1]) == user.getUserId()){
                if(user.getStatusCode()==KfashionUserStatus.SLEEP) {
                    user.setStatusCode(KfashionUserStatus.NORMAL);
                    KfashionUserStatusChange userStatus = KfashionUserStatusChange.builder()
                            .userId(user.getUserId())
                            .statusCode(user.getStatusCode())
                            .build();
                    kfashionuserRepository.updateUserStatus(userStatus);
                    msg = "sucess";
                    return new ResponseEntity<String>(msg, HttpStatus.OK);
                }else if(user.getStatusCode()==KfashionUserStatus.NORMAL){
                    msg = "sucess";
                    return new ResponseEntity<String>(msg, HttpStatus.OK);
                }else {
                    msg = "fail";
                    return new ResponseEntity<String>(msg, HttpStatus.NOT_FOUND);
                }
            }else {
                msg = "fail";
                return new ResponseEntity<String>(msg, HttpStatus.NOT_FOUND);
            }
        }catch(Exception e) {
            e.printStackTrace();
            msg = "fail";
            return new ResponseEntity<String>(msg, HttpStatus.NOT_FOUND);
        }
    }

}

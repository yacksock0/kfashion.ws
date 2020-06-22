//package io.aetherit.kfashion.ws.util;
//
//import io.aetherit.kfashion.ws.configuration.support.EmailSenderProperties;
//import io.aetherit.kfashion.ws.configuration.support.FileStorageProperties;
//import io.aetherit.kfashion.ws.configuration.support.LiveServerProperties;
//import io.aetherit.kfashion.ws.model.KfashionChannel;
//import io.aetherit.kfashion.ws.model.KfashionSimpleUser;
//import io.aetherit.kfashion.ws.model.KfashionUser;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//
//
//
//public class MailTemplate {
//    static final String charset = "utf-8";
//
//
//    @Value("${kfashion.ws.server.protocol}")
//    private String serverPrefix;
//
//    @Autowired
//    private LiveServerProperties serverProperties;
//
//    @Autowired
//    private FileStorageProperties fileStorageProperties;
//
//    @Autowired
//    private EmailSenderProperties emailSenderProperties;
//
////	static final String mailAuthUrl 			= "https://www.onthe.live/certification/email";
////	static final String passwAuthUrl 			= "https://www.onthe.live/certification/password";
////	static final String urlLogoImage 			= "https://files.onthe.live/images/email/logo.png";
////	static final String urlCertificationImage 	= "https://files.onthe.live/images/email/certification.png";
////	static final String urlInviteImage 			= "https://files.onthe.live/images/email/invite.png";
////	static final String urlOrderImage 			= "https://files.onthe.live/images/email/order.png";
////	static final String urlPasswordImage 		= "https://files.onthe.live/images/email/password.png";
////	static final String urlSignUpImage 			= "https://files.onthe.live/images/email/signup.png";
//
//
//    /**
//     * 이메일 인증 메일 템플릿
//     *
//     * @param email
//     * @param authKey
//     * @return
//     */
//    public String authMailTemplate(String email, String authKey) {
//        String urlLogoImage = serverProperties.getProtocol() + fileStorageProperties.getFilesDomain() + emailSenderProperties.getImagePath() + "/" + emailSenderProperties.getLogoImage();
//        String mailAuthUrl = serverProperties.getProtocol() + serverProperties.getDomain() + emailSenderProperties.getMailAuthPath();
//        String urlCertificationImage = serverProperties.getProtocol() + fileStorageProperties.getFilesDomain() + emailSenderProperties.getImagePath() + "/" + emailSenderProperties.getCertificationImage();
//
//        return new StringBuffer()
//                .append("<div style='margin: 0 auto; border: 1px solid #eeeeee; background-color: #ffffff; padding: 40px; text-align: center;width: 800px;'>")
//                .append("<a href=\"" + serverProperties.getProtocol() + serverProperties.getDomain() + "\" target='_blank'><img src=\"" + urlLogoImage + "\"></a>")
//                .append("<h2 style='font-size: 20px; text-align: center; font-weight: bold;'>ONTHELIVE 회원가입을 환영합니다</h2>")
//                .append("<div style='font-size: 14px;font-weight: normal;font-stretch: normal;font-style: normal;line-height: 1.71;letter-spacing: normal;text-align: center;color: #333333;margin: 40px 0;'>")
//                .append("아래 버튼을 클릭하면 이메일 인증이 완료됩니다.<br>인증을 완료 후에 ONTHELIVE의 서비스를 이용하실 수 있습니다.</div>")
//
//                .append("<a href=\"" + mailAuthUrl + "?email=" + email + "&authKey=" + authKey + "\" target=\"_blank\"><img src=\"" + urlCertificationImage + "\" /></a>")
//
//                .append("<a href='' style='opacity: 0.56;font-size: 12px;font-weight: normal;font-stretch: normal;font-style: normal;line-height: 1.5;letter-spacing: normal;text-align: ")
//                .append("left;color: rgba(0, 0, 0, 0.56); margin-top: 30px; display: block;text-align: center;' target='_blank'>인증이 잘 안되시나요?</a>")
//                .append("</div>")
//                .toString();
//    }
//
//
//    /**
//     * 채널 초대 메일 템플릿
//     *
//     * @param user
//     * @param channel
//     * @return
//     */
//    public String inviteMailTemplate(KfashionSimpleUser user, KfashionChannel channel) {
//        String urlLogoImage = serverProperties.getProtocol() + fileStorageProperties.getFilesDomain() + emailSenderProperties.getImagePath() + "/" + emailSenderProperties.getLogoImage();
//        String urlInviteImage = serverProperties.getProtocol() + fileStorageProperties.getFilesDomain() + emailSenderProperties.getImagePath() + "/" + emailSenderProperties.getInviteImage();
//        String urlSignUpImage = serverProperties.getProtocol() + fileStorageProperties.getFilesDomain() + emailSenderProperties.getImagePath() + "/" + emailSenderProperties.getSignupImage();
//
//        return new StringBuffer()
//                .append("<div style=\"margin: 0 auto; border: 1px solid #eeeeee; background-color: #ffffff; padding: 40px; text-align: center;width: 800px;\">")
//                .append("<a href=\"" + serverProperties.getProtocol() + serverProperties.getDomain() + "\" target='_blank'><img src=\"" + urlLogoImage + "\"></a>")
//                .append("<h2 style=\"font-size: 20px; text-align: center; font-weight: bold;\">ONTHELIVE 로 초대합니다</h2>")
//                .append("<div style=\"font-size: 14px;font-weight: normal;font-stretch: normal;font-style: normal;line-height: 1.71;letter-spacing: normal;text-align: center;color: #333333;margin: 40px 0;\">안녕하세요. ONTHELIVE입니다.<br><br>")
//                .append("<b>" + user.getUserName() + "</b>님이 <b>" + channel.getChannelName() + "</b> 라이브로 초대 하셨습니다. <br>")
//                .append("아래 버튼을 클릭하면 초대된 채널로 이동됩니다.</div>")
//
//                .append("<a href=\"" + serverProperties.getProtocol() + serverProperties.getDomain() + "/channel/list\" target=\"_blank\"><img src=\"" + urlInviteImage + "\" /></a>")
//
//                .append("<div style=\"font-size: 14px;font-weight: normal;font-stretch: normal;font-style: normal;line-height: 1.71;letter-spacing: normal;text-align: center;color: #333333;margin: 40px 0;\">")
//                .append("회원이 아니시면 아래 버튼을 클릭하여 회원 가입 후 이용하시기 바랍니다.</div>")
//
//                .append("<a href=\"" + serverProperties.getProtocol() + serverProperties.getDomain() + "/signup\" target=\"_blank\"><img src=\"" + urlSignUpImage + "\" /></a>")
//
//                .append("<div href=\"\" style=\"opacity: 0.56;font-size: 12px;font-weight: normal;font-stretch: normal;font-style: normal;line-height: 1.5;letter-spacing: normal;text-align: ")
//                .append("style=\"width: 180px;height: 48px;box-shadow: 0px 3px 10px 0 rgba(96, 80, 80, 0.45);")
//                .append("left;color: rgba(0, 0, 0, 0.56); margin-top: 30px; display: block;text-align: center;\">본 메일은 라이브 초대를 위한 초대 메일입니다. 회원이 아니시면 채널이용에 제한됩니다.</div>")
//                .append("</div>")
//                .toString();
//    }
//
//    /**
//     * 구매내역 확인 메일 템플릣
//     *
//     * @param totalAmount
//     * @param quantity
//     * @param paymentMethodName
//     * @param paymentDatetime
//     * @return
//     */
//    public String paymentMailTemplate(String totalAmount, String quantity, String paymentMethodName, String paymentDatetime) {
//        String urlLogoImage = serverProperties.getProtocol() + fileStorageProperties.getFilesDomain() + emailSenderProperties.getImagePath() + "/" + emailSenderProperties.getLogoImage();
//        String urlOrderImage = serverProperties.getProtocol() + fileStorageProperties.getFilesDomain() + emailSenderProperties.getImagePath() + "/" + emailSenderProperties.getOrderImage();
//
//        return new StringBuffer()
//                .append("<div style=\"margin: 0 auto; border: 1px solid #eeeeee; background-color: #ffffff; padding: 40px; text-align: center;width: 800px;\">")
//                .append("<a href=\"" + serverProperties.getProtocol() + serverProperties.getDomain() + "\" target='_blank'><img src=\"" + urlLogoImage + "\"></a>")
//                .append("<h2 style=\"font-size: 20px; text-align: center; font-weight: bold;\">이용권 구매 확인</h2>")
//                .append("<div style=\"font-size: 14px;font-weight: normal;font-stretch: normal;font-style: normal;line-height: 1.71;letter-spacing: normal;text-align: ")
//                .append("center;color: #333333;margin: 40px 0;\">입금내역은 <a href=\"\" style=\"font-weight: bold;\">마이페이지</a>에서 확인하실 수 있습니다.</div>")
//                .append("<div style=\"font-size: 18px; text-align: center;border-bottom: 2px solid #333333;padding-bottom: 20px; margin-bottom: 20px; width: 420px; margin: 0 auto 20px;\">결제정보</div>")
//                .append("<div style=\"width: 420px;border-radius: 4px;border: solid 1px #eeeeee;background-color: #ffffff;margin: 0 auto; padding: 24px; box-sizing: border-box; margin-bottom: 30px;\">")
//                .append("<dl style=\"padding-bottom:20px;\">")
//                .append("<dt style=\"font-size: 14px;text-align: left;color: rgba(0, 0, 0, 0.54);float: left;\">총 결제금액</dt>")
//                .append("<dd style=\"font-size: 14px; text-align: right;color: #000000; float: right;\"><b style=\"font-size:18px;color:#c31e1f;\">" + totalAmount + "</b> 원</dd>")
//                .append("</dl>")
//                .append("<dl style=\"clear: both; display: block;\">")
//                .append("<dt style=\"font-size: 14px;text-align: left;color: rgba(0, 0, 0, 0.54);float: left;\">수량</dt>")
//                .append("<dd style=\"font-size: 14px; text-align: right;color: #000000; float: right;\">" + quantity + "</dd>")
//                .append("</dl>")
//                .append("<br>")
//                .append("<dl style=\"display: block; border-top: 1px solid #eeeeee;padding-top: 20px;\">")
//                .append("<dt style=\"font-size: 14px;text-align: left;color: rgba(0, 0, 0, 0.54);float: left;\">결제수단</dt>")
//                .append("<dd style=\"font-size: 14px; text-align: right;color: #000000; float: right;\">" + paymentMethodName + "<br>")
//                .append("<span style=\"font: size 13px;color:#c31e1f;padding-top:4px; display: block;\">(" + paymentDatetime + " 기준)</span></dd>")
//                .append("</dl>")
//                .append("<br>")
//                .append("</div>")
//
//                .append("<a href=\"" + serverProperties.getProtocol() + serverProperties.getDomain() + "\" target=\"_blank\"><img src=\"" + urlOrderImage + "\" /></a>")
//
//                .append("<div href=\"\" style=\"opacity: 0.56;font-size: 12px;font-weight: normal;font-stretch: normal;font-style: normal;line-height: 1.5;letter-spacing: normal;text-align: ")
//                .append("left;color: rgba(0, 0, 0, 0.56); margin-top: 30px; display: block;text-align: center;\">궁금한 사항은 ")
//                .append("<a href=\"mailto:support@onthe.live\" style=\"font-weight: bold;\">support@onthe.live</a>로 문의주시면 신속하게 처리해드리겠습니다.</div>")
//                .append("</div>")
//                .toString();
//    }
//
//    /**
//     * 패스워드 변경 이메일 템플릿
//     *
//     * @param user
//     * @return
//     */
//    public String passwordResetTemplate(KfashionUser user, String authKey) {
//        String urlLogoImage = serverProperties.getProtocol() + fileStorageProperties.getFilesDomain() + emailSenderProperties.getImagePath() + "/" + emailSenderProperties.getLogoImage();
//        String passwAuthUrl = serverProperties.getProtocol() + serverProperties.getDomain() + emailSenderProperties.getPasswordAuthPath();
//        String urlPasswordImage = serverProperties.getProtocol() + fileStorageProperties.getFilesDomain() + emailSenderProperties.getImagePath() + "/" + emailSenderProperties.getPasswordImage();
//
//        return new StringBuffer()
//                .append("<div style=\"margin: 0 auto; border: 1px solid #eeeeee; background-color: #ffffff; padding: 40px; text-align: center;width: 800px;\">")
//                .append("<a href=\"" + serverProperties.getProtocol() + serverProperties.getDomain() + "\" target='_blank'><img src=\"" + urlLogoImage + "\"></a>")
//                .append("<h2 style=\"font-size: 20px; text-align: center; font-weight: bold;\">ON THE LIVE 에서 비밀번호 재설정을 요청했습니다.<br> 아래 버튼을 클릭하여 비밀번호를 변경하십시오.</h2>")
//                .append("<div style=\"font-size: 14px;font-weight: normal;font-stretch: normal;font-style: normal;line-height: 1.71;letter-spacing: normal;text-align: center;color: #333333;margin: 40px 0;\">")
//                .append("다른 사람이 귀하의 계정에 액세스하려고 할 수 있으므로<br>이 요청을 하지 않은 경우 아래 링크를 클릭하지 마십시오.<br> 이메일 계정 자격 증명이 안전하게 보호되거나 절대적으로 안전하게 변경되었는지 확인하십시오.</div>")
//
//                .append("<a href=\"" + passwAuthUrl + "?email=" + user.getEmail() + "&authKey=" + authKey + "\" target=\"_blank\"><img src=\"" + urlPasswordImage + "\" /></a>")
//                .append("</div>")
//                .toString();
//    }
//}
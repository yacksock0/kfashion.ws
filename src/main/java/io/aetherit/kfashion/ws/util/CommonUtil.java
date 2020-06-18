package io.aetherit.kfashion.ws.util;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import io.aetherit.kfashion.ws.model.KfashionChannel;
import io.aetherit.kfashion.ws.model.KfashionChannelBroadcastEndpoint;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.simpleemail.AmazonSimpleEmailService;
import com.amazonaws.services.simpleemail.AmazonSimpleEmailServiceClientBuilder;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.aetherit.kfashion.ws.model.KfashionJanusToken;


public class CommonUtil {

    @SuppressWarnings("unused")
    private static final String charset = "utf-8";

    @Value("${kfashion.ws.manager.host}")
    private String host;


    private static final String accessKeyId = "AKIAXKNSETLATJZRBNWL";
    private static final String secretAccessKey = "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";

    private static final Logger logger = LoggerFactory.getLogger(CommonUtil.class);

    @Autowired
    RestTemplate restTemplate;

    /**
     * DATE FORMAT Validation
     *
     * @param format
     * @param value
     * @param locale
     * @return
     */
    public boolean isValidFormat(String format, String value, Locale locale) {
        LocalDateTime ldt = null;
        DateTimeFormatter fomatter = DateTimeFormatter.ofPattern(format, locale);

        try {
            ldt = LocalDateTime.parse(value, fomatter);
            String result = ldt.format(fomatter);
            return result.equals(value);
        } catch (DateTimeParseException e) {
            try {
                LocalDate ld = LocalDate.parse(value, fomatter);
                String result = ld.format(fomatter);
                return result.equals(value);
            } catch (DateTimeParseException exp) {
                try {
                    LocalTime lt = LocalTime.parse(value, fomatter);
                    String result = lt.format(fomatter);
                    return result.equals(value);
                } catch (DateTimeParseException e2) {
                    // Debugging purposes
                    //e2.printStackTrace();
                }
            }
        }

        return false;
    }

    /**
     * Comment  : 정상적인 이메일 인지 검증.
     */
    public static boolean isValidEmail(String email) {
        boolean err = false;
        String regex = "^[_a-z0-9-]+(.[_a-z0-9-]+)*@(?:\\w+\\.)+\\w+$";
        Pattern p = Pattern.compile(regex);
        Matcher m = p.matcher(email);
        if (m.matches()) {
            return true;
        }
        return err;
    }


    /**
     * MAP to Object 변환 Util Method
     *
     * @param map
     * @param objClass
     * @return
     */
    public static Object convertMapToObject(Map<?, ?> map, Object objClass) {
        String keyAttribute = null;
        String setMethodString = "set";
        String methodString = null;
        Iterator<?> itr = map.keySet().iterator();
        while (itr.hasNext()) {
            keyAttribute = (String) itr.next();
            methodString = setMethodString + keyAttribute.substring(0, 1).toUpperCase() + keyAttribute.substring(1);
            try {
                Method[] methods = objClass.getClass().getDeclaredMethods();
                for (int i = 0; i <= methods.length - 1; i++) {
                    if (methodString.equals(methods[i].getName())) {
//    					System.out.println("invoke : "+methodString);
                        methods[i].invoke(objClass, map.get(keyAttribute));
                    }
                }
            } catch (SecurityException e) {
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            } catch (IllegalArgumentException e) {
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            }
        }
        return objClass;
    }


    public String getRoundDouble(double count) {
        return Math.round(count) + "";
    }


    /**
     * 채널 url요청 : to manager
     *
     * @param channel
     * @return
     * @throws Exception
     */
    @SuppressWarnings({"unchecked", "rawtypes"})
    public List<KfashionChannelBroadcastEndpoint> requestBroadcastEndPoint(KfashionChannel channel, HttpMethod method) throws Exception {
        String uri = "/api/v1/reservations";
        try {
            String otlManagerUri = host + uri;

            System.out.println("otlManagerUri======================= " + otlManagerUri);

            MultiValueMap<String, String> headers = new LinkedMultiValueMap<String, String>();
            Map map = new HashMap<String, String>();
            map.put("Content-Type", "application/json");
            headers.setAll(map);

            HttpEntity<?> request = new HttpEntity<>(channel, headers);

            ResponseEntity<List<KfashionChannelBroadcastEndpoint>> result = restTemplate.exchange(otlManagerUri, method, request, new ParameterizedTypeReference<List<KfashionChannelBroadcastEndpoint>>() {
            });
            logger.trace("get result = {}", result);
            return result.getBody();
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception(e.getMessage());
        }
    }


    /**
     * 아마존 이메일 서비스 접속
     *
     * @return
     * @throws Exception
     */
    public AmazonSimpleEmailService getAwsSesMailCredentials() throws Exception {

        AWSCredentials awsCredentials = new BasicAWSCredentials(accessKeyId, secretAccessKey);
        AmazonSimpleEmailService sesClient = AmazonSimpleEmailServiceClientBuilder.standard().withCredentials(new AWSStaticCredentialsProvider(awsCredentials)).withRegion("us-west-2").build();
        return sesClient;
    }


    /**
     * 사용자 접속 아이피
     *
     * @param request
     * @return
     */
    public String getClientIpAddress(HttpServletRequest request) {
        for (String header : HEADERS_TO_TRY) {
            String ip = request.getHeader(header);
            if (ip != null && ip.length() != 0 && !"unknown".equalsIgnoreCase(ip)) {
                return ip;
            }
        }
        return request.getRemoteAddr();
    }

    private static final String[] HEADERS_TO_TRY = {
            "X-Forwarded-For",
            "Proxy-Client-IP",
            "WL-Proxy-Client-IP",
            "HTTP_X_FORWARDED_FOR",
            "HTTP_X_FORWARDED",
            "HTTP_X_CLUSTER_CLIENT_IP",
            "HTTP_CLIENT_IP",
            "HTTP_FORWARDED_FOR",
            "HTTP_FORWARDED",
            "HTTP_VIA",
            "REMOTE_ADDR"};

    /**
     * 브라우저별 파일명 처리
     *
     * @param request
     * @param fileName
     * @return
     * @throws UnsupportedEncodingException
     */
    public String getFileNameForClinetBrowser(HttpServletRequest request, String fileName) throws UnsupportedEncodingException {
        String browser = getBrowser(request);
        String encodedFilename = null;

        if (browser.equals("MSIE")) {
            encodedFilename = URLEncoder.encode(fileName, "UTF-8").replaceAll("\\+", "%20");
        } else if (browser.equals("Trident")) {       // IE11 문자열 깨짐 방지
            encodedFilename = URLEncoder.encode(fileName, "UTF-8").replaceAll("\\+", "%20");
        } else if (browser.equals("Firefox")) {
            encodedFilename = "\"" + new String(fileName.getBytes("UTF-8"), "8859_1") + "\"";
            encodedFilename = URLDecoder.decode(encodedFilename, "UTF-8");
        } else if (browser.equals("Opera")) {
            encodedFilename = "\"" + new String(fileName.getBytes("UTF-8"), "8859_1") + "\"";
        } else if (browser.equals("Chrome")) {
            StringBuffer sb = new StringBuffer();
            for (int i = 0; i < fileName.length(); i++) {
                char c = fileName.charAt(i);
                if (c > '~') {
                    sb.append(URLEncoder.encode("" + c, "UTF-8"));
                } else {
                    sb.append(c);
                }
            }
            encodedFilename = sb.toString();
        } else if (browser.equals("Safari")) {
            encodedFilename = "\"" + new String(fileName.getBytes("UTF-8"), "8859_1") + "\"";
            encodedFilename = URLDecoder.decode(encodedFilename, "UTF-8");
        } else {
            encodedFilename = "\"" + new String(fileName.getBytes("UTF-8"), "8859_1") + "\"";

        }
        return encodedFilename;
    }


    /**
     * 접속 브라우저 체크
     *
     * @param request
     * @return
     */
    public String getBrowser(HttpServletRequest request) {

        String header = request.getHeader("User-Agent");

        if (header.indexOf("MSIE") > -1) {
            return "MSIE";
        } else if (header.indexOf("Trident") > -1) {   // IE11 문자열 깨짐 방지
            return "Trident";
        } else if (header.indexOf("Chrome") > -1) {
            return "Chrome";
        } else if (header.indexOf("Opera") > -1) {
            return "Opera";
        } else if (header.indexOf("Safari") > -1) {
            return "Safari";
        } else if (header.indexOf("iPhone") > -1 && header.indexOf("Mobile") > -1) {
            return "iPhone";
        } else if (header.indexOf("Android") > -1 && header.indexOf("Mobile") > -1) {
            return "Android";
        }
        return "Firefox";
    }


    /**
     * 페이징여부 확인
     */
    public boolean checkPaging(String paging) {
        return paging.equals("yes");
    }
}
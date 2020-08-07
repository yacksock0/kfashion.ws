package io.aetherit.kfashion.ws.util;

import java.io.UnsupportedEncodingException;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.spec.SecretKeySpec;


import io.aetherit.kfashion.ws.model.KfashionSimpleUser;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class JwtTokenUtil {

    private static final String SECRET_KEY =  "4E18AC8AC1F2A09BA749E72B7AD29EC967A572899E332162AECB49C2D4E18AC8AC1F2A09BA749E72B7AD29EC967A572899E332162AECB49C2D49C2D";

    /**
     * Encode JWT.
     *
     * @param simpleUser the user
     * @return the string
     */
    public static String getJwtToken(KfashionSimpleUser simpleUser){
        byte[] apiKeySecretBytes = SECRET_KEY.getBytes();
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
        Key secretKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());

        Map<String, Object> headerMap = new HashMap<String, Object>();
        headerMap.put("typ","JWT");
        headerMap.put("alg","HS256");

        Map<String, Object> map= new HashMap<String, Object>();
        map.put("userId", simpleUser.getId()+"");
        map.put("email", simpleUser.getEmail());
        map.put("userName", simpleUser.getName());
        map.put("AuthorityNo", simpleUser.getAuthorityNo()+"");
        map.put("isAdmin", simpleUser.getIsAdmin()+"");
        map.put("GroupAdmin", simpleUser.getGroupAdmin()+"");

        Date expireTime = new Date();
        expireTime.setTime(expireTime.getTime() + 1000 * 60 * 60 * 24);		// 24시간

        String jwt = Jwts.builder()
                .setHeader(headerMap)
                .setClaims(map)
                .setExpiration(expireTime)
                .signWith(secretKey, signatureAlgorithm)
                .compact();

        return jwt;
    }

/*    *//**
     * 잠시 주석
     * @param KfashionSimpleUser
     * @return
     *//*
    public String getJwtToken(KfashionSimpleUser simpleUser){

    	SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
        Date expireTime = new Date();
        expireTime.setTime(expireTime.getTime() + 1000 * 60 * 60 * 6);
        byte[] generateKey = this.generateKey();
        Key signingKey = new SecretKeySpec(generateKey, signatureAlgorithm.getJcaName());
        Map<String, Object> headerMap = new HashMap<String, Object>();
        headerMap.put("typ","JWT");
        headerMap.put("alg","HS256");

        Map<String, Object> map= new HashMap<String, Object>();
        map.put("userId", simpleUser.getId()+"");
        map.put("email", simpleUser.getEmail());
        map.put("userName", simpleUser.getName());
        map.put("AuthorityNo", simpleUser.getAuthorityNo()+"");
        map.put("isAdmin", simpleUser.getIsAdmin()+"");
        map.put("GroupAdmin", simpleUser.getGroupAdmin()+"");

		String jwt = Jwts.builder()
	    			 .setHeader(headerMap)
					 .setClaims(map)
					 .setExpiration(expireTime)
					 .signWith(signingKey, signatureAlgorithm)
					 .compact();
        return jwt;
	}*/


    private byte[] generateKey(){
        byte[] key = null;
        try {
            key = SECRET_KEY.getBytes("UTF-8");
        } catch (UnsupportedEncodingException e) {
            if(log.isInfoEnabled()){
                e.printStackTrace();
            }else{
                log.error("Making JWT Key Error ::: {}", e.getMessage());
            }
        }
        return key;
    }


    public boolean checkJwtKey(String jwt) throws Exception{
        try {
            JwtParser parser = Jwts.parserBuilder().setSigningKey(this.generateKey()).build();
            Claims claims = parser.parseClaimsJws(jwt).getBody();

            log.info("Expiration :" + claims.getExpiration());
            log.info("userId :" + claims.get("userId"));
            log.info("email :" + claims.get("email"));
            log.info("userName :" + claims.get("userName"));
            log.info("typeCode :" + claims.get("typeCode"));

            return true;
        } catch (ExpiredJwtException exception) {
            log.info("Token Expired!");
            return false;
        } catch (JwtException exception) {
            log.info("Token auth failed!");
            return false;
        }
    }
}

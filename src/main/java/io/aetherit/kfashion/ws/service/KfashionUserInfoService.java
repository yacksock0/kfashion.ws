package io.aetherit.kfashion.ws.service;

import io.aetherit.kfashion.ws.model.KfashionUserInfo;
import io.aetherit.kfashion.ws.repository.KfashionUserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class KfashionUserInfoService {
    private KfashionUserInfoRepository repository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public KfashionUserInfoService(KfashionUserInfoRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    public String createNewUser(KfashionUserInfo user) {
        String msg="";
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        repository.createNewUser(user);
        int sucess =repository.selectUser(user);
        if(sucess == 1) {
            msg = "success";
            return msg;
        }else {
            msg = "fail";
            return msg;
        }
    }
}

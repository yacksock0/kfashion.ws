package io.aetherit.kfashion.ws.service;

import io.aetherit.kfashion.ws.repository.KfashionUserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KfashionUserInfoService {
    private KfashionUserInfoRepository repository;

    @Autowired
    public KfashionUserInfoService(KfashionUserInfoRepository repository) {
        this.repository = repository;
    }
}

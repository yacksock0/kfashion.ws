package io.aetherit.kfashion.ws.repository;

import io.aetherit.kfashion.ws.model.KfashionUserInfo;
import io.aetherit.kfashion.ws.repository.mapper.KfashionUserInfoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class KfashionUserInfoRepository {
    private KfashionUserInfoMapper mapper;

    @Autowired
    public KfashionUserInfoRepository(KfashionUserInfoMapper mapper) {
        this.mapper = mapper;
    }

    public void createNewUser(KfashionUserInfo user) {
        mapper.createNewUser(user);
    }

    public int selectUser(KfashionUserInfo user) {
        return mapper.selectUser(user);
    }
}

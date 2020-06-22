package io.aetherit.kfashion.ws.repository.mapper;

import io.aetherit.kfashion.ws.model.KfashionUserInfo;

public interface KfashionUserInfoMapper {
    void createNewUser(KfashionUserInfo user);
    int selectUser(KfashionUserInfo user);
}

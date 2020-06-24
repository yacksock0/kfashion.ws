package io.aetherit.kfashion.ws.repository.mapper;

import io.aetherit.kfashion.ws.model.KfashionUserInfo;
import java.util.List;

public interface KfashionUserInfoMapper {
    void createNewUser(KfashionUserInfo user);

    KfashionUserInfo selectUser(String id);

    int checkUser(KfashionUserInfo user);

    List<KfashionUserInfo> selectUsersWhereType(char isAdmin);

    KfashionUserInfo selectUserById(String id);

    KfashionUserInfo selectUserByEmail(String email);

    void updateAuthUser(String id);
}

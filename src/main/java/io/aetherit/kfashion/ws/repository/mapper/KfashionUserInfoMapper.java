package io.aetherit.kfashion.ws.repository.mapper;

import io.aetherit.kfashion.ws.model.KfashionUserInfo;
import java.util.List;

public interface KfashionUserInfoMapper {
    void createNewUser(KfashionUserInfo user);

    KfashionUserInfo selectUser(String id);

    int checkUser(KfashionUserInfo user);

    List<KfashionUserInfo> selectUsersWhereType(boolean checkAdmin);

    KfashionUserInfo selectUserById(String id);

    KfashionUserInfo selectUserByEmail(String email);

}

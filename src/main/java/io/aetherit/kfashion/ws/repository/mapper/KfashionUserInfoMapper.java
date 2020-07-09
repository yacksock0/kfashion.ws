package io.aetherit.kfashion.ws.repository.mapper;

import io.aetherit.kfashion.ws.model.KfashionUserInfo;
import java.util.List;
import java.util.Map;

public interface KfashionUserInfoMapper {
    void createNewUser(KfashionUserInfo user);

    KfashionUserInfo selectUser(String id);

    int checkUser(KfashionUserInfo user);

    List<KfashionUserInfo> selectUsersWhereType(char isAdmin);

    KfashionUserInfo selectUserById(String id);

    KfashionUserInfo selectUserByEmail(String email);

    void updateAuthUser(String id);

    List<KfashionUserInfo> selectUserList();

    void updateUserGroup(Map<String, Object> map);

    List<KfashionUserInfo> selectGroupUserList(Map<String, Object> adminMap);

    void createGroupUser(KfashionUserInfo user);

    void deleteGroupAdminUser(String id);

    void deleteGroupUser(String id);
}

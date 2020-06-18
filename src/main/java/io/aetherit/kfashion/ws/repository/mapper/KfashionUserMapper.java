package io.aetherit.kfashion.ws.repository.mapper;

import io.aetherit.kfashion.ws.model.KfashionUser;
import io.aetherit.kfashion.ws.model.KfashionUserProfile;
import io.aetherit.kfashion.ws.model.KfashionUserStatusChange;
import io.aetherit.kfashion.ws.model.support.KfashionUserType;
import java.util.List;

public interface KfashionUserMapper {
    KfashionUser selectUserByEmail(String email);

    KfashionUser selectUserByNickName(String nickName);

    int updateUserStatus(KfashionUserStatusChange user);

    long insertUser(KfashionUser user);

    String selectUserNickName(long userid);

    KfashionUserProfile selectUserProfile(long userid);

    KfashionUser selectUser(long userid);

    List<KfashionUser> selectUsersWhereType(KfashionUserType type);
}

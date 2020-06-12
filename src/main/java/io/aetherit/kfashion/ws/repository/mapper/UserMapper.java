package io.aetherit.kfashion.ws.repository.mapper;

import io.aetherit.kfashion.ws.model.KfashionUser;
import io.aetherit.kfashion.ws.model.support.KfashionUserType;

import java.util.List;

public interface UserMapper {
    KfashionUser selectUser(String id);
    List<KfashionUser> selectUsersWhereType(KfashionUserType type);
    int insertUser(KfashionUser account);
}

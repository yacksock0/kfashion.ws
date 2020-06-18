package io.aetherit.kfashion.ws.repository.mapper;

import io.aetherit.kfashion.ws.model.User;
import io.aetherit.kfashion.ws.model.support.UserType;

import java.util.List;

public interface UserMapper {

    User selectUser(String id);
    List<User> selectUsersWhereType(UserType type);
    int insertUser(User account);

}

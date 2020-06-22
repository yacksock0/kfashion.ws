package io.aetherit.kfashion.ws.repository;

import io.aetherit.kfashion.ws.model.KfashionUserInfo;
import io.aetherit.kfashion.ws.model.User;
import io.aetherit.kfashion.ws.model.support.UserType;
import io.aetherit.kfashion.ws.repository.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserRepository {
    private UserMapper mapper;

    @Autowired
    public UserRepository(UserMapper mapper) {
        this.mapper = mapper;
    }

    public KfashionUserInfo selectUser(String id) {
        return mapper.selectUser(id);
    }

    public List<User> selectUsers(UserType type) {
        return mapper.selectUsersWhereType(type);
    }

    public int insertUser(User user) {
        return mapper.insertUser(user);
    }

}

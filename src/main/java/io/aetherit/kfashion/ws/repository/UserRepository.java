package io.aetherit.kfashion.ws.repository;

import io.aetherit.kfashion.ws.model.KfashionUser;
import io.aetherit.kfashion.ws.repository.mapper.UserMapper;
import io.aetherit.kfashion.ws.model.support.KfashionUserType;
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

    public KfashionUser selectUser(String id) {
        return mapper.selectUser(id);
    }

    public List<KfashionUser> selectUsers(KfashionUserType type) {
        return mapper.selectUsersWhereType(type);
    }

    public int insertUser(KfashionUser user) {
        return mapper.insertUser(user);
    }
}

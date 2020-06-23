package io.aetherit.kfashion.ws.repository;

import io.aetherit.kfashion.ws.model.KfashionUserInfo;
import io.aetherit.kfashion.ws.repository.mapper.KfashionUserInfoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.List;

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

    public KfashionUserInfo selectUser(String id) {
        return mapper.selectUser(id);
    }

    public int checkUser(KfashionUserInfo user) {
        return mapper.checkUser(user);
    }

    public List<KfashionUserInfo> selectUsers(boolean checkAdmin) {
        return mapper.selectUsersWhereType(checkAdmin);
    }

    public KfashionUserInfo selectUserById(String id) {
        return mapper.selectUserById(id);
    }

    public KfashionUserInfo selectUserByEmail(String email) {
        return mapper.selectUserByEmail(email);
    }
}

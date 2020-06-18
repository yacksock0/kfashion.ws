package io.aetherit.kfashion.ws.repository;

import io.aetherit.kfashion.ws.model.KfashionUser;
import io.aetherit.kfashion.ws.model.KfashionUserProfile;
import io.aetherit.kfashion.ws.model.KfashionUserStatusChange;
import io.aetherit.kfashion.ws.model.support.KfashionUserType;
import io.aetherit.kfashion.ws.repository.mapper.KfashionUserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class KfashionUserRepository {

    private KfashionUserMapper mapper;

    @Autowired
    public KfashionUserRepository(KfashionUserMapper mapper) {
        this.mapper = mapper;
    }


    public KfashionUser selectUserByEmail(String email) {
        return mapper.selectUserByEmail(email);
    }

    public KfashionUser selectUserByNickName(String nickName) {
        return mapper.selectUserByNickName(nickName);
    }

    public int updateUserStatus(KfashionUserStatusChange user) {
        return mapper.updateUserStatus(user);
    }

    public long insertUser(KfashionUser user) {
        return mapper.insertUser(user);
    }

    public String selectUserNickName(long userid) {
        return mapper.selectUserNickName(userid);
    }

    public KfashionUserProfile selectUserProfile(long userid) {
        return mapper.selectUserProfile(userid);
    }

    public KfashionUser selectUser(long userid) {
        return mapper.selectUser(userid);
    }

    public List<KfashionUser> selectUsers(KfashionUserType type) {
        return mapper.selectUsersWhereType(type);
    }
}
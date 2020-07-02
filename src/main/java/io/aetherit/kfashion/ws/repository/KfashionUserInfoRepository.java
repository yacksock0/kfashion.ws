package io.aetherit.kfashion.ws.repository;

import io.aetherit.kfashion.ws.model.KfashionUserInfo;
import io.aetherit.kfashion.ws.repository.mapper.KfashionUserInfoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    public List<KfashionUserInfo> selectUsers(char isAdmin) {
        return mapper.selectUsersWhereType(isAdmin);
    }

    public KfashionUserInfo selectUserById(String id) {
        return mapper.selectUserById(id);
    }

    public KfashionUserInfo selectUserByEmail(String email) {
        return mapper.selectUserByEmail(email);
    }

    public void updateAuthUser(String id) {
        mapper.updateAuthUser(id);
    }

    public List<KfashionUserInfo> selectUserList() {
        return mapper.selectUserList();
    }

    public void updateUserGroup(int groupNo, String id) {
        Map<String, Object> map = new HashMap<>();
        map.put("groupNo",groupNo);
        map.put("id",id);
        mapper.updateUserGroup(map);
    }

    public List<KfashionUserInfo> selectGroupUserList(int groupNo) {
        return mapper.selectGroupUserList(groupNo);

    }

    public void createGroupUser(KfashionUserInfo user) {
        mapper.createGroupUser(user);
    }

    public void deleteGroupAdminUser(String id) {
        mapper.deleteGroupAdminUser(id);
    }

    public void deleteGroupUser(String id) {
        mapper.deleteGroupUser(id);
    }
}

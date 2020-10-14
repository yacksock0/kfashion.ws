package io.aetherit.kfashion.ws.repository.kTagging;

import io.aetherit.kfashion.ws.model.KfashionUserInfo;
import io.aetherit.kfashion.ws.model.kTagging.TaggingUser;
import io.aetherit.kfashion.ws.repository.mapper.KfashionUserInfoMapper;
import io.aetherit.kfashion.ws.repository.mapper.kTagging.TaggingUserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class TaggingUserRepository {
    private TaggingUserMapper mapper;

    @Autowired
    public TaggingUserRepository(TaggingUserMapper mapper) {
        this.mapper = mapper;
    }

    public List<TaggingUser> selectUsers(String userType) {
        return mapper.selectUsersWhereType(userType);
    }




    public void createNewUser(TaggingUser user) {
        mapper.createNewUser(user);
    }

    public TaggingUser selectUser(String id) {
        return mapper.selectUser(id);
    }

    public TaggingUser selectAdmin(String userId) {
        return mapper.selectAdmin(userId);
    }

    public int checkUser(KfashionUserInfo user) {
        return mapper.checkUser(user);
    }



    public TaggingUser selectUserById(String id) {
        return mapper.selectUserById(id);
    }

//    public KfashionUserInfo selectUserByEmail(String email) {
//        return mapper.selectUserByEmail(email);
//    }
//
//    public void updateAuthUser(String id) {
//        mapper.updateAuthUser(id);
//    }
//
//    public List<KfashionUserInfo> selectUserList() {
//        return mapper.selectUserList();
//    }
//
//    public void updateUserGroup(int groupNo, String id) {
//        Map<String, Object> map = new HashMap<>();
//        map.put("groupNo", groupNo);
//        map.put("id", id);
//        mapper.updateUserGroup(map);
//    }
//
//    public List<KfashionUserInfo> selectGroupUserList(Map<String, Object> adminMap) {
//        return mapper.selectGroupUserList(adminMap);
//
//    }
//
//    public void createGroupUser(KfashionUserInfo user) {
//        mapper.createGroupUser(user);
//    }
//
//    public void deleteGroupAdminUser(KfashionUserInfo user) {
//        mapper.deleteGroupAdminUser(user);
//    }
//
//    public void deleteGroupUser(KfashionUserInfo user) {
//        mapper.deleteGroupUser(user);
//    }
//
//    public int getGroupUser(String userId) {
//        return mapper.getGroupUser(userId);
//    }
//
//    public void updateGroupUser(KfashionUserInfo user) {
//        mapper.updateGroupUser(user);
//    }
//
//    public void updateGroupUserName(KfashionUserInfo user) {
//        mapper.updateGroupUserName(user);
//    }
//
//    public long selectGroupUserListTotal(Map<String, Object> totalMap) {
//        return mapper.selectGroupUserListTotal(totalMap);
//    }
}

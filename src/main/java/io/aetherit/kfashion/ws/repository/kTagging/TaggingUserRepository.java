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

    public int checkUser(TaggingUser user) {
        return mapper.checkUser(user);
    }



    public TaggingUser selectUserById(String id) {
        return mapper.selectUserById(id);
    }
    public TaggingUser findTaggingUser(TaggingUser user) {
        return mapper.findTaggingUser(user);
    }
}

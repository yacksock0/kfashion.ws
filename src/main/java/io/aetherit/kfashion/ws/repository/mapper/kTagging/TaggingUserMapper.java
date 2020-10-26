package io.aetherit.kfashion.ws.repository.mapper.kTagging;

import io.aetherit.kfashion.ws.model.KfashionUserInfo;
import io.aetherit.kfashion.ws.model.kTagging.TaggingUser;

import java.util.List;
import java.util.Map;

public interface TaggingUserMapper {
    List<TaggingUser> selectUsersWhereType(String userType);
    TaggingUser selectUserById(String id);

    void createNewUser(TaggingUser user);

    TaggingUser selectUser(String id);

    TaggingUser selectAdmin(String userId);

    int checkUser(TaggingUser user);

    TaggingUser findTaggingUser(TaggingUser user);

}

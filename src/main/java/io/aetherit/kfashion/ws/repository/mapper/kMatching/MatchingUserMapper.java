package io.aetherit.kfashion.ws.repository.mapper.kMatching;

import io.aetherit.kfashion.ws.model.kMatching.MatchingUser;
import io.aetherit.kfashion.ws.model.kSearching.SearchingUser;

import java.util.List;

public interface MatchingUserMapper {
    List<MatchingUser> selectUsersWhereType(String userType);
    MatchingUser selectUserById(String id);

    MatchingUser selectUserByNickName(String nickName);

    void createNewUser(MatchingUser user);

    void changePassword(MatchingUser user);

    MatchingUser selectUser(String id);

    MatchingUser selectAdmin(String userId);

    int checkUser(MatchingUser user);

    MatchingUser findMatchingUser(MatchingUser user);

    MatchingUser nameCkMatchingUser(MatchingUser user);

}

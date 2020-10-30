package io.aetherit.kfashion.ws.repository.mapper.kMatching;

import io.aetherit.kfashion.ws.model.kMatching.MatchingUser;
import io.aetherit.kfashion.ws.model.kSearching.SearchingUser;

import java.util.List;

public interface MatchingUserMapper {
    List<MatchingUser> selectUsersWhereType(String userType);
    MatchingUser selectUserById(String id);

    void createNewUser(MatchingUser user);

    MatchingUser selectUser(String id);

    MatchingUser selectAdmin(String userId);

    int checkUser(MatchingUser user);

    MatchingUser findMatchingUser(MatchingUser user);

}

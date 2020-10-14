package io.aetherit.kfashion.ws.repository.mapper.kSearching;

import io.aetherit.kfashion.ws.model.kSearching.SearchingUser;

import java.util.List;

public interface SearchingUserMapper {
    List<SearchingUser> selectUsersWhereType(String userType);
    SearchingUser selectUserById(String id);

    void createNewUser(SearchingUser user);

    SearchingUser selectUser(String id);

    SearchingUser selectAdmin(String userId);

    int checkUser(SearchingUser user);

}

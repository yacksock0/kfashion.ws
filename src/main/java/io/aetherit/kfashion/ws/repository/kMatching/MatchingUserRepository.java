package io.aetherit.kfashion.ws.repository.kMatching;

import io.aetherit.kfashion.ws.model.kMatching.MatchingUser;
import io.aetherit.kfashion.ws.model.kSearching.SearchingUser;
import io.aetherit.kfashion.ws.repository.mapper.kMatching.MatchingUserMapper;
import io.aetherit.kfashion.ws.repository.mapper.kSearching.SearchingUserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MatchingUserRepository {
    private MatchingUserMapper mapper;

    @Autowired
    public MatchingUserRepository(MatchingUserMapper mapper) {
        this.mapper = mapper;
    }

    public List<MatchingUser> selectUsers(String userType) {
        return mapper.selectUsersWhereType(userType);
    }




    public void createNewUser(MatchingUser user) {
        mapper.createNewUser(user);
    }

    public MatchingUser selectUser(String id) {
        return mapper.selectUser(id);
    }

    public MatchingUser selectAdmin(String userId) {
        return mapper.selectAdmin(userId);
    }

    public int checkUser(MatchingUser user) {
        return mapper.checkUser(user);
    }



    public MatchingUser selectUserById(String id) {
        return mapper.selectUserById(id);
    }

}
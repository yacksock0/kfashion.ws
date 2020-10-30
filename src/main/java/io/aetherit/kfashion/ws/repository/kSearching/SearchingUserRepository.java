package io.aetherit.kfashion.ws.repository.kSearching;

import io.aetherit.kfashion.ws.model.KfashionUserInfo;
import io.aetherit.kfashion.ws.model.kSearching.SearchingUser;
import io.aetherit.kfashion.ws.model.kTagging.TaggingUser;
import io.aetherit.kfashion.ws.repository.mapper.kSearching.SearchingUserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SearchingUserRepository {
    private SearchingUserMapper mapper;

    @Autowired
    public SearchingUserRepository(SearchingUserMapper mapper) {
        this.mapper = mapper;
    }

    public List<SearchingUser> selectUsers(String userType) {
        return mapper.selectUsersWhereType(userType);
    }




    public void createNewUser(SearchingUser user) {
        mapper.createNewUser(user);
        System.out.println(user);
    }

    public void changePassword(SearchingUser user) {
        System.out.println("!!"+user);
        mapper.changePassword(user);
    }

    public SearchingUser selectUser(String id) {
        return mapper.selectUser(id);
    }

    public SearchingUser selectAdmin(String userId) {
        return mapper.selectAdmin(userId);
    }

    public int checkUser(SearchingUser user) {
        return mapper.checkUser(user);
    }



    public SearchingUser selectUserById(String id) {
        return mapper.selectUserById(id);
    }
    public SearchingUser findSearchingUser(SearchingUser user) {
        return mapper.findSearchingUser(user);
    }

    public SearchingUser nameCkSearchingUser(SearchingUser user) {
        return mapper.nameCkSearchingUser(user);
    }

}

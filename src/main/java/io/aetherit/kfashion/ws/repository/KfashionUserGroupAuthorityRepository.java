package io.aetherit.kfashion.ws.repository;

import io.aetherit.kfashion.ws.model.KfashionCategoryItem;
import io.aetherit.kfashion.ws.model.KfashionUserGroupAuthority;
import io.aetherit.kfashion.ws.repository.mapper.KfashionUserGroupAuthorityMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class KfashionUserGroupAuthorityRepository {
    private KfashionUserGroupAuthorityMapper mapper;

    @Autowired
    public KfashionUserGroupAuthorityRepository(KfashionUserGroupAuthorityMapper mapper) {
        this.mapper = mapper;
    }

    public void insertUserGroupAuthority(KfashionUserGroupAuthority userGroupAuthority) {
        mapper.insertUserGroupAuthority(userGroupAuthority);
    }

    public List<KfashionCategoryItem> selectUserGroupAuthorityList() {
        return mapper.selectUserGroupAuthorityList();
    }
}

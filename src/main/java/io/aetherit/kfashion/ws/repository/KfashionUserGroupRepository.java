package io.aetherit.kfashion.ws.repository;

import io.aetherit.kfashion.ws.model.KfashionUserGroup;
import io.aetherit.kfashion.ws.repository.mapper.KfashionUserGroupMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class KfashionUserGroupRepository {
    private KfashionUserGroupMapper mapper;

    @Autowired
    public KfashionUserGroupRepository(KfashionUserGroupMapper mapper) {
        this.mapper = mapper;
    }

    public void createUserGroup(KfashionUserGroup userGroup) {
        mapper.createUserGroup(userGroup);
    }

    public List<KfashionUserGroup> selectGroupList() {
        return mapper.selectGroupList();
    }

    public int selectGroupNo(KfashionUserGroup userGroup) {
        return mapper.selectGroupNo(userGroup);
    }
}

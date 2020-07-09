package io.aetherit.kfashion.ws.repository;

import io.aetherit.kfashion.ws.model.KfashionUserGroupAdmin;
import io.aetherit.kfashion.ws.repository.mapper.KfashionUserGroupAdminMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class KfashionUserGroupAdminRepository {
    private KfashionUserGroupAdminMapper mapper;

    @Autowired
    public KfashionUserGroupAdminRepository(KfashionUserGroupAdminMapper mapper) {
        this.mapper = mapper;
    }

    public void insertUserAdminGroup(KfashionUserGroupAdmin groupAdmin) {
        mapper.insertUserAdminGroup(groupAdmin);
    }

    public String[] selectGroupAdminId(int groupNo) {
        return mapper.selectGroupAdminId(groupNo);
    }
}

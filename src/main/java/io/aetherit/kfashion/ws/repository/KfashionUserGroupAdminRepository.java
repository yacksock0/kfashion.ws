package io.aetherit.kfashion.ws.repository;

import io.aetherit.kfashion.ws.model.KfashionUserGroupAdmin;
import io.aetherit.kfashion.ws.repository.mapper.KfashionUserGroupAdminMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

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

    public List<String> selectGroupAdminId(int groupNo) {
        return mapper.selectGroupAdminId(groupNo);
    }
}

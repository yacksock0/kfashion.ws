package io.aetherit.kfashion.ws.repository.mapper;

import io.aetherit.kfashion.ws.model.KfashionUserGroupAdmin;

import java.util.List;

public interface KfashionUserGroupAdminMapper {
    void insertUserAdminGroup(KfashionUserGroupAdmin groupAdmin);

    List<String> selectGroupAdminId(int groupNo);
}

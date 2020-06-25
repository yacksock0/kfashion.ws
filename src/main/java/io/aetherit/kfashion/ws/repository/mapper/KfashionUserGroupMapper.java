package io.aetherit.kfashion.ws.repository.mapper;

import io.aetherit.kfashion.ws.model.KfashionUserGroup;

import java.util.List;

public interface KfashionUserGroupMapper {
    void createUserGroup(KfashionUserGroup userGroup);

    List<KfashionUserGroup> selectGroupList();
}

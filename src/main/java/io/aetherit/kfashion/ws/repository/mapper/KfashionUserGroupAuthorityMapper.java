package io.aetherit.kfashion.ws.repository.mapper;

import io.aetherit.kfashion.ws.model.KfashionCategoryItem;
import io.aetherit.kfashion.ws.model.KfashionUserGroupAuthority;

import java.util.List;

public interface KfashionUserGroupAuthorityMapper {
    void insertUserGroupAuthority(KfashionUserGroupAuthority userGroupAuthority);

    List<KfashionCategoryItem> selectUserGroupAuthorityList();
}

package io.aetherit.kfashion.ws.repository.mapper;

import io.aetherit.kfashion.ws.model.KfashionUserAuthority;

import java.util.List;

public interface KfashionUserAuthorityMapper {
    List<KfashionUserAuthority> selectUserAuthority();
}

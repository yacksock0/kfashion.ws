package io.aetherit.kfashion.ws.service;

import io.aetherit.kfashion.ws.model.KfashionCategoryItem;
import io.aetherit.kfashion.ws.model.KfashionUserGroupAuthority;
import io.aetherit.kfashion.ws.repository.KfashionUserGroupAuthorityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KfashionUserGroupAuthorityService {
    private KfashionUserGroupAuthorityRepository repository;

    @Autowired
    public KfashionUserGroupAuthorityService(KfashionUserGroupAuthorityRepository repository) {
        this.repository = repository;
    }

    public String insertUserGroupAuthority(KfashionUserGroupAuthority userGroupAuthority) {
        String msg = "";
        repository.insertUserGroupAuthority(userGroupAuthority);
        msg = "그룹이 생성되었습니다.";
        return msg;
    }

    public List<KfashionCategoryItem> selectUserGroupAuthorityList() {
        return repository.selectUserGroupAuthorityList();
    }
}

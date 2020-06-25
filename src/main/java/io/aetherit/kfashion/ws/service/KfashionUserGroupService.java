package io.aetherit.kfashion.ws.service;

import io.aetherit.kfashion.ws.model.KfashionUserGroup;
import io.aetherit.kfashion.ws.repository.KfashionUserGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KfashionUserGroupService {
    private KfashionUserGroupRepository repository;

    @Autowired
    public KfashionUserGroupService(KfashionUserGroupRepository repository) {
        this.repository = repository;
    }

    public String createUserGroup(KfashionUserGroup userGroup) {
        String msg = "";
        repository.createUserGroup(userGroup);
        msg = "그룹이 생성되었습니다.";
        return msg;
    }

    public List<KfashionUserGroup> selectGroupList() {
        return repository.selectGroupList();
    }
}

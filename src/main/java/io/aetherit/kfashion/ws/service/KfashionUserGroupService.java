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

    public void createUserGroup(KfashionUserGroup userGroup) {
        repository.createUserGroup(userGroup);
    }

    public List<KfashionUserGroup> selectGroupList() {
        return repository.selectGroupList();
    }

    public int selectGroupNo(KfashionUserGroup userGroup) {
        return repository.selectGroupNo(userGroup);
    }
}

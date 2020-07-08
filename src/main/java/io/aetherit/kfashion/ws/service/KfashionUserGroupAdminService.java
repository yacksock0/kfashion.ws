package io.aetherit.kfashion.ws.service;

import io.aetherit.kfashion.ws.model.KfashionUserGroupAdmin;
import io.aetherit.kfashion.ws.repository.KfashionUserGroupAdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KfashionUserGroupAdminService {
    private KfashionUserGroupAdminRepository repository;

    @Autowired
    public KfashionUserGroupAdminService(KfashionUserGroupAdminRepository repository) {
        this.repository = repository;
    }

    public void insertUserAdminGroup(KfashionUserGroupAdmin groupAdmin) {
        repository.insertUserAdminGroup(groupAdmin);
    }

    public String selectGroupAdminId(int groupNo) {
        return repository.selectGroupAdminId(groupNo);
    }
}

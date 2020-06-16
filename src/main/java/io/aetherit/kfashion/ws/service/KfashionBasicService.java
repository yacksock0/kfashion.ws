package io.aetherit.kfashion.ws.service;

import io.aetherit.kfashion.ws.model.KfashionBasic;
import io.aetherit.kfashion.ws.repository.KfashionBasicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KfashionBasicService {

    private KfashionBasicRepository repository;

    @Autowired
    public KfashionBasicService(KfashionBasicRepository repository) {
        this.repository = repository;
    }

    public void kfashionBasicInsert(KfashionBasic kfashionBasic) {
        repository.kfashionBasicInsert(kfashionBasic);
    }
}

package io.aetherit.kfashion.ws.service;

import io.aetherit.kfashion.ws.repository.KfashionProfessionalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KfashionProfessionalService {

    private KfashionProfessionalRepository repository;

    @Autowired
    public KfashionProfessionalService(KfashionProfessionalRepository repository) {
        this.repository = repository;
    }

}

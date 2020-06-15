package io.aetherit.kfashion.ws.service;

import io.aetherit.kfashion.ws.repository.KfashionInspectionStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KfashionInspectionStatusService {


    private KfashionInspectionStatusRepository repository;

    @Autowired
    public KfashionInspectionStatusService(KfashionInspectionStatusRepository repository) {
        this.repository = repository;
    }
}

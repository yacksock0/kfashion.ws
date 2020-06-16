package io.aetherit.kfashion.ws.service;


import io.aetherit.kfashion.ws.model.KfashionColor;
import io.aetherit.kfashion.ws.repository.KfashionColorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KfashionColorService {

    @Autowired
    private KfashionColorRepository repository;

    public void KfashionColorService (KfashionColorRepository repository) {
        this.repository=repository;
    }

    public List<KfashionColor> colorList() {
        return repository.colorList();
    }
}

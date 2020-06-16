package io.aetherit.kfashion.ws.repository;

import io.aetherit.kfashion.ws.model.KfashionColor;
import io.aetherit.kfashion.ws.repository.mapper.KfashionColorMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class KfashionColorRepository {

    @Autowired
    private KfashionColorMapper mapper;

    public void KfashionColorRepository(KfashionColorMapper mapper) {
        this.mapper=mapper;
    }

    public List<KfashionColor> colorList() {
        return mapper.colorList();
    }
}

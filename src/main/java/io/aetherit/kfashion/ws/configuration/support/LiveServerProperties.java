package io.aetherit.kfashion.ws.configuration.support;

import io.aetherit.kfashion.ws.model.support.KfashionServerMode;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@ConfigurationProperties(prefix = "kfashion.ws.server")
@Data
public class LiveServerProperties {
    private String protocol;
    private String domain;
    private KfashionServerMode mode;
}

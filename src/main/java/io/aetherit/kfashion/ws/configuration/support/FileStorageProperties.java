package io.aetherit.kfashion.ws.configuration.support;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "kfashion.ws.file")
@Data
public class FileStorageProperties {
    private String uploadDir;
    private String filesDomain;
    private String channelPath;
    private String userBoardPath;
    private String userProfilePath;
}

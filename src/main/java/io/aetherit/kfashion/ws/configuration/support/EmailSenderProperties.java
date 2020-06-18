package io.aetherit.kfashion.ws.configuration.support;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "kfashion.ws.mail")
@Data
public class EmailSenderProperties {
    private String mailAuthPath;
    private String passwordAuthPath;
    private String imagePath;
    private String logoImage;
    private String certificationImage;
    private String inviteImage;
    private String orderImage;
    private String passwordImage;
    private String signupImage;
}

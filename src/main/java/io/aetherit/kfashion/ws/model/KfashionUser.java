package io.aetherit.kfashion.ws.model;

import io.aetherit.kfashion.ws.model.support.KfashionUserType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KfashionUser {
    private String id;
    private String password;
    private String name;
    private KfashionUserType type;
    private boolean isEnabled;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;
}

package io.aetherit.kfashion.ws.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KfashionEmailAuthority {

    private String userId;
    private String authKey;
    private LocalDateTime expirationDatetime;
    private LocalDateTime createdDatetime;
    private LocalDateTime authorityDatetime;

}

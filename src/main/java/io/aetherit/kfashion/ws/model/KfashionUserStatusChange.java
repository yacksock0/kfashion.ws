package io.aetherit.kfashion.ws.model;

import io.aetherit.kfashion.ws.model.support.KfashionUserStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KfashionUserStatusChange {
    private long userId;
    private KfashionUserStatus statusCode;
}

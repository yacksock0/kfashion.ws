package io.aetherit.kfashion.ws.model;

import io.aetherit.kfashion.ws.model.support.KfashionUserType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KfashionSimpleUser implements Serializable {
    public static final long serialVersionUID = 1L;

    private long userId;
    private String email;
    private String userName;
    private String nickName;
    private KfashionUserType typeCode;
    private String profileUrl;
    private boolean recordFlag;
    private LocalDateTime createdDatetime;
    private LocalDateTime modifiedDatetime;
}

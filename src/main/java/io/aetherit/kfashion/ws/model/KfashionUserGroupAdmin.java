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
public class KfashionUserGroupAdmin {

    private String userId;
    private int groupNo;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;

}

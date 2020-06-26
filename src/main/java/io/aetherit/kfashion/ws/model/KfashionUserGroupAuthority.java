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
public class KfashionUserGroupAuthority {

    private int authorityNo;
    private String authorityName;
    private int groupNo;
    private String groupName;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;

}

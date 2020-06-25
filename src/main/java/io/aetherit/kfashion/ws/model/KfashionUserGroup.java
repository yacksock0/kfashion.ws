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
public class KfashionUserGroup {

    private int no;
    private String groupName;
    private String authorityName;
    private int authorityNo;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;

}

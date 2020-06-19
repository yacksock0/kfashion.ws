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
public class KfashionWork {

    private Long no;
    private String workName;
    private String workState;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;
}

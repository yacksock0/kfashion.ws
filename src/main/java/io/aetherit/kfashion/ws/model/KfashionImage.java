package io.aetherit.kfashion.ws.model;


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
public class KfashionImage implements Serializable {

    private Long workNo;
    private byte[] imgData;
    private String createdId;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;
}

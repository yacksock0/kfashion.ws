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
public class KfashionImage {

    private Long workNo;
    private byte[] imgData;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;
}

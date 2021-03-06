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
public class KfashionWorkHistory {
    private long workNo;
    private int workStep;
    private int no;
    private String createdId;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;

    private int totalWork;
    private int finishWork;
}

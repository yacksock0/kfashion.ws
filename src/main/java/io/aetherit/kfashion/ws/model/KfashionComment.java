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
public class KfashionComment {

    private Long workNo;
    private int workStep;
    private int workStep1;
    private int workStep2;
    private int workType;
    private int workType1;
    private int workType2;
    private int workType3;
    private int workType4;
    private int commentNo;
    private char complete;
    private String comment;
    private String sendId;
    private String receiveId;
    private LocalDateTime createdDatetime;
    private LocalDateTime authorityDatetime;

}

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
public class KfashionImageLocationPolygonPoint {
    private Long workNo;
    private int workStep;
    private int rectNo;
    private int polyNo;
    private int no;
    private float locationX;
    private float locationY;
    private int locationSeq;
    private String createdId;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;
    private Object points;

}

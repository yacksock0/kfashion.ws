package io.aetherit.kfashion.ws.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KfashionImageLocationPolygonPoint {
    private Long workNo;
    private int workStep;
    private int polyNo;
    private int no;
    private float locationX;
    private float locationY;
    private int locationSeq;
    private String createdId;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;
    private List<points> points;
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class points
    {
        private float x;
        private float y;
    }

}

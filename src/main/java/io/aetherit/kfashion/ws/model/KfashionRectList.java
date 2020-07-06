package io.aetherit.kfashion.ws.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KfashionRectList {

    private int id;
    private int left;
    private int top;
    private int width;
    private int height;
    private Double slateX;
    private Double slateY;

    private String createdId;
    private Long workNo;
    private int rectNo;
    private int workStep;


}

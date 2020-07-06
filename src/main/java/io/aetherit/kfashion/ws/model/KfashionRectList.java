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
    private float left;
    private float top;
    private int width;
    private int height;
    private float scaleX;
    private float scaleY;

    private String createdId;
    private Long workNo;
    private int workStep;


}


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
    private Double scaleX;
    private Double scaleY;

//    private String createdId;
//    private Long workNo;
//    private int workStep;


}

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
public class KfashionImageLocationRect {

    private Long workNo;
    private int workStep;
    private int rectNo;
    private float locationX;
    private float locationY;
    private int locationWidth;
    private int locationHeight;
    private float scaleX;
    private float scaleY;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;

    private String createdId;

}

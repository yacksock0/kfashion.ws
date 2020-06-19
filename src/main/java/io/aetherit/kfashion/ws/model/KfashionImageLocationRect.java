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
    private int workSubStep;
    private int locationX;
    private int locationY;
    private int locationWidth;
    private int locationHeight;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;

}

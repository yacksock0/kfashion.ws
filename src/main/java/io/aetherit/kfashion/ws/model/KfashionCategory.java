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
public class KfashionCategory {

    private int no;
    private String categoryName;
    private int categoryStep;
    private int groupNo;
    private String createdId;
    private String updatedId;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;
}

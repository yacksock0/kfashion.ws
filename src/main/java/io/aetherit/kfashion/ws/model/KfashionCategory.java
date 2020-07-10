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
    private String categoryType;
    private String categoryName;
    private int categoryStep;
    private int groupNo;
    private String createdId;
    private LocalDateTime createdDatetime;
    private String updatedId;
    private LocalDateTime updatedDatetime;
}

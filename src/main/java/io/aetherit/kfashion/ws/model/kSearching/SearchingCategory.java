package io.aetherit.kfashion.ws.model.kSearching;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchingCategory {
    private Long no;
    private int categoryType;
    private String categoryName;
    private int categoryStep;
    private int groupNo;
    private String createdId;
    private String updatedId;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;
}

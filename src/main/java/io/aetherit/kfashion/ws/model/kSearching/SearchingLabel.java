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
public class SearchingLabel {
    private Long workNo;
    private int workStep;
    private int labelNo;
    private int no;
    private int categoryNo;
    private Long categoryItemNo;
    private String createdId;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;

}

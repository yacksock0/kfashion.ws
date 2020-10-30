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
public class SearchingStyle {
    private int no;
    private int categoryType;
    private int categoryNo;
    private String categoryItemName;

    //extention
    private String categoryItemMemo;
    private String createdId;
    private String updatedId;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;
}

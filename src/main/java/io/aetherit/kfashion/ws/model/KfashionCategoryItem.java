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
public class KfashionCategoryItem {

    private int no;
    private int categoryNo;
    private String categoryType;
    private String categoryItemName;
    private String categoryItemMemo;
    private String createdId;
    private String updatedId;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;

}

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
public class SearchingInfo {
    private String category;
    private int categoryType;
    private String style;
    private int stylType;
    private String color;
    private int colorType;

}

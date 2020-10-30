package io.aetherit.kfashion.ws.model.kSearching;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchingImage implements Serializable {

    private Long workNo;
    private byte[] imgData;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;
}

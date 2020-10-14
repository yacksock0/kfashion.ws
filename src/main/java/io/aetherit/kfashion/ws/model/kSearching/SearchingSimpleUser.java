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
public class SearchingSimpleUser implements Serializable {
    public static final long serialVersionUID = 1L;

    private String id;
    private String password;
    private String name;
    private String userType;
    private String isPoll;

    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;

}

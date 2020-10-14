package io.aetherit.kfashion.ws.model.kMatching;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MatchingUser {
    private String id;
    private String password;
    private String name;
    private String userType;
    private String isPoll;

    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;

}

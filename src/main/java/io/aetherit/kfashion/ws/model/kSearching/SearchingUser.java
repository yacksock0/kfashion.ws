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
public class SearchingUser {
    private String id;
    private String password;
    private String name;
    private String nickName;
    private String userType;
    private String isPoll;
    private int question1;
    private String answer1;
    private int question2;
    private String answer2;
    private int question3;
    private String answer3;

    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;

}

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
public class KfashionUserInfo {
    private String id;
    private String password;
    private String name;
    private String birth;
    private String gender;
    private String email;
    private String phone;
    private int groupNo;
    private String nickName;
    private char isAdmin;
    private char isApproved;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;

}

package io.aetherit.kfashion.ws.model;

import java.time.LocalDateTime;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import io.aetherit.kfashion.ws.model.support.KfashionUserStatus;
import io.aetherit.kfashion.ws.model.support.KfashionUserType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KfashionUser {

    private long userId;

    @NotNull
    @NotBlank(message = "이메일을 입력하세요.")
    @Email(message = "이메일 형식이 아닙니다.")
    private String email;

    @NotNull
//    @PasswordCheck(message = "비밀번호는 최소 8자리 이상, 대문자를 포함해야 합니다.")
    private String password;

    @NotNull
    private String userName;

    private String nickName;

    private KfashionUserType typeCode;

    private KfashionUserStatus statusCode;

    private int availablePoint;

    private boolean recordFlag;

    private LocalDateTime createdDatetime;
    private LocalDateTime modifiedDatetime;
}

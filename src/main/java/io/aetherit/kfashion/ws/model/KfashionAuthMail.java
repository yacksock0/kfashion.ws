package io.aetherit.kfashion.ws.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KfashionAuthMail {
    private String email;
    private String authKey;
}

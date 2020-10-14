package io.aetherit.kfashion.ws.model.kTagging;

import io.aetherit.kfashion.ws.model.KfashionSimpleUser;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaggingUserToken {
    private String token;
    private TaggingSimpleUser user;
}

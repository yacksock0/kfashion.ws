package io.aetherit.kfashion.ws.model.kMatching;

import io.aetherit.kfashion.ws.model.kSearching.SearchingSimpleUser;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MatchingUserToken {
    private String token;
    private MatchingSimpleUser user;
}

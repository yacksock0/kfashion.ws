package io.aetherit.kfashion.ws.model.kSearching;

import io.aetherit.kfashion.ws.model.kTagging.TaggingSimpleUser;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchingUserToken {
    private String token;
    private SearchingSimpleUser user;
}

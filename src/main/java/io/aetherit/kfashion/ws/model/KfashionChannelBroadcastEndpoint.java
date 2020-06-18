package io.aetherit.kfashion.ws.model;

import io.aetherit.kfashion.ws.model.support.KfashionChannelBroadcastType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KfashionChannelBroadcastEndpoint {
    private String channelId;
    private KfashionChannelBroadcastType typeCode;
    private String broadcastEndpoint;
    private String broadcastUser;
    private String broadcastPassword;
    private String playbackEndpoint;
    private LocalDateTime createdDatetime;
}

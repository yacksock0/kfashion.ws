package io.aetherit.kfashion.ws.model;

import java.time.LocalDateTime;

import io.aetherit.kfashion.ws.model.support.KfashionChannelStatus;
import io.aetherit.kfashion.ws.model.support.KfashionChannelType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KfashionChannel {
    private String channelId;
    private long userId;
    private String channelName;
    private String channelDesc;
    private LocalDateTime liveStartDatetime;
    private LocalDateTime liveEndDatetime;
    private int liveTotalTime;
    private int joinLimitCount;
    private int reservedPoint;
    private int durationTime;
    private KfashionChannelType typeCode;
    private KfashionChannelStatus statusCode;
    private String statusReason;					// 생성실패시 관련 내용 추가
    private String thumbnailUrl;					// 채널대표 썸네일 URL
    private Boolean subScreenAvailableFlag;			// 부화면 사용 여부
    private LocalDateTime createdDatetime;
    private LocalDateTime modifiedDatetime;
}

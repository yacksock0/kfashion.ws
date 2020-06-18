package io.aetherit.kfashion.ws.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class KfashionUserProfile {
    private long userId;
    private String profileKey;
    private String profileImgDomain;
    private String profileImgPath;
    private int classTime;

    @DateTimeFormat(pattern = "kk:mm:ss")
    private LocalTime workStartTime;

    @DateTimeFormat(pattern = "kk:mm:ss")
    private LocalTime workEndTime;

    private LocalDateTime createdDatetime;
}

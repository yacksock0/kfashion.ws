package io.aetherit.kfashion.ws.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KfashionStudies {
    private int studies_labeling_num;
    private String studies_neckline;
    private String studies_detail;
    private String studies_sleeve_shape;
    private String studies_create_id;
    private Date studies_create_date;
    private String studies_modify_id;
    private Date studies_modify_date;
}

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
public class KfashionImageLabeling {

    private int labeling_num;
    private String labeling_img;
    private String labeling_create_id;

    private Date labeling_create_date;
    private String labeling_modify_id;
    private Date labeling_modify_date;
}

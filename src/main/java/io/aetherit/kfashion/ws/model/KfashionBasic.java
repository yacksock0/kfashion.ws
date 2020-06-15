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
public class KfashionBasic {
    private int basic_labeling_num;
    private String basic_category;
    private String basic_color;
    private String basic_sleeve_length;
    private String basic_clothing_length;
    private String basic_print;
    private String basic_brand;
    private String basic_gender;
    private String basic_create_id;
    private Date basic_create_date;
    private String basic_modify_id;
    private Date basic_modify_date;
}

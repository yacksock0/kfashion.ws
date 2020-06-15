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
public class KfashionProfessional {
    private int professional_labeling_num;
    private String professional_item;
    private String professional_style;
    private String professional_material;
    private String professional_shape;
    private String professional_color;
    private String professional_pattern;
    private String professional_create_id;
    private Date professional_create_date;
    private String professional_modify_id;
    private Date professional_modify_date;
}

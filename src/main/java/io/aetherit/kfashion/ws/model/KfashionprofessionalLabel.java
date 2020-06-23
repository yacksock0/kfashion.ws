package io.aetherit.kfashion.ws.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KfashionprofessionalLabel {


    private String style;
    private String category;
    private String detail;
    private String print;
    private String texture;
    private String length;
    private String neckLine;
    private String colorKara;
    private String fit;
    private String safe;
    private String Silhouette;

}

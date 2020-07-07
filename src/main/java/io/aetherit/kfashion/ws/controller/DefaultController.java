package io.aetherit.kfashion.ws.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class DefaultController {
    @RequestMapping({"/", "/home"})
    public String getUIResource() {
        return "forward:/index.html";
    }


//    @RequestMapping({"/", "/home"})
//    public String Home() {
//        return "forward:../src/views/Home.js";
//    }
//
//    @RequestMapping({"/step"})
//    public String step() {
//        return "forward:../src/views/Step.js";
//    }
//    @RequestMapping({"/step2"})
//    public String step2() {
//        return "forward:../src/views/Step2.js";
//    }
//    @RequestMapping({"/step3"})
//    public String step3() {
//        return "forward:../src/views/Step3.js";
//    }
//    @RequestMapping({"/Step/ImageUpload"})
//    public String ImageUpload() {
//        return "forward:../src/labeling/ImageUpload.js";
//    }
//    @RequestMapping({"/Step/BoundaryBox"})
//    public String BoundaryBox() {
//        return "forward:../views/labeling/BoundaryBox.js";
//    }
//    @RequestMapping({"/Step/Polygon"})
//    public String Polygon() {
//        return "forward:../views/labeling/Polygon.js";
//    }
//    @RequestMapping({"/admin/createGroup"})
//    public String createGroup() {
//        return "forward:../views/admin/AdminGroup.js";
//    }
//    @RequestMapping({"/admin/userList"})
//    public String userList() {
//        return "forward:../src/admin/UserLis.js";
//    }

}

package io.aetherit.kfashion.ws.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class DefaultController {
    @RequestMapping({"/", "/home", "/step", "/step2", "/step3", "/Step/**","/Step2/**", "/admin/**", "/SignUp", "/sign/success" })
    public String getUIResource() {
        return "forward:/index.html";
    }
}

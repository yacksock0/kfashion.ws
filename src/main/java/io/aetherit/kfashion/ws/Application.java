package io.aetherit.kfashion.ws;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "io.aetherit.kfashion.ws")
public class Application {
    public static void main(String[] args) {

        SpringApplication.run(Application.class, args);
    }
}

package com.myjobmate;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class MyJobMateApplication {

    public static void main(String[] args) {
        SpringApplication.run(MyJobMateApplication.class, args);
    }
}

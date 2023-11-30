package com.smallbear.studsy.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    @RequestMapping("/hello")
    public String sayHello(){
        return "HELLO";
    }

    @RequestMapping("/randNumer")
    public String randNumber(){
        double number = (Math.random() * 10);
        return new String(String.valueOf(number));
    }
}

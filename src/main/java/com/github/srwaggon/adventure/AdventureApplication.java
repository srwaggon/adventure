package com.github.srwaggon.adventure;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@SpringBootApplication
public class AdventureApplication {

  public static void main(String[] args) {
    SpringApplication.run(AdventureApplication.class);
  }

  @Controller
  static class MainController {
    @GetMapping("/")
    public String getIndex() {
      return "index";
    }
  }
  
}

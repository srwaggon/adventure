package com.github.srwaggon.adventure.test;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Controller
public class JsonMessageController {

  @MessageMapping("jsonMessage")
  public JsonMessage jsonMessage(JsonMessage jsonMessage) {
    System.out.println("Received: " + jsonMessage.getMessage());
    return new JsonMessage("Hello: " + jsonMessage.getMessage());
  }

}

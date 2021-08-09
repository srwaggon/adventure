package com.github.srwaggon.adventure.test;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Configuration
@EnableWebSocket
public class JsonMessageConfiguration implements WebSocketConfigurer {

  @Autowired
  private ObjectMapper objectMapper;

  @Override
  public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
    registry.addHandler(new TextWebSocketHandler() {
      @Override
      public void handleMessage(WebSocketSession session, WebSocketMessage<?> webSocketMessage) throws Exception {
        Object payload = webSocketMessage.getPayload();
        JsonMessage jsonMessage = objectMapper.readValue(payload.toString(), JsonMessage.class);
        String message = jsonMessage.getMessage();
        System.out.println("Received: " + message);
        session.sendMessage(new TextMessage("Hello: " + message));
      }
    }, "/jsonMessage");
  }
}

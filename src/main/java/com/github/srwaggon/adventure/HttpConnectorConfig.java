package com.github.srwaggon.adventure;

import org.apache.catalina.connector.Connector;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
public class HttpConnectorConfig {

  @Bean
  @Profile("production")
  public WebServerFactoryCustomizer<TomcatServletWebServerFactory> customizer() {
    return factory -> {
      Connector http = new Connector(TomcatServletWebServerFactory.DEFAULT_PROTOCOL);
      http.setPort(8080);
      factory.addAdditionalTomcatConnectors(http);
    };
  }
}

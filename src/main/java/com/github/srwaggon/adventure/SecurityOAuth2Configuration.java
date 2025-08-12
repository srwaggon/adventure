package com.github.srwaggon.adventure;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityOAuth2Configuration {

  private final Environment environment;

  public SecurityOAuth2Configuration(Environment environment) {
    this.environment = environment;
  }

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

    if (environment.acceptsProfiles("production")) {
      http.requiresChannel(channel -> channel.anyRequest().requiresSecure());
    }

    http
        .authorizeHttpRequests(auth -> auth
            .anyRequest().authenticated()
        )
        .oauth2Login(Customizer.withDefaults())
        .logout(logout -> logout
            .logoutSuccessUrl("/")
            .invalidateHttpSession(true)
            .clearAuthentication(true)
            .deleteCookies("JSESSIONID")
        )
        .csrf(AbstractHttpConfigurer::disable);

    return http.build();
  }
}

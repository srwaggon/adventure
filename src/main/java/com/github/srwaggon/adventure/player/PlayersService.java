package com.github.srwaggon.adventure.player;

import com.github.srwaggon.adventure.util.Repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.stereotype.Service;

@Service
public class PlayersService {

  @Autowired
  private Repository<Player, String> playerRepository;

  @EventListener
  public void authSuccessEventListener(AuthenticationSuccessEvent authorizedEvent) {
    System.out.println("User Oauth2 login success");
    DefaultOidcUser principal = (DefaultOidcUser) authorizedEvent.getAuthentication().getPrincipal();
    System.out.println("This is success event : " + principal);

    String sub = principal.getAttribute("sub");
    String name = principal.getAttribute("name");
    playerRepository.findById(sub)
        .orElseGet(() -> playerRepository.save(new Player(sub, name)));
  }

}

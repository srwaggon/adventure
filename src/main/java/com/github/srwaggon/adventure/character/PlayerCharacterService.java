package com.github.srwaggon.adventure.character;

import com.github.srwaggon.adventure.card.Card;
import com.github.srwaggon.adventure.card.CardService;
import com.github.srwaggon.adventure.player.Player;
import com.github.srwaggon.adventure.player.PlayersService;
import com.github.srwaggon.adventure.util.Repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PlayerCharacterService {

  @Autowired
  private Repository<PlayerCharacter, UUID> characterRepository;

  @Autowired
  private PlayersService playersService;

  @Autowired
  private CardService cardService;

  public PlayerCharacter saveNewCharacter() {
    Player currentPlayer = playersService.getCurrentPlayer();

    PlayerCharacter character = new PlayerCharacter();

    PlayerCharacter savedCharacter = characterRepository.save(character);
    playersService.addCharacter(currentPlayer, character);
    return savedCharacter;
  }

  public List<PlayerCharacter> getCurrentPlayersCharacters() {
    return playersService.getCurrentPlayer()
        .getCharacters().stream()
        .map(uuid -> characterRepository.findById(uuid))
        .filter(Optional::isPresent)
        .map(Optional::get)
        .collect(Collectors.toList());
  }

  public PlayerCharacter getCharacterById(UUID playerId) {
    return characterRepository.findById(playerId)
        .orElseThrow(() -> new RuntimeException("Player Character not found with id " + playerId));
  }

  public PlayerCharacter addCardToPlayer(UUID playerId, String cardId) {
    Card card = cardService.getById(cardId);
    PlayerCharacter character = getCharacterById(playerId);
    character.getCards().add(card.getId());
    return characterRepository.save(character);
  }
}

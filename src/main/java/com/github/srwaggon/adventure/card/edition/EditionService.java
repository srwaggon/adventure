package com.github.srwaggon.adventure.card.edition;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EditionService {

  @Autowired
  private EditionRepository editionRepository;

  public List<Edition> getAll() {
    return editionRepository.findAll();
  }

  public Edition save(Edition edition) {
    return editionRepository.save(edition);
  }
}

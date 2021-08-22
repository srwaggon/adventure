package com.github.srwaggon.adventure.card.edition;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/editions")
public class EditionController {

  @Autowired
  private EditionService editionService;

  @GetMapping()
  public List<Edition> getAll() {
    return editionService.getAll();
  }

  @PostMapping()
  public Edition newEdition(@RequestBody Edition edition) {
    edition.setId(UUID.randomUUID());
    return editionService.save(edition);
  }
}

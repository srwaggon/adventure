package com.github.srwaggon.adventure.proficiency;

import com.google.common.collect.Lists;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/proficiencies")
public class ProficiencyController {

  @GetMapping
  public List<Proficiency> getAll() {
    return Lists.newArrayList(Proficiency.values());
  }
}

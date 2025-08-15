package com.github.srwaggon.adventure.util;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.IntStream;

public class DiceRoller {

  public static void main(String[] args) {
    IntStream.range(0, 10)
        .mapToObj(i ->
            new DicePool()
                .withSize(10)
                .roll()
                .withExplosions(true)
                .withTargetNumber(7)
                .withAdvantage()
//              .withDisadvantage()
                .withThreshold(i / 2))
        .forEach(System.out::println);
  }

  private static class DicePool {
    private int size = 10;

    public DicePool withSize(int size) {
      this.size = size;
      return this;
    }

    public RollResult roll() {
      Random random = new Random();
      List<Integer> dice = new ArrayList<>();
      int i = 0;
      int diceToRoll = size;
      while (i < diceToRoll) {
        int roll = random.nextInt(10) + 1;
        if (roll == 10) {
          diceToRoll++;
        }
        dice.add(roll);
        i++;
      }
      return new RollResult()
          .withDice(dice)
          .withOrganicDice(size)
          ;
    }
  }

  private static class RollResult {
    private List<Integer> dice = new ArrayList<>();
    private int organicDice = -1;
    private int targetNumber = 7;
    private int threshold = 0;
    private int successes = 0;
    private int botches = 0;
    private boolean withExplosions = false;
    private boolean withAdvantage = false;
    private boolean withDisadvantage = false;

    public RollResult withDice(List<Integer> dice) {
      this.dice = dice;
      return this.calculate();
    }

    public RollResult withExplosions(boolean withExplosions) {
      this.withExplosions = withExplosions;
      return this.calculate();
    }

    public RollResult withOrganicDice(int organicDiceCount) {
      this.organicDice = organicDiceCount;
      return this.calculate();
    }

    public RollResult withTargetNumber(int targetNumber) {
      this.targetNumber = targetNumber;
      return this.calculate();
    }

    public RollResult withAdvantage() {
      this.withAdvantage = true;
      return this.calculate();
    }

    public RollResult withDisadvantage() {
      this.withDisadvantage = true;
      return this.calculate();
    }

    public RollResult withThreshold(int threshold) {
      this.threshold = threshold;
      return this.calculate();
    }

    private RollResult calculate() {
      successes = 0;
      botches = 0;
      int explosions = Math.max(0, dice.size() - organicDice);
      int i = 0;
      while (i < organicDice + (withExplosions ? explosions : 0) || organicDice == -1 && i < dice.size()) {
        int score = dice.get(i);
        if (score >= targetNumber()) {
          successes++;
        }
        if (score == 1) {
          botches++;
        }
        i++;
      }
      return this;
    }

    private int targetNumber() {
      return targetNumber + (hasAdvantage() ? -2 : 0) + (hasDisadvantage() ? +2 : 0);
    }

    public boolean hasAdvantage() {
      return withAdvantage && !withDisadvantage;
    }

    public boolean hasDisadvantage() {
      return withDisadvantage && !withAdvantage;
    }

    public int getTotalSuccesses() {
      return successes;
    }

    public int getSuccesses() {
      return Math.max(0, successes - botches - threshold);
    }

    public int getBotches() {
      return botches;
    }

    public boolean isBotch() {
      return botches > 0 && successes == 0;
    }

    public boolean isFailure() {
      return getSuccesses() == 0;
    }

    public String result() {
      return isBotch() ? "Botch"
          : isFailure() ? "Failure"
              : "Success";
    }

    @Override
    public String toString() {
      String threshold = this.threshold > 0 ? " - " + this.threshold + " threshold" : "";
      String successDetails = " (" + getTotalSuccesses() + " successes - " + getBotches() + " botch" + threshold + ")";
      String advantageDetails = hasAdvantage() ? " (Advantage)" : hasDisadvantage() ? " (Disadvantage)" : "";
      String explosionDetails = withExplosions ? " + " + explosionRolls().stream().sorted().toList().reversed() : "";
      String rollDetails = "(" + organicRolls().stream().sorted().toList().reversed() + explosionDetails + ": TN " + targetNumber() + advantageDetails + ")";
      return result() + " : " + getSuccesses() + successDetails + rollDetails;
    }

    private List<Integer> explosionRolls() {
      return dice.subList(organicDice, dice.size());
    }

    private List<Integer> organicRolls() {
      return dice.subList(0, organicDice);
    }
  }
}

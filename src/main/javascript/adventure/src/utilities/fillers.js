export const demoCard0 = {
  "id": "4e4b3d60-7923-4fcf-8358-cb1dc0b59072",
  "name": "Torch",
  "type": "ITEM",
  "quality": "COMMON",
  "image": "https://2.bp.blogspot.com/-nOw8qPiBJs0/WZMz4PNXbTI/AAAAAAAAJ-E/ZX14R-0AzwoCKdXmm9ojMqosMDqIwM1KQCLcBGAs/s1600/Efflam%2BMercier.jpg",
  "imageSize": "130%",
  "body": "Provides light nearby for 1 hour.",
  "bodyOpacity": 0.5,
  "flavor": "\"You aren't afraid of the dark, are you?\"", "author": null, "darkText": false
};

export const demoCard1 = {
  "id": "754ad33c-7233-4d6b-bd7f-8a073334f035",
  "name": "Longsword",
  "image": "https://cdn.cardsrealm.com/images/cartas/crop/m12-magic-2012/greatsword-209-med.jpeg",
  "imageSize": "100%",
  "type": "EQUIPMENT",
  "body": "Requires 3+ Strength to equip.\nWhen used to attack, roll [d10] equal to your Strength with a difficulty of 6 to attack the target for 3 damage.",
  "flavor": "",
  "author": "Demo author",
  "quality": "UNCOMMON",
  "costInExperience": 4,
  "prerequisites": {
    "attributePrerequisites": [],
    "skillPrerequisites": [],
    "cardPrerequisites": ["3475aa37-f533-43b8-a804-ce8527545ec8", "754ad33c-7233-4d6b-bd7f-8a073334f035"]
  }
};

export const demoCard2 = {
  "id": "3475aa37-f533-43b8-a804-ce8527545ec8",
  "name": "Platemail",
  "image": "https://i.pinimg.com/originals/f3/f1/af/f3f1af95d8109eaedd285a3dace1f7a2.jpg",
  "imageSize": "100%",
  "type": "EQUIPMENT",
  "body": "Requires 3+ Strength to equip.\nIncreases your maximum HP by 6.",
  "flavor": "\"Ahck! An itch!\"",
  "author": "Demo author",
  "quality": "RARE",
  "darkText": true,
  "bodyOpacity": 80
};

export const demoCard3 = {
  "id": "92667992-3ae5-419d-8720-8d5bbf9b1324",
  "name": "Gentle Persuasion",
  "image": "https://i.pinimg.com/originals/05/b7/21/05b72118277d82225acbaf7b1bf69fb0.jpg",
  "imageSize": "160%",
  "type": "REACTION",
  "body": "Pay 1 Reputation.\nThe reacted attack is directed at you instead of its original target.",
  "flavor": "Sometimes, what you say is less important",
  "quality": "EPIC",
};

export const demoCards = [
  demoCard0,
  demoCard1,
  demoCard2,
  demoCard3,
];

export const demoCharacter = {
  "id": "e24f5654-f4c1-4c71-acbe-1b795626a138",
  "name": "Demo Character",
  "strength": {
    "name": "strength",
    "value": 1,
    "minimum": 1,
    "maximum": 5,
  },
  "dexterity": {
    "name": "dexterity",
    "value": 1,
    "minimum": 1,
    "maximum": 5,
  },
  "constitution": {
    "name": "constitution",
    "value": 3,
    "minimum": 1,
    "maximum": 5,
  },
  "presence": {
    "name": "presence",
    "value": 1,
    "minimum": 1,
    "maximum": 5,
  },
  "influence": {
    "name": "influence",
    "value": 1,
    "minimum": 1,
    "maximum": 5,
  },
  "composure": {
    "name": "composure",
    "value": 1,
    "minimum": 1,
    "maximum": 5,
  },
  "intelligence": {
    "name": "intelligence",
    "value": 1,
    "minimum": 1,
    "maximum": 5,
  },
  "wits": {
    "name": "wits",
    "value": 1,
    "minimum": 1,
    "maximum": 5,
  },
  "resolve": {
    "name": "resolve",
    "value": 1,
    "minimum": 1,
    "maximum": 5,
  },
  "stamina": {
    "name": "stamina",
    "value": 3,
    "minimum": 1,
    "maximum": 6,
  },
  "confidence": {
    "name": "confidence",
    "value": 1,
    "minimum": 1,
    "maximum": 2,
  },
  "focus": {
    "name": "focus",
    "value": 1,
    "minimum": 1,
    "maximum": 2,
  },
  "health": {
    "name": "health",
    "value": 10,
    "minimum": 1,
    "maximum": 20,
  },
  "reputation": {
    "name": "reputation",
    "value": 10,
    "minimum": 1,
    "maximum": 10,
  },
  "mana": {
    "name": "mana",
    "value": 10,
    "minimum": 1,
    "maximum": 10,
  },
  "cards": demoCards,
  proficiencies: [],
  skills: {
    "fun": {
      "name": "fun",
      "value": 4,
      "minimum": 0,
      "maximum": 5,
    },
    "amazing": {
      "name": "amazing",
      "value": 3,
      "minimum": 0,
      "maximum": 5,
    },
    "heroics": {
      "name": "heroics",
      "value": 3,
      "minimum": 0,
      "maximum": 5,
    },
    "mercantile": {
      "name": "mercantile",
      "value": 3,
      "minimum": 0,
      "maximum": 5,
    },
    "beastmastery": {
      "name": "beastmastery",
      "value": 2,
      "minimum": 0,
      "maximum": 5,
    },
    "trickery": {
      "name": "trickery",
      "value": 2,
      "minimum": 0,
      "maximum": 5,
    },
    "card games": {
      "name": "card games",
      "value": 1,
      "minimum": 0,
      "maximum": 5,
    },
    "storytelling": {
      "name": "storytelling",
      "value": 1,
      "minimum": 0,
      "maximum": 5,
    },
    "bravado": {
      "name": "bravado",
      "value": 0,
      "minimum": 0,
      "maximum": 5,
    }
  }
};

export const demoPlayer = {"id": "100131200358491013460", "name": "demo-player", "characters": [demoCharacter.id]};

export const demoGame = {
  "id": "0dd03bb8-d1a9-49bb-a9da-62047332b102",
  "name": "Bowser's Big Bean Burrito",
  "owner": demoPlayer.id,
  "players": [demoPlayer.id],
};

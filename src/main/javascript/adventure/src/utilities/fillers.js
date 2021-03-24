export const demoCard0 = {
  'id': '4e4b3d60-7923-4fcf-8358-cb1dc0b59072',
  'name': 'Torch',
  'type': 'ITEM',
  'image': 'https://2.bp.blogspot.com/-nOw8qPiBJs0/WZMz4PNXbTI/AAAAAAAAJ-E/ZX14R-0AzwoCKdXmm9ojMqosMDqIwM1KQCLcBGAs/s1600/Efflam%2BMercier.jpg',
  'imageSize': '130%',
  'body': 'Provides light nearby for 1 hour.',
  'flavor': '"You aren\'t afraid of the dark, are you?"',
};

export const demoCard1 = {
  'id': '754ad33c-7233-4d6b-bd7f-8a073334f035',
  'name': 'Longsword',
  'image': 'https://cdn.cardsrealm.com/images/cartas/crop/m12-magic-2012/greatsword-209-med.jpeg',
  'imageSize': '100%',
  'type': 'EQUIPMENT',
  'body': 'Requires 3+ Strength to equip.\nWhen used to attack, roll [d10] equal to your Strength with a difficulty of 6 to attack the target for 3 damage.',
  'flavor': '',
};

export const demoCard2 = {
  'id': '3475aa37-f533-43b8-a804-ce8527545ec8',
  'name': 'Platemail',
  'image': 'https://i.pinimg.com/originals/f3/f1/af/f3f1af95d8109eaedd285a3dace1f7a2.jpg',
  'imageSize': '100%',
  'type': 'EQUIPMENT',
  'body': 'Requires 3+ Strength to equip.\nIncreases your maximum HP by 6.',
  'flavor': '"Ahck! An itch!"',
};

export const demoCard3 = {
  'id': '92667992-3ae5-419d-8720-8d5bbf9b1324',
  'name': 'Gentle Persuasion',
  'image': 'https://i.pinimg.com/originals/05/b7/21/05b72118277d82225acbaf7b1bf69fb0.jpg',
  'imageSize': '160%',
  'type': 'REACTION',
  'body': 'Pay 1 Reputation.\nThe reacted attack is directed at you instead of its original target.',
  'flavor': 'Sometimes, what you say is less important',
};

export const demoCards = [
  demoCard0,
  demoCard1,
  demoCard2,
  demoCard3,
];

export const demoCharacter = {
  'id': 'e24f5654-f4c1-4c71-acbe-1b795626a138',
  'name': 'New Character',
  'strength': {
    'value': 1,
    'minimum': 1,
    'maximum': 5,
  },
  'dexterity': {
    'value': 1,
    'minimum': 1,
    'maximum': 5,
  },
  'constitution': {
    'value': 3,
    'minimum': 1,
    'maximum': 5,
  },
  'presence': {
    'value': 1,
    'minimum': 1,
    'maximum': 5,
  },
  'influence': {
    'value': 1,
    'minimum': 1,
    'maximum': 5,
  },
  'composure': {
    'value': 1,
    'minimum': 1,
    'maximum': 5,
  },
  'intelligence': {
    'value': 1,
    'minimum': 1,
    'maximum': 5,
  },
  'wits': {
    'value': 1,
    'minimum': 1,
    'maximum': 5,
  },
  'resolve': {
    'value': 1,
    'minimum': 1,
    'maximum': 5,
  },
  'stamina': {
    'value': 3,
    'minimum': 1,
    'maximum': 6,
  },
  'confidence': {
    'value': 1,
    'minimum': 1,
    'maximum': 2,
  },
  'focus': {
    'value': 1,
    'minimum': 1,
    'maximum': 2,
  },
  'health': {
    'value': 10,
    'minimum': 1,
    'maximum': 20,
  },
  'willpower': {
    'value': 10,
    'minimum': 1,
    'maximum': 10,
  },
  'cards': demoCards,
};

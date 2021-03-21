import './App.css';

import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import Card from './card/Card.jsx';
import SpecialCard from './specialcard/SpecialCard.jsx';
import FlavorText from './flavor/FlavorText.jsx'
import {D10} from './dice/DiceIcon.jsx';
import CharacterPage from './character/page/CharacterPage.jsx';


function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/character">CharacterSheet</Link>
          </li>
        </nav>
        <Switch>

          <Route path="/character">
            <CharacterPage />
          </Route>
          <Route path="/">
            <Cards />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

function Cards() {
  const cardData = [
    {
      "name": "Longsword",
      "image": "https://cdn.cardsrealm.com/images/cartas/crop/m12-magic-2012/greatsword-209-med.jpeg",
      "type": "Equipment",
      "body": [
        "Requires 3+ Strength to equip.", <br />,
        "When used to attack, roll ", <D10 />," equal to your Strength with a difficulty of 6 to attack the target for 3 damage."
      ]
    },
    {
      "name": "Torch",
      "image": "https://2.bp.blogspot.com/-nOw8qPiBJs0/WZMz4PNXbTI/AAAAAAAAJ-E/ZX14R-0AzwoCKdXmm9ojMqosMDqIwM1KQCLcBGAs/s1600/Efflam%2BMercier.jpg",
      "type": "Item",
      "body": [
        "Provides light nearby for 1 hour.", <br />,
        <FlavorText>"It wasn't until the torch cast light that they realized they weren't alone."<br />—Buddha, probably</FlavorText>
      ]
    },
    {
      "name": "Iron-Reaver Soul Stealer",
      "image": "https://static.wikia.nocookie.net/inuyasha/images/6/69/Inuyasha_Iron_Reaver_Soul_Stealer_2.png",
      "type": "Ability",
      "body": [
        "Pay 1 Stamina.", <br />,
        "Roll ", <D10 />," equal to your Strength with a difficulty of 6.", <br />,
        "If successful, attack the target for damage equal to 3 + the number of successes."
      ]
    },
  ]
  const cards = cardData.map((cardProps, i) => <Card {...cardProps} key={i} />);
  cards.push(
    <SpecialCard {...{
      name: "Torch",
      image: "https://2.bp.blogspot.com/-nOw8qPiBJs0/WZMz4PNXbTI/AAAAAAAAJ-E/ZX14R-0AzwoCKdXmm9ojMqosMDqIwM1KQCLcBGAs/s1600/Efflam%2BMercier.jpg",
      imageSize: "130%",
      type: "Equipment",
      "body": [
        "Provides light nearby for 1 hour.", <br />,
        <FlavorText>"It wasn't until the torch cast light that they realized they weren't alone."<br />—Buddha, probably</FlavorText>
      ]
    }}/>
  );
  cards.push(
    <SpecialCard {...{
      name: "Platemail",
      image: "https://i.pinimg.com/originals/f3/f1/af/f3f1af95d8109eaedd285a3dace1f7a2.jpg",
      imageSize: "100%",
      type: "Equipment",
      body: [
        "Requires 3+ Strength to equip.", <br />,
        "Increases your maximum HP by 6.",
        <FlavorText>"Ahck! An itch!"</FlavorText>
      ]
    }}/>
  );
  cards.push(
    <SpecialCard {...{
      name: "Firebolt",
      image: "https://i.pinimg.com/736x/51/92/9e/51929ed4f9e5ac8c5fdbc50e5f405a72.jpg",
      imageSize: "100%",
      type: "Ability",
      body: [
        "Pay 1 Mana.", <br />,
        "Deal 3 fire damage to any target.",
        <FlavorText>"Liar liar, pants on fire"</FlavorText>
      ]
    }}/>
  );
  cards.push(
    <SpecialCard {...{
      name: "Fireball",
      image: "https://i.pinimg.com/originals/c5/5b/34/c55b34284c78a722f47e135c6766df3a.jpg",
      imageSize: "100%",
      type: "Ability",
      body: [
        "Pay 2 Mana.", <br />,
        "Roll ", <D10 />," equal to your Intelligence with a difficulty of 6.", <br />,
        "Deal fire damage to any target for damage equal to 3 + the number of successes."
      ]
    }}/>
  );
  cards.push(
    <SpecialCard {...{
      name: "Meteor",
      image: "https://www.belloflostsouls.net/wp-content/uploads/2020/02/fireball-in-waterdeep.jpg",
      imageSize: "140%",
      type: "Ability",
      body: [
        "Pay 3 Mana.", <br />,
        "Roll ", <D10 />," equal to your Intelligence with a difficulty of 6.", <br />,
        "Deal 5 fire damage each to targets equal to the number of successes."
      ]
    }}/>
  );
  cards.push(
    <SpecialCard {...{
      name: "Evade",
      image: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9181d3c1-9308-4d2a-ae50-660f12f12a57/dc6erue-1ad69fbb-ab66-490f-86df-3a4dadc226dd.jpg/v1/fill/w_900,h_1125,q_75,strp/critical_role___beau_dodge_by_takayuuki_dc6erue-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD0xMTI1IiwicGF0aCI6IlwvZlwvOTE4MWQzYzEtOTMwOC00ZDJhLWFlNTAtNjYwZjEyZjEyYTU3XC9kYzZlcnVlLTFhZDY5ZmJiLWFiNjYtNDkwZi04NmRmLTNhNGRhZGMyMjZkZC5qcGciLCJ3aWR0aCI6Ijw9OTAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.eALDzdA3VvHMFgbvLEbtWUHlvqEvbNB_dXUxwyxkxB4",
      imageSize: "100%",
      type: "Reaction",
      body: [
        "Pay 1 Stamina.", <br />,
        "Roll ", <D10 />," equal to your Dexterity with a difficulty of 6.", <br />,
        "Reduce the next damage you receive by the number of successes."
      ]
    }}/>
  );
  cards.push(
    <SpecialCard {...{
      name: "Gentle Persuasion",
      image: "https://i.pinimg.com/originals/05/b7/21/05b72118277d82225acbaf7b1bf69fb0.jpg",
      imageSize: "160%",
      type: "Reaction",
      body: [
        "Pay 1 Reputation.", <br />,
        "The reacted attack is directed at you instead of its original target.",
        <FlavorText>Sometimes, what you say is less important</FlavorText>
      ]
    }}/>
  );
  const cardsWithMargin = cards.map((card) => <div style={{margin: ".5em"}}>{card}</div>);
  const cardStyle = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  }
  return <div style={cardStyle}>
    {cardsWithMargin}
  </div>;
}

export default App;

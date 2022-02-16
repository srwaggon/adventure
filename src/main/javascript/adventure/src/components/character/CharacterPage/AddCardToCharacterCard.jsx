import React, {useState} from "react";

import {Card} from "@mui/material";
import AddButton from "../../buttons/AddButton";
import useCards from "../../cards/useCards";
import CenteredGridWithAppBar from "./../../shared/CenteredGridWithAppBar";
import CardFilter from "../../cards/CardFilter";
import {Link} from "react-router-dom";
import VisualCard from "../../cards/VisualCard/VisualCard";

const AddCardToCharacterCard = ({cards: characterCards, setCards: setCharacterCards}) => {
  const allCards = useCards();

  const [filterFunc, setFilterFunc] = useState(() => x => x);

  const addCardToCharacter = card => setCharacterCards([...characterCards, card]);

  const items = filterFunc(allCards).map((card) =>
    <Card>
      <Link to={`/cards/${card.id}`} style={{textDecoration: 'none'}}>
        <VisualCard {...card}/>
      </Link>
      <AddButton onClick={() => addCardToCharacter(card)}/>
    </Card>);

  return <Card>
    <CenteredGridWithAppBar
      title={'Add to Character'}
      menuItems={
        <CardFilter {...{setFilterFunc}} />
      }>
      {items}
    </CenteredGridWithAppBar>
  </Card>;
};

export default AddCardToCharacterCard;

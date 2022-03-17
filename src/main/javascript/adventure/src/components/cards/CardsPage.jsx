import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import useCards from "./useCards";
import CenteredGridWithAppBar from "../shared/CenteredGridWithAppBar";
import AddButton from "../buttons/AddButton";
import CardFilter from "./CardFilter";
import {VisualCard} from "./VisualCard/VisualCard.tsx";

const CardsPage = () => {

  const history = useHistory();

  const cards = useCards();

  const [filterFunc, setFilterFunc] = useState(() => x => x);

  const items = filterFunc(cards).map((card) =>
    <Link to={`/cards/${card.id}`} style={{textDecoration: 'none'}}>
      <VisualCard {...card}/>
    </Link>);

  return <CenteredGridWithAppBar
    title={'Cards'}
    menuItems={<>
      <CardFilter {...{setFilterFunc}} />
      <AddButton onClick={() => history.push('/cards/new')}/>
    </>
    }>
    {items}
  </CenteredGridWithAppBar>;
};

export default CardsPage;

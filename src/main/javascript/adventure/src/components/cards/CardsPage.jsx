import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import useCards from "./useCards";
import CenteredGridWithAppBar from "../shared/CenteredGridWithAppBar";
import AddButton from "../buttons/AddButton";
import CardFilter from "./CardFilter";
import {VisualCard} from "./VisualCard/VisualCard.tsx";

const CardsPage = () => {

  const navigate = useNavigate();

  const cards = useCards();

  const [filterFunc, setFilterFunc] = useState(() => x => x);

  const items = filterFunc(cards).map((card) =>
    <Link key={card.id} to={`/cards/${card.id}`} style={{textDecoration: "none"}}>
      <VisualCard {...card} />
    </Link>
  );

  const menuItems = (
    <>
      <CardFilter {...{setFilterFunc}} />
      <AddButton onClick={() => navigate("/cards/new")}/>
    </>
  );

  return (
    <CenteredGridWithAppBar title={"Cards"} menuItems={menuItems}>
      {items}
    </CenteredGridWithAppBar>
  );
};

export default CardsPage;

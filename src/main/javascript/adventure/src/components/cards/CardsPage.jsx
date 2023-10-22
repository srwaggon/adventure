import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import useCards from "./useCards";
import CardFilter from "./CardFilter";
import {VisualCard} from "./VisualCard/VisualCard.tsx";
import {Box, Button, Card, CardContent} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TitledAppBar from "../shared/TitledAppBar";
import CenteredGrid from "../shared/CenteredGrid";

const CardsPage = () => {

  const navigate = useNavigate();

  const cards = useCards();

  const [filterFunc, setFilterFunc] = useState(() => x => x);

  const items = filterFunc(cards).map((card) =>
    <Link key={card.id} to={`/cards/${card.id}`} style={{textDecoration: "none"}}>
      <VisualCard {...card} />
    </Link>
  );

  return (
    <>
      <TitledAppBar title={"Cards"}>
        <Box display={"flex"} justifyContent="end">
          <Button variant="contained"
                  startIcon={<AddCircleIcon/>}
                  onClick={() => navigate("/cards/new")}
          >
            New Card
          </Button>
        </Box>
      </TitledAppBar>

      <Box m={1}>
        <Card>
          <CardContent>
            <CardFilter {...{setFilterFunc}} />
          </CardContent>
        </Card>
      </Box>

      <CenteredGrid>
        {items}
      </CenteredGrid>
    </>
  );
};

export default CardsPage;

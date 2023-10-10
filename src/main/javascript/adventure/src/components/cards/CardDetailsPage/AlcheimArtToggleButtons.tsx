import AlcheimToggleButtons, {newButtonData} from "./AlcheimToggleButtons";
import {useContext} from "react";
import {CardContext} from "./CardContext";

const AlcheimArtToggleButtons = () => {

  const [card, setCard] = useContext<any>(CardContext);

  const buttons = [
    newButtonData("Full Art", true),
    newButtonData("Partial Art", false)
  ];

  return (
    <AlcheimToggleButtons
      value={card?.fullArt || false}
      buttons={buttons}
      onChange={(value) => setCard({...card, fullArt: value === 'true'})}
    />
  );
};


export default AlcheimArtToggleButtons;

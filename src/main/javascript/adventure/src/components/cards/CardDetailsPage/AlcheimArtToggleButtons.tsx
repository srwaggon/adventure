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
      value={card?.appearance.fullArt || false}
      buttons={buttons}
      onChange={(value) => setCard({
        ...card,
        appearance: {...card.appearance, fullArt: value === 'true'}
      })}
    />
  );
};


export default AlcheimArtToggleButtons;

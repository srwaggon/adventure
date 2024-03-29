import {useContext} from "react";
import {CardContext} from "./CardContext";
import AlcheimToggleButtons, {newButtonData} from "./AlcheimToggleButtons";

const AlcheimTextBrightnessToggle = () => {

  const [card, setCard] = useContext<any>(CardContext);

  const buttons = [
    newButtonData("Dark Mode", true),
    newButtonData("Light Mode", false)
  ];

  return (
    <AlcheimToggleButtons
      value={card?.appearance?.darkText || false}
      buttons={buttons}
      onChange={(value) => setCard({
        ...card,
        appearance: {...card.appearance, darkText: value === 'true'}
      })}
    />
  );

};

export default AlcheimTextBrightnessToggle;

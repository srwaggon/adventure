import "./FlavorText.css";
import {applyTransforms} from "../../../../card/Text.tsx";

const FlavorText = ({children}) => {
  return (
    <div className="flavor-text" title={children}>{applyTransforms(children)}</div>
  );
};

export default FlavorText;

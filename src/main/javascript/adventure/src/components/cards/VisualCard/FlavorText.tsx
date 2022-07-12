import React, {ReactElement} from "react";
import {applyTransforms} from "../../../card/Text";

type Props = {
  children: string
  fontSize: string
}
export const FlavorText = (props: Props): ReactElement => {
  const {children, fontSize} = props;
  return (
    <div
      className="flavor-text"
      title={children}
      style={{fontSize, fontStyle: "italic", lineHeight: 1}}
    >
      <span style={{fontSize: "0.8em"}}>
        {applyTransforms(children)}
      </span>
    </div>
  );
};

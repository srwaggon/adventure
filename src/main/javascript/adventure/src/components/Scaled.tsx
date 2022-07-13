import React from "react";

type Props = {
  children: React.ReactElement,
  scale: number,
}

export const Scaled = (props: Props): React.ReactElement => {
  const {children, scale} = props;
  return (
    <div style={{transform: `scale(${scale})`}}>
      {children}
    </div>
  );
};

import React, {ReactNode} from "react";

type Props = {
  children: ReactNode,
  scale: number,
}

export const Scaled = (props: Props) => {
  const {children, scale} = props;
  return (
    <div style={{transform: `scale(${scale})`}}>
      {children}
    </div>
  );
};

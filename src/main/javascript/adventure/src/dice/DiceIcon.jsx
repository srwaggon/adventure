const DiceIcon = ({sides, size}) => {
  return (<img src={`/dice/d${sides}.svg`} width={size} height={size} />);
}

export default DiceIcon;

export const D4 = () => DiceIcon({sides: 4, size: 25});
export const D6 = () => DiceIcon({sides: 6, size: 25});
export const D8 = () => DiceIcon({sides: 8, size: 25});
export const D10 = () => DiceIcon({sides: 10, size: 25});
export const D12 = () => DiceIcon({sides: 12, size: 25});
export const D20 = () => DiceIcon({sides: 20, size: 25});
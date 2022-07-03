import {SvgIcon} from "@mui/material";

import {ReactComponent as D4Svg} from "../../svgs/dice/d4.svg";
import {ReactComponent as D6Svg} from "../../svgs/dice/d6.svg";
import {ReactComponent as D8Svg} from "../../svgs/dice/d8.svg";
import {ReactComponent as D10Svg} from "../../svgs/dice/d10.svg";
import {ReactComponent as D12Svg} from "../../svgs/dice/d12.svg";
import {ReactComponent as D20Svg} from "../../svgs/dice/d20.svg";

const DiceIcon = (svg) => (props) => <SvgIcon component={svg} viewBox="7 7 93 93" {...props}/>;

export const D4Icon = (props) => DiceIcon(D4Svg)(props);
export const D6Icon = (props) => DiceIcon(D6Svg)(props);
export const D8Icon = (props) => DiceIcon(D8Svg)(props);
export const D10Icon = (props) => DiceIcon(D10Svg)(props);
export const D12Icon = (props) => DiceIcon(D12Svg)(props);
export const D20Icon = (props) => DiceIcon(D20Svg)(props);

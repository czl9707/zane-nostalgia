import * as React from "react";
import ButtonBase from "./ButtonBase";
import { ButtonBaseProps } from "./ButtonBase";

type DropDownProps = React.HTMLAttributes<HTMLDivElement> & ButtonBaseProps & { text: string };

const DropDown = React.forwardRef<HTMLDivElement, DropDownProps>(
    function Button({ text, ...other }, ref) {
        return <ButtonBase {...other} ref={ref}>
            {text}
        </ButtonBase>
    }
)

export default DropDown;
export type { DropDownProps }
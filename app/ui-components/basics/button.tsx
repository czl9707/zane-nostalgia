import * as React from "react";
import ButtonBase from "./button-base";
import { ButtonBaseProps } from "./button-base";

type ButtonProps = Omit<React.HTMLAttributes<HTMLDivElement> & ButtonBaseProps & { text: string }, "children">;

const Button = React.forwardRef<HTMLDivElement, ButtonProps>(
    function Button({ text, ...other }, ref) {
        return <ButtonBase {...other} ref={ref}>
            {text}
        </ButtonBase>
    }
)
export default Button;
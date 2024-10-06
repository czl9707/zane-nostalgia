import { styled } from "@pigment-css/react";
import Panel from "./ui-components/Panel";

const InformationPanel = styled(Panel)(({ theme }) => ({
    margin: "4rem", boxSizing: "border-box",
    position: "relative",

    [`@media(min-width: ${theme.breakpoints.md})`]: {
        float: "right",
        width: `calc(${theme.breakpoints.md} - 8rem)`,
    },
    [`@media(max-width: ${theme.breakpoints.md})`]: {
        float: "right",
        width: "calc(100% - 8rem)",
    }
}));


export default InformationPanel;
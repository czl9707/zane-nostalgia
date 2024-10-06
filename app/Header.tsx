import { styled } from "@pigment-css/react";
import Section from './ui-components/Section'


const Header = styled(Section)({
    position: "fixed", color: "transparent",
    display: "flex", flexDirection: "row", alignItems: "center",
});

export default Header;
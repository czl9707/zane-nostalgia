import { styled } from "@pigment-css/react";
import Section from "./Section";


const HeaderBar = styled(Section)({
  position: "fixed", color: "transparent",
  display: "flex", flexDirection: "row", alignItems: "center",

  opacity: "0",
  transition: "opacity 2s ease 3s",

  "&:hover": {
    transitionDuration: "0.3s", transitionDelay: "0s",
    opacity: 1,
  },
});

export default HeaderBar;
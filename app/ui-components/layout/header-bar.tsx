import { styled } from "@pigment-css/react";


const HeaderBar = styled("div")(({ theme }) => ({
    padding: "0 4rem", zIndex: 1000,
    height: "4rem", top: "0", left: 0, right: 0,
    position: "fixed", backgroundColor: "transparent",
    display: "flex", flexDirection: "row", alignItems: "center",
    gap: "1rem", justifyContent: "flex-end",
}));

export default HeaderBar;
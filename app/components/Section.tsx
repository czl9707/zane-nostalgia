import { styled } from '@pigment-css/react'

const Section = styled("section")(({ theme }) => {
    return {
        paddingTop: ".75rem", paddingBottom: ".75rem",
        paddingLeft: "4rem", paddingRight: "4rem",
        margin: 0, width: "100%",
        "@media (max-width: var(--breakpoints-sm)px)": {
        },
        "@media (max-width: var(--breakpoints-md)px)": {
            width: `${theme.breakpoints.sm}px`,
        },
    };
});

export default Section;
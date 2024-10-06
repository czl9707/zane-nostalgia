import { styled } from '@pigment-css/react'
import * as React from 'react';

const Inner = styled("div")({
    paddingTop: "1rem", paddingBottom: "1rem",
    paddingLeft: "4rem", paddingRight: "4rem",
    marginTop: 0, marginBottom: 0,
    marginLeft: "auto", marginRight: "auto",
    boxSizing: "border-box", position: "relative",
    width: "100%",
});

const Container = styled("div")({
    width: "100%", display: "flex",
    flexDirection: "column", alignItems: "center"
});

const Section = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    function Section(props, ref) {
        return (<Container>
            <Inner {...props} ref={ref} />
        </Container>)
    }
);

export default Section;
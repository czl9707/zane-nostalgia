import * as React from "react";
import { styled } from "@pigment-css/react";


import InformationThread from "./information-thread";
import NavigationThread from "./navigation-thread";
import NavigationThreadContent from "./navigation-thread-content";

const Container = styled("div")({
    position: "fixed", inset: 0, lineHeight: 0,
    display: "inline-flex", overflowX: 'hidden', flexWrap: "nowrap"
})

export default function LayoutOtherThanScene({ children }: { children: React.ReactNode }) {
    return (
        <Container>
            <NavigationThread>
                <NavigationThreadContent />
            </NavigationThread>
            <InformationThread>
                {children}
            </InformationThread>
        </Container>
    )
}
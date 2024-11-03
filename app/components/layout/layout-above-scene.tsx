import * as React from "react";
import { styled } from "@pigment-css/react";


import InformationThread from "./information-thread";
import NavigationThread from "./navigation-thread";
import NavigationThreadContent from "./navigation-thread-content";
import NavigationMenuContextProvider from "./navigation-menu-context-provider";

const Container = styled("div")({
    position: "fixed", inset: 0, lineHeight: 0,
    display: "inline-flex", overflowX: 'hidden', flexWrap: "nowrap"
})

export default function LayoutAboveScene({ children }: { children: React.ReactNode }) {
    return (
        <Container>
            <NavigationMenuContextProvider>
                <NavigationThread>
                    <NavigationThreadContent />
                </NavigationThread>
                <InformationThread>
                    {children}
                </InformationThread>
            </NavigationMenuContextProvider>
        </Container>
    )
}
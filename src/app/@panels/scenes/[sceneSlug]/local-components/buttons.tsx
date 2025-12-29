"use client"

import * as React from "react";

import ControlStructure from "@/components/controls/control-structure"
import Button from "@/components/ui/button"
import { Casino, FitScreen, FloatLandscape2 } from "@/components/ui/icons/icons"
import { randomString } from "@/lib/math";
import FlippingIcon from "@/components/ui/icons/flipping-icon";
import { FullScreenContext } from "@/components/layout/header-bar-with-context-provider";

interface RandomSeedButtonProps {
    label: string,
    onChange?: (v: string) => void,
    value: string,
}

const RandomSeedButton = React.forwardRef<HTMLDivElement, RandomSeedButtonProps & Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">>(
    function RandomSeedButton({ label, onChange, ...other }, ref) {
        return (
            <ControlStructure label={label} {...other} value={undefined} ref={ref}>
                <Button variant='outline' color="secondary"
                    style={{ gap: "1rem", paddingTop: ".1rem", paddingBottom: ".1rem", justifyContent: "flex-start" }}
                    onClick={() => onChange?.(randomString(10))}>
                    <Casino />
                    Shuffle
                </Button>
            </ControlStructure>
        )
    }
)

const TogglePreviewButton = React.forwardRef<HTMLDivElement, {}>(
    function TogglePreviewButton({ }, ref) {
        const { isFullScreen, setFullScreen } = React.useContext(FullScreenContext);
        const toggleFullScreen = () => setFullScreen(!isFullScreen);

        return (
            <ControlStructure label={"Preview Mode"} value={undefined} ref={ref}>
                <Button variant='outline' color="secondary"
                    style={{ gap: "1rem", paddingTop: ".1rem", paddingBottom: ".1rem", justifyContent: "flex-start" }}
                    onClick={toggleFullScreen}>
                    <FlippingIcon direction="horizontal"
                        onClick={toggleFullScreen}
                        isFlipped={!isFullScreen}
                        before={<FloatLandscape2 />}
                        after={<FitScreen />}
                    />
                    Toggle
                </Button>
            </ControlStructure>
        )
    }
)

export{
    RandomSeedButton,
    TogglePreviewButton
}
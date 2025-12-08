"use client"

import * as React from "react";

import ControlStructure from "@/components/controls/control-structure"
import Button from "@/components/ui/button"
import { Casino } from "@/components/ui/icons/icons"
import { randomString } from "@/lib/math";

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
                    onClick={() => {
                        if (onChange !== undefined)
                            onChange(randomString(10));
                    }}>
                    <Casino />
                    Shuffle
                </Button>
            </ControlStructure>
        )
    }
)

export default RandomSeedButton;
"use client"

import * as React from "react";

import ControlStructure from "@/app/components/controls/control-structure"
import Button from "@/app/components/ui/button"
import { Casino } from "@/app/components/ui/icons/icons"
import { randomString } from "@/app/components/utils/math-utils";
import { BodyTypography } from "@/app/components/ui/typography";

interface RandomSeedButtonProps {
    label: string,
    onChange?: (v: string) => void,
    value: string,
}

const RandomSeedButton = React.forwardRef<HTMLDivElement, RandomSeedButtonProps & Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">>(
    function RandomSeedButton({ value, label, onChange, ...other }, ref) {
        return (
            <ControlStructure label={label} {...other} ref={ref}>
                <Button variant='filled' color="primary"
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
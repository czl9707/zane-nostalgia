import * as React from 'react';
import { styled } from "@pigment-css/react";

import { ButtonTypography } from '../ui/typography';

const ControlStructureContainer = styled("div")({
    width: "100%", height: "1.5rem", display: "flex", flexDirection: "row", alignItems: "center",
    gap: "5%",
    "&>:nth-child(1)": {
        width: "35%",
    },
    "&>:nth-child(2)": {
        width: "60%"
    },
})

interface ControlStructureProps {
    label: string,
    value?: string | number,
    children: React.ReactNode
}

export default function ControlStructure({ label, value, children }: ControlStructureProps) {
    return (
        <ControlStructureContainer>
            <ButtonTypography style={{ display: "flex" }}>
                <span style={{ width: "75%" }}>{label} &nbsp; {value && ' :'}</span>
                {value &&
                    <span style={{ flex: "1 1", textAlign: "right" }}>
                        {`${value}`}
                    </span>
                }
            </ButtonTypography>
            {children}
        </ControlStructureContainer>
    )
};

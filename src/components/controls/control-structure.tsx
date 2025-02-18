import * as React from 'react';
import { styled } from "@pigment-css/react";

import * as T from '@/components/ui/typography';

const ControlStructureContainer = styled("div")({
    width: "100%", height: "3rem", display: "flex", flexDirection: "row", alignItems: "center",
    gap: "5%", userSelect: "none", position: "relative", boxSizing: "border-box",
    "&>:nth-child(1)": {
        flex: "1 1",
    },
    "&>:nth-child(2)": {
        width: "60%",
    },
})

interface ControlStructureProps {
    label: string,
    value?: string | number,
    children: React.ReactNode
}

const ControlStructure = React.forwardRef<HTMLDivElement, ControlStructureProps & React.HTMLAttributes<HTMLDivElement>>(
    function ControlStructure({ label, value, children, ...other }, ref) {
        return (
            <ControlStructureContainer ref={ref} {...other}>
                <T.Body style={{ display: "flex" }}>
                    {
                        !value && <span >{label}</span>
                    }
                    {value &&
                        <>
                            <span style={{ width: "75%" }}>{label} &nbsp; {' :'}</span>
                            <span style={{ flex: "1 1", textAlign: "right" }}>
                                {`${value}`}
                            </span>
                        </>
                    }
                </T.Body>
                {children}
            </ControlStructureContainer>
        )
    }
)

export default ControlStructure;
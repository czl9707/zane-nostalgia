import { css } from "@pigment-css/react";
import { Tune, Animation, Code } from "../../components/ui/icons/icons";
import Panel from "../../components/ui/panel";
import { BodyTypography, H4Typography } from "../../components/ui/typography";


const bullets = [
    {
        title: "Dynamic SVGs",
        content: "SVGs with animated effects. Add movement and depth to your backgrounds.",
        Icon: Animation,
    },
    {
        title: "Customizable Patterns",
        content: "Size, Color, Geometry, even Seeds. Customization never ends until until you're satisfied.",
        Icon: Tune,
    },
    {
        title: "Multiple Integration Options",
        content: "Download, Copy, or Embed. Choose the best integration option suits your workflow.",
        Icon: Code,
    }
]

export default function BulletPanel() {
    return (
        <div className={css(({ theme }) => ({
            [`@media(min-width: ${theme.breakpoints.lg})`]: {
                gridTemplateColumns: `repeat(3, 1fr)`,
            },
            [`@media(max-width: ${theme.breakpoints.lg})`]: {
                gridTemplateColumns: `repeat(1, 1fr)`,
            },
            display: "grid",
            alignItems: "stretch", justifyContent: "space-between",
            gap: theme.padding.panel,
            padding: "0 0 12rem 0"
        }))}>
            {
                bullets.map(({ title, content, Icon }) => {
                    return (

                        <Panel style={{ flex: "1 1" }} key={title}>
                            <div style={{ display: "inline-flex", alignItems: "center", marginBottom: ".5rem", gap: "1rem" }}>
                                <Icon />
                                <H4Typography>{title}</H4Typography>
                            </div>
                            <BodyTypography color="secondary" >
                                {content}
                            </BodyTypography>
                        </Panel>
                    )
                })
            }
        </div>
    )
}
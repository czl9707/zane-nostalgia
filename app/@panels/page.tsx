import Panel from "../ui-components/basics/panel";
import { QuoteTypography } from "../ui-components/basics/typography";


export default function HomePanels() {
    return (
        [
            <Panel key={"home"}>
                <QuoteTypography color="secondary" style={{ textWrap: "balance", fontSize: "1.1rem" }}>
                    <i>
                        Nostalgia is a collection of <b>SVG patterns and backgrounds</b>, available via <b>HTTP endpoints</b>, designed for easy integration into projects.
                        Use them to add unique visuals to <b>GitHub READMEs, websites, and more</b> by simply embedding the provided URLs.
                        <span style={{ textAlign: "right", display: "block" }}>
                            -- Nostalgia.Z
                        </span>

                        <br /><br />

                        Zane, Once an architect of spaces, now a sculptor of code. <br />
                        From moments where memory and creativity collide, logic and beauty dance. <br />
                        <span style={{ textAlign: "right", display: "block" }}>
                            -- Zane
                        </span>
                    </i>
                </QuoteTypography>
            </Panel>
        ]
    )
}
import Panel from "../ui-components/basics/panel";
import { QuoteTypography } from "../ui-components/basics/typography";


export default function HomePanels() {
    return (
        [
            <Panel key={"home"}>
                <QuoteTypography color="secondary" style={{ textWrap: "balance", fontSize: "1.1rem" }}>
                    <i>
                        Once an architect of spaces, now a sculptor of code. <br />
                        my journey has shifted, but the passion remains. <br />
                        Z. Nostalgia is a tribute to the past—a collection of background effects, born from moments where memory and creativity collide. <br />
                        A whisper from the past, a memory in motion, combining the structure of engineering with the artistry of my earlier days. <br />
                        Step into where logic and beauty dance, and let nostalgia wash over you. <br />
                        <br />
                        <span style={{ textAlign: "right", display: "block" }}>
                            -- Zane
                        </span>
                    </i>
                </QuoteTypography>
            </Panel>
        ]
    )
}
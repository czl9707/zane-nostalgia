import InformationPanel from "./InformationPanel";
import { QuoteTypography } from "./ui-components/Typography";

export default function Page() {
    return (
        <InformationPanel style={{ padding: "1.5rem" }}>
            <QuoteTypography color="secondary" style={{ textWrap: "balance", fontSize: "1.5rem" }}>
                Once an architect of spaces, now a sculptor of code. <br />
                my journey has shifted, but the passion remains. <br />
                Z. Nostalgia is a tribute to the past—a collection of background effects, born from moments where memory and creativity collide. <br />
                A whisper from the past, a memory in motion, combining the structure of engineering with the artistry of my earlier days. <br />
                Step into where logic and beauty dance, and let nostalgia wash over you. <br />
            </QuoteTypography>
            <QuoteTypography color="secondary" style={{ textWrap: "balance", textAlign: "right", fontSize: "1.5rem" }}>
                <br />
                -- Zane
            </QuoteTypography>
        </InformationPanel>
    );
}
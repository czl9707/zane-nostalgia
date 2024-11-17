import Panel from "../components/ui/panel";
import StartCustomizingButton from "./extending-button";

export default function FooterPanel() {
    return (
        <Panel color="transparent"
            style={{
                display: "flex", flexDirection: "column", alignItems: "center"
            }}>
            <StartCustomizingButton href={"/scenes/rainy"} content={"Let's Start Customizing"} />
        </Panel>
    )
}
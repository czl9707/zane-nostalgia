import Panel from "../components/ui/panel";
import StartCustomizingButton from "./start-customizing-button";

export default function FooterPanel() {
    return (
        <Panel color="transparent"
            style={{
                display: "flex", flexDirection: "column", alignItems: "center"
            }}>
            <div style={{ height: "12rem" }} />

            <StartCustomizingButton href={"/scenes/rainy"} content={"Let's Start Customizing"} />

            <div style={{ height: "12rem" }} />
        </Panel>
    )
}
import HeroPanel from "./hero-panel";
import BulletPanel from "./bullets-panel";
import ShowCasePanel from "./showcase-panel";
import UseCasePanel from "./usecase-panel";
import FooterPanel from "./footer-panel";

const Spacer = () => <div style={{ height: "6rem" }} />;


export default function HomePanels() {
    return (
        <>
            <Spacer />
            <HeroPanel />
            <Spacer />
            <BulletPanel />
            <Spacer />
            <UseCasePanel />
            <Spacer />
            <ShowCasePanel />
            <Spacer />
            <FooterPanel />
            <Spacer />
        </>
    )
}
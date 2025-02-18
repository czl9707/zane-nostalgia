import HeroPanel from "./local-components/hero-panel";
import BulletPanel from "./local-components/bullets-panel";
// import ShowCasePanel from "./local-components/showcase-panel";
import UseCasePanel from "./local-components/usecase-panel";
import FooterPanel from "./local-components/footer-panel";

const Spacer = () => <div style={{ height: "6rem" }} />;


export default async function HomePanels() {
    return (
        <>
            <Spacer />
            <HeroPanel />
            <Spacer />
            <BulletPanel />
            <Spacer />
            <UseCasePanel />
            {/* <Spacer />
            <ShowCasePanel /> */}
            <FooterPanel />
            <Spacer />
        </>
    )
}
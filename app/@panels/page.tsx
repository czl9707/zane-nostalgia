import HeroPanel from "@/app/@panels/local-components/hero-panel";
import BulletPanel from "@/app/@panels/local-components/bullets-panel";
import ShowCasePanel from "@/app/@panels/local-components/showcase-panel";
import UseCasePanel from "@/app/@panels/local-components/usecase-panel";
import FooterPanel from "@/app/@panels/local-components/footer-panel";

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
            <Spacer />
            <ShowCasePanel />
            <FooterPanel />
            <Spacer />
        </>
    )
}
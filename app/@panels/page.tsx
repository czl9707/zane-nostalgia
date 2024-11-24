"use server"

import HeroPanel from "./home-panel-components/hero-panel";
import BulletPanel from "./home-panel-components/bullets-panel";
import ShowCasePanel from "./home-panel-components/showcase-panel";
import UseCasePanel from "./home-panel-components/usecase-panel";
import FooterPanel from "./home-panel-components/footer-panel";

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
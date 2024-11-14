import HeroPanel from "./hero-panel";
import BulletPanel from "./bullets-panel";
import ShowCasePanel from "./showcase-panel";


export default function HomePanels() {
    return (
        <>
            <HeroPanel key="Hero" />
            <BulletPanel key="Bullet" />
            <ShowCasePanel key="ShowCase" />
        </>
    )
}
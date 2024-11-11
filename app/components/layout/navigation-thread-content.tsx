import * as React from 'react';

import { fetchSceneMetas } from '../../scene-components/utils/fetch-scenes';
import { Accordion, AccordionLink, AccordionGroup } from "../ui/accordion";
import { H4Typography } from "../ui/typography";
import { DummyIcon, Orbit } from "../ui/icons/icons";
import Divider from '../ui/divider';

const playgroundContents = [
    {
        icon: <Orbit />,
        name: "Galaxy",
        route: "galaxy"
    }
]


export default async function NavigationThreadContent() {
    const sceneMetas = await fetchSceneMetas();

    return (
        <>
            <Divider />

            <H4Typography style={{ padding: '1rem', userSelect: "none", }}>
                NOSTALGIA .Z
            </H4Typography>
            <Divider />

            <AccordionLink href={"/"}>
                Home
                <DummyIcon />
            </AccordionLink>
            <Divider />
            <AccordionGroup type="multiple" defaultValue={["Scenes"]}>
                <Accordion name={"Scenes"}>
                    {
                        sceneMetas.map(({ Icon, name, route }) => (
                            <React.Fragment key={name}>
                                <Divider />
                                <AccordionLink href={`/scenes/${route}`}>
                                    {name}
                                    <Icon />
                                </AccordionLink>
                            </React.Fragment>
                        ))
                    }
                </Accordion>
                <Divider />

                <Accordion name={"Playground"}>
                    {
                        playgroundContents.map(({ icon, name, route }) => (
                            <React.Fragment key={name}>
                                <Divider />
                                <AccordionLink href={`/playground/${route}`}>
                                    {name} {icon}
                                </AccordionLink>
                            </React.Fragment>
                        ))
                    }
                </Accordion>
                <Divider />
            </AccordionGroup>
        </>
    )
}

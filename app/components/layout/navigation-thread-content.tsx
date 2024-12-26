import * as React from 'react';
import Link from 'next/link';

import { fetchSceneMetas } from '../../scene-components/utils/fetch-scenes';
import { Accordion, AccordionGroup, AccordionItem } from "../ui/accordion";
import { H4Typography } from "../ui/typography";
import { DummyIcon, Orbit } from "../ui/icons/icons";
import Divider from '../ui/divider';
import Button from '../ui/button';

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

            <H4Typography color="primary"
                style={{ padding: '1rem', userSelect: "none", }}>
                Z.Nostalgia
            </H4Typography>
            <Divider />

            <Link href={"/"}>
                <Button variant='filled' color="transparent" fontVariant='body' style={{ width: "100%" }}>
                    Home
                    <DummyIcon />
                </Button>
            </Link>
            <Divider />
            <AccordionGroup type="multiple" defaultValue={["Scenes"]}>
                <Accordion name={"Scenes"}>
                    {
                        sceneMetas.map(({ Icon, name, route }) => (
                            <Link href={`/scenes/${route}`} key={name}>
                                <AccordionItem asChild >
                                    <Button variant='filled' color="transparent" fontVariant='body'>
                                        {name}
                                        <Icon />
                                    </Button>
                                </AccordionItem>
                            </Link>
                        ))
                    }
                </Accordion>
                <Divider />

                <Accordion name={"Playground"}>
                    {
                        playgroundContents.map(({ icon, name, route }) => (
                            <Link href={`/playground/${route}`} key={name}>
                                <AccordionItem asChild >
                                    <Button variant='filled' color="transparent" fontVariant='body'>
                                        {name} {icon}
                                    </Button>
                                </AccordionItem>
                            </Link>
                        ))
                    }
                </Accordion>
                <Divider />
            </AccordionGroup>
        </>
    )
}

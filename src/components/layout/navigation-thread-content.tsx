import * as React from 'react';
import Link from 'next/link';

import { fetchSceneMetas } from '@/scene-components/utils/fetch-scenes';

import { Accordion, AccordionGroup, AccordionItem } from "@/components/ui/accordion";
import { H4Typography } from "@/components/ui/typography";
import { DummyIcon } from "@/components/ui/icons/icons";
import Divider from '@/components/ui/divider';
import Button from '@/components/ui/button';


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
            </AccordionGroup>
        </>
    )
}

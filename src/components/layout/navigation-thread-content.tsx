import * as React from 'react';
import Link from 'next/link';

import { fetchSceneMetas } from '@/scene-components/utils/fetch-scenes';

import { Accordion, AccordionGroup, AccordionItem } from "@/components/ui/accordion";
import * as T from "@/components/ui/typography";
import { DummyIcon } from "@/components/ui/icons/icons";
import Divider from '@/components/ui/divider';
import Button from '@/components/ui/button';


export default async function NavigationThreadContent() {
    const sceneMetas = await fetchSceneMetas();

    return (
        <>
            <Divider />

            <T.H4 color="primary"
                style={{ padding: '1rem', userSelect: "none", }}>
                Z.Nostalgia
            </T.H4>
            <Divider />

            <Link href={"/"}>
                <Button variant='filled' color="transparent" style={{ width: "100%" }}>
                    <T.Body>Home</T.Body>
                    <DummyIcon />
                </Button>
            </Link>
            <Divider />
            <AccordionGroup type="multiple" defaultValue={["Scenes"]}>
                <Accordion name={<T.Body>Scenes</T.Body>} value={"Scenes"}>
                    {
                        sceneMetas.map(({ Icon, name, route }) => (
                            <Link href={`/scenes/${route}`} key={name}>
                                <AccordionItem asChild >
                                    <Button variant='filled' color="transparent">
                                        <T.Body>{name}</T.Body>
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

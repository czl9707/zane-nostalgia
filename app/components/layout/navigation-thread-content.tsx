import * as React from 'react';

import { fetchSceneMetas } from '@/app/scene-components/utils/fetch-scenes';
import { Accordin, AccordinLink } from "../ui/accordin";
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

            <AccordinLink href={"/"}>
                Home
                <DummyIcon />
            </AccordinLink>
            <Divider />

            <Accordin defaultOpen buttonContent={"Scenes"}>
                {
                    sceneMetas.map(({ Icon, name, route }, i) => (
                        <React.Fragment key={name}>
                            {i != 0 && <Divider />}
                            <AccordinLink href={`/scenes/${route}`}>
                                {name}
                                <Icon />
                            </AccordinLink>
                        </React.Fragment>
                    ))
                }
            </Accordin>
            <Divider />

            <Accordin buttonContent={"Playground"}>
                {
                    playgroundContents.map(({ icon, name, route }, i) => (
                        <React.Fragment key={name}>
                            {i != 0 && <Divider />}
                            <AccordinLink href={`/playground/${route}`}>
                                {name} {icon}
                            </AccordinLink>
                        </React.Fragment>
                    ))
                }
            </Accordin>
            <Divider />
        </>
    )
}

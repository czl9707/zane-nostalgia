import scenes from '../utils/scenes';
import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const backgroundContext = React.createContext<(background: string) => void>((_) => { })


function randomScenePath(): string {
    return scenes[
        Math.floor(Math.random() * scenes.length)
    ].name;
}

export { randomScenePath, backgroundContext }
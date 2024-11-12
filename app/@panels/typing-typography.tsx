"use client"

import * as React from 'react';

interface ContentState {
    index: number,
    length: number,
    step: number,
    curserShow: number,
}

function NextContentState({ index, length, step, curserShow }: ContentState, contents: string[]): ContentState {
    if (length === 0 && step < 0) {
        index++;
        index %= contents.length;
        step = 1;
    }
    else {
        length += step;

        if (length === contents[index].length) {
            if (step > 0)
                step = 0;
            else {
                curserShow++;
                if (curserShow > 6) {
                    curserShow = 1
                    step = -1
                }
            }
        }
    }

    console.log({ index, length, step, curserShow })
    return { index, length, step, curserShow };
}

export default function TypingTypography({ contents }: { contents: string[] }) {
    const [state, setState] = React.useState<ContentState>({
        index: 0,
        length: 0,
        step: 1,
        curserShow: 1,
    })

    const updateState = () => {
        setState((currentState) => {
            setTimeout(() => {
                updateState();
            }, currentState.step === 0 ? 600 : 150);

            return NextContentState(currentState, contents);
        });
    }

    React.useEffect(() => {
        updateState();
    }, []);

    return (
        <>
            {contents[state.index].substring(0, state.length)}
            {state.curserShow % 2 == 1 ? "_" : " "}
        </>
    )
}
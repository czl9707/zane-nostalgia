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
                if (curserShow > 15) {
                    curserShow = 1
                    step = -1
                }
            }
        }
    }

    return { index, length, step, curserShow };
}

export default function TypingTypography({ contents }: { contents: string[] }) {
    const [state, setState] = React.useState<ContentState>({
        index: 0,
        length: 0,
        step: 1,
        curserShow: 1,
    })
    const timeoutRef = React.useRef<boolean>()

    const updateState = () => {
        setTimeout(() => {
            updateState();
        }, 150);
        setState((currentState) => {

            return NextContentState(currentState, contents);
        });
    }

    React.useEffect(() => {
        if (!timeoutRef.current) {
            timeoutRef.current = true;
            updateState();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {contents[state.index].substring(0, state.length)}
            <span style={{ opacity: state.curserShow % 3 }}>_</span>
        </>
    )
}